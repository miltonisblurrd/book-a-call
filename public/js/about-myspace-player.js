(function () {
  "use strict";

  function initAboutMyspacePlayer() {
    if (window.__mspPlayerReady) return;
    if (!document.getElementById("myspace-player")) return;

    const audio = document.getElementById("msp-audio");
    const eqRoot = document.getElementById("msp-eq");
    if (!audio || !eqRoot) return;

    window.__mspPlayerReady = true;

    const SONGS = [
      {
        title: "Send the Pain Below",
        artist: "Chevelle",
        src: "/music/myspace/chevelle-send-the-pain-below.mp3",
      },
      {
        title: "Smells Like Teen Spirit",
        artist: "Nirvana",
        src: "/music/myspace/nirvana-smells-like-teen-spirit.mp3",
      },
      {
        title: "Black Hole Sun",
        artist: "Soundgarden",
        src: "/music/myspace/soundgarden-black-hole-sun.mp3",
      },
      {
        title: "1979",
        artist: "The Smashing Pumpkins",
        src: "/music/myspace/smashing-pumpkins-1979.mp3",
      },
      {
        title: "Would?",
        artist: "Alice In Chains",
        src: "/music/myspace/alice-in-chains-would.mp3",
      },
      {
        title: "Never Too Late",
        artist: "Three Days Grace",
        src: "/music/myspace/three-days-grace-never-too-late.mp3",
      },
      {
        title: "Drive",
        artist: "Incubus",
        src: "/music/myspace/incubus-drive.mp3",
      },
      {
        title: "Be Quiet And Drive (Far Away)",
        artist: "Deftones",
        src: "/music/myspace/deftones-be-quiet-and-drive.mp3",
      },
      {
        title: "Blurry",
        artist: "Puddle Of Mudd",
        src: "/music/myspace/puddle-of-mudd-blurry.mp3",
      },
    ];

    const elTitle = document.getElementById("msp-title");
    const elArtist = document.getElementById("msp-artist");
    const elStatus = document.getElementById("msp-status");
    const elTime = document.getElementById("msp-time");
    const btnStop = document.getElementById("msp-stop");
    const btnPrev = document.getElementById("msp-prev");
    const btnPause = document.getElementById("msp-pause");
    const btnPlay = document.getElementById("msp-play");
    const btnNext = document.getElementById("msp-next");
    const volTrack = document.getElementById("msp-volume-track");
    const volFill = document.getElementById("msp-volume-fill");
    const volKnob = document.getElementById("msp-volume-knob");
    const seekTrack = document.getElementById("msp-seek-track");
    const seekFill = document.getElementById("msp-seek-fill");
    const seekKnob = document.getElementById("msp-seek-knob");
    const plToggle = document.getElementById("msp-playlist-toggle");
    const plPanel = document.getElementById("msp-playlist");

    const EQ_BAR_COUNT = 12;
    eqRoot.innerHTML = "";
    for (let i = 0; i < EQ_BAR_COUNT; i++) {
      const bar = document.createElement("div");
      bar.className = "msp-eq-bar";
      eqRoot.appendChild(bar);
    }

    const eqBars = Array.from(eqRoot.querySelectorAll(".msp-eq-bar"));
    let index = 0;
    let volume = 0.8;
    let rafId = 0;
    let audioCtx = null;
    let analyser = null;
    let sourceNode = null;
    let freqData = null;
    let usesCaptureStream = false;
    const eqLevels = new Array(EQ_BAR_COUNT).fill(0.15);
    const EQ_ATTACK = 0.78;
    const EQ_DECAY = 0.32;
    const EQ_IDLE = 0.12;

    function initAudioGraph() {
      if (analyser && sourceNode) return true;

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;

      try {
        audioCtx = new AudioCtx();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.5;
        analyser.minDecibels = -90;
        analyser.maxDecibels = -10;
        freqData = new Uint8Array(analyser.frequencyBinCount);

        if (typeof audio.captureStream === "function") {
          sourceNode = audioCtx.createMediaStreamSource(audio.captureStream());
          sourceNode.connect(analyser);
          usesCaptureStream = true;
        } else {
          sourceNode = audioCtx.createMediaElementSource(audio);
          sourceNode.connect(analyser);
          analyser.connect(audioCtx.destination);
          usesCaptureStream = false;
        }

        return true;
      } catch (err) {
        analyser = null;
        sourceNode = null;
        return false;
      }
    }

    async function resumeAudioContext() {
      if (!audioCtx || audioCtx.state !== "suspended") return;
      try {
        await audioCtx.resume();
      } catch (err) {}
    }

    function sampleFrequencyLevels() {
      if (!analyser || !freqData) {
        return eqBars.map(function (_, i) {
          const wave = Math.sin(Date.now() / 120 + i * 0.7) * 0.5 + 0.5;
          return 0.15 + wave * 0.55;
        });
      }

      analyser.getByteFrequencyData(freqData);
      return eqBars.map(function (_, barIndex) {
        const start = Math.floor(
          Math.pow(barIndex / EQ_BAR_COUNT, 1.25) * (freqData.length - 1)
        );
        const end = Math.floor(
          Math.pow((barIndex + 1) / EQ_BAR_COUNT, 1.25) * (freqData.length - 1)
        );

        let sum = 0;
        let count = 0;
        for (let i = start; i <= end; i++) {
          sum += freqData[i];
          count++;
        }

        const avg = count ? sum / count / 255 : 0;
        const bassBoost = barIndex < 4 ? 1.35 : barIndex < 8 ? 1.05 : 0.85;
        return Math.min(1, avg * bassBoost * 1.6 + 0.1);
      });
    }

    function smoothEqLevel(current, target) {
      const rate = target > current ? EQ_ATTACK : EQ_DECAY;
      return current + (target - current) * rate;
    }

    function setEqBarLevel(bar, level) {
      const scale = Math.max(EQ_IDLE, Math.min(1, level));
      bar.style.transform = "scaleY(" + scale.toFixed(3) + ")";
    }

    function pad2(n) {
      return (n < 10 ? "0" : "") + n;
    }

    function formatTime(sec) {
      if (!isFinite(sec) || sec < 0) return "00:00";
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return pad2(m) + ":" + pad2(s);
    }

    function setStatus(text) {
      if (elStatus) elStatus.textContent = text;
    }

    function loadTrack(i) {
      index = (i + SONGS.length) % SONGS.length;
      const track = SONGS[index];
      if (elTitle) elTitle.textContent = track.title;
      if (elArtist) elArtist.textContent = track.artist;
      audio.src = track.src;
      audio.load();
      renderPlaylist();
    }

    function renderPlaylist() {
      if (!plPanel) return;
      plPanel.innerHTML = "";
      SONGS.forEach(function (song, i) {
        const row = document.createElement("button");
        row.type = "button";
        row.className = "msp-pl-row" + (i === index ? " is-active" : "");
        row.innerHTML =
          '<span class="msp-pl-num">' +
          (i + 1) +
          "</span>" +
          '<span class="msp-pl-meta">' +
          '<div class="msp-pl-title"></div>' +
          '<div class="msp-pl-artist"></div>' +
          "</span>";
        row.querySelector(".msp-pl-title").textContent = song.title;
        row.querySelector(".msp-pl-artist").textContent = song.artist;
        row.addEventListener("click", function () {
          loadTrack(i);
          play();
        });
        plPanel.appendChild(row);
      });
    }

    function setPlaylistOpen(open) {
      if (!plPanel || !plToggle) return;
      if (open) {
        renderPlaylist();
        plPanel.hidden = false;
        plToggle.setAttribute("aria-expanded", "true");
        plToggle.textContent = "Hide playlist";
      } else {
        plPanel.hidden = true;
        plToggle.setAttribute("aria-expanded", "false");
        plToggle.textContent = "Show playlist";
      }
    }

    function play() {
      initAudioGraph();
      resumeAudioContext();
      audio
        .play()
        .then(function () {
          setStatus("playing");
          startEq();
        })
        .catch(function () {
          setStatus("error — tap play");
        });
    }

    function pause() {
      audio.pause();
      setStatus("paused");
      stopEq();
    }

    function stop() {
      audio.pause();
      try {
        audio.currentTime = 0;
      } catch (e) {}
      setStatus("stopped");
      stopEq();
      updateSeekUI();
    }

    function updateSeekUI() {
      if (!seekFill || !seekKnob || !seekTrack || !elTime) return;
      const d = audio.duration;
      const c = audio.currentTime;
      let pct = 0;
      if (isFinite(d) && d > 0) pct = (c / d) * 100;
      seekFill.style.width = pct + "%";
      seekKnob.style.left = pct + "%";
      seekTrack.setAttribute("aria-valuenow", String(Math.round(pct)));
      elTime.textContent = formatTime(c);
    }

    function setVolumeUI() {
      if (!volFill || !volKnob || !volTrack) return;
      const pct = volume * 100;
      volFill.style.width = pct + "%";
      volKnob.style.left = pct + "%";
      volTrack.setAttribute("aria-valuenow", String(Math.round(pct)));
      audio.volume = volume;
    }

    function startEq() {
      stopEq();
      initAudioGraph();
      resumeAudioContext();

      function tick() {
        const targets = sampleFrequencyLevels();
        eqBars.forEach(function (bar, i) {
          eqLevels[i] = smoothEqLevel(eqLevels[i], targets[i]);
          setEqBarLevel(bar, eqLevels[i]);
        });
        rafId = requestAnimationFrame(tick);
      }

      rafId = requestAnimationFrame(tick);
    }

    function stopEq() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      eqBars.forEach(function (bar, i) {
        eqLevels[i] = EQ_IDLE;
        setEqBarLevel(bar, EQ_IDLE);
      });
    }

    function sliderPct(track, clientX) {
      const r = track.getBoundingClientRect();
      let x = clientX - r.left;
      x = Math.max(0, Math.min(r.width, x));
      return x / r.width;
    }

    function bindSlider(track, onChange) {
      if (!track) return;
      let active = false;
      function move(clientX) {
        onChange(sliderPct(track, clientX));
      }
      track.addEventListener("pointerdown", function (e) {
        active = true;
        track.setPointerCapture(e.pointerId);
        move(e.clientX);
      });
      track.addEventListener("pointermove", function (e) {
        if (!active) return;
        move(e.clientX);
      });
      track.addEventListener("pointerup", function (e) {
        active = false;
        try {
          track.releasePointerCapture(e.pointerId);
        } catch (err) {}
      });
      track.addEventListener("pointercancel", function () {
        active = false;
      });
    }

    btnPlay?.addEventListener("click", play);
    btnPause?.addEventListener("click", pause);
    btnStop?.addEventListener("click", stop);
    btnPrev?.addEventListener("click", function () {
      const wasPlaying = !audio.paused;
      loadTrack(index - 1);
      if (wasPlaying) play();
      else stop();
    });
    btnNext?.addEventListener("click", function () {
      const wasPlaying = !audio.paused;
      loadTrack(index + 1);
      if (wasPlaying) play();
      else stop();
    });

    bindSlider(volTrack, function (pct) {
      volume = pct;
      setVolumeUI();
    });
    bindSlider(seekTrack, function (pct) {
      const d = audio.duration;
      if (!isFinite(d) || d <= 0) return;
      audio.currentTime = pct * d;
      updateSeekUI();
    });

    audio.addEventListener("timeupdate", updateSeekUI);
    audio.addEventListener("loadedmetadata", updateSeekUI);
    audio.addEventListener("play", function () {
      setStatus("playing");
      resumeAudioContext();
      startEq();
    });
    audio.addEventListener("pause", function () {
      if (audio.currentTime === 0 || audio.ended) return;
      setStatus("paused");
      stopEq();
    });
    audio.addEventListener("ended", function () {
      stopEq();
      if (index < SONGS.length - 1) {
        loadTrack(index + 1);
        play();
      } else {
        setStatus("stopped");
        updateSeekUI();
      }
    });

    plToggle?.addEventListener("click", function () {
      setPlaylistOpen(plPanel.hidden);
    });

    audio.volume = volume;
    setVolumeUI();
    renderPlaylist();
    setPlaylistOpen(false);
    loadTrack(0);
    stop();
  }

  window.initAboutMyspacePlayer = initAboutMyspacePlayer;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAboutMyspacePlayer);
  } else {
    initAboutMyspacePlayer();
  }
})();
