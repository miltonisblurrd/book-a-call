"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

type HoverProp = {
  src: string;
  size: number;
  xHover: string;
  yHover: string;
  rotate: number;
  delayIn: number;
  delayOut: number;
};

type ProjectHoverConfig = {
  match: RegExp;
  props: HoverProp[];
};

const PROJECT_HOVER_CONFIG: ProjectHoverConfig[] = [
  {
    match: /symphny/i,
    props: [
      {
        src: "/images/Asset-2-1.svg",
        size: 68,
        xHover: "-155px",
        yHover: "-95px",
        rotate: -16,
        delayIn: 0,
        delayOut: 120,
      },
      {
        src: "/images/Frame-110.svg",
        size: 56,
        xHover: "165px",
        yHover: "-80px",
        rotate: 12,
        delayIn: 55,
        delayOut: 85,
      },
      {
        src: "/images/Clip-path-group.svg",
        size: 72,
        xHover: "-145px",
        yHover: "110px",
        rotate: -10,
        delayIn: 110,
        delayOut: 45,
      },
      {
        src: "/images/Frame-47296.svg",
        size: 52,
        xHover: "170px",
        yHover: "95px",
        rotate: 20,
        delayIn: 165,
        delayOut: 0,
      },
    ],
  },
  {
    match: /safefaces/i,
    props: [
      {
        src: "/images/Group-436-1.svg",
        size: 64,
        xHover: "-160px",
        yHover: "-90px",
        rotate: -14,
        delayIn: 0,
        delayOut: 110,
      },
      {
        src: "/images/Vector-97.svg",
        size: 58,
        xHover: "158px",
        yHover: "-85px",
        rotate: 18,
        delayIn: 50,
        delayOut: 75,
      },
      {
        src: "/images/Frame-47386.svg",
        size: 70,
        xHover: "-175px",
        yHover: "105px",
        rotate: 8,
        delayIn: 100,
        delayOut: 40,
      },
      {
        src: "/images/Group-47669-1.svg",
        size: 54,
        xHover: "168px",
        yHover: "100px",
        rotate: -22,
        delayIn: 150,
        delayOut: 0,
      },
      {
        src: "/images/Frame-47267-1.svg",
        size: 48,
        xHover: "20px",
        yHover: "-130px",
        rotate: 6,
        delayIn: 80,
        delayOut: 60,
      },
    ],
  },
  {
    match: /shipnetwork/i,
    props: [
      {
        src: "/images/shipNetworkLogo.svg",
        size: 62,
        xHover: "-150px",
        yHover: "-88px",
        rotate: -12,
        delayIn: 0,
        delayOut: 100,
      },
      {
        src: "/images/Group-6.svg",
        size: 66,
        xHover: "162px",
        yHover: "-82px",
        rotate: 15,
        delayIn: 60,
        delayOut: 70,
      },
      {
        src: "/images/Frame-47263.svg",
        size: 74,
        xHover: "-168px",
        yHover: "108px",
        rotate: -8,
        delayIn: 120,
        delayOut: 35,
      },
      {
        src: "/images/Group-2011.svg",
        size: 50,
        xHover: "175px",
        yHover: "92px",
        rotate: 24,
        delayIn: 170,
        delayOut: 0,
      },
    ],
  },
];

const DEFAULT_CONFIG = PROJECT_HOVER_CONFIG[0];

const CARD_SELECTOR =
  '.w-tab-content > [data-w-tab="Tab 1"] .wrapper-work .wrapper-blue.u-scroll-none';

function getProjectConfig(title: string) {
  return (
    PROJECT_HOVER_CONFIG.find((config) => config.match.test(title)) ??
    DEFAULT_CONFIG
  );
}

function initWorkProjectHover(): boolean {
  const cards = document.querySelectorAll<HTMLElement>(CARD_SELECTOR);

  if (!cards.length) return false;

  cards.forEach((card) => {
    if (card.dataset.hoverPropsReady === "true") return;

    const title =
      card.querySelector(".wrapper-header .text-paragraph")?.textContent?.trim() ??
      "";
    const config = getProjectConfig(title);

    card.classList.add("work-project-card");
    card.dataset.hoverPropsReady = "true";

    const propsLayer = document.createElement("div");
    propsLayer.className = "work-hover-props";
    propsLayer.setAttribute("aria-hidden", "true");

    config.props.forEach((prop) => {
      const img = document.createElement("img");
      img.className = "work-hover-prop";
      img.src = prop.src;
      img.alt = "";
      img.loading = "eager";
      img.draggable = false;
      img.style.setProperty("--prop-size", `${prop.size}px`);
      img.style.setProperty("--prop-x-hover", prop.xHover);
      img.style.setProperty("--prop-y-hover", prop.yHover);
      img.style.setProperty("--prop-rotate", `${prop.rotate}deg`);
      img.style.setProperty("--prop-delay-in", `${prop.delayIn}ms`);
      img.style.setProperty("--prop-delay-out", `${prop.delayOut}ms`);
      propsLayer.appendChild(img);
    });

    card.prepend(propsLayer);
  });

  return true;
}

export { initWorkProjectHover };

export default function WorkProjectHover() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    let rafId = 0;
    let attempts = 0;
    const maxAttempts = 30;

    const run = () => {
      const ready = initWorkProjectHover();
      if (!ready && attempts < maxAttempts) {
        attempts += 1;
        rafId = window.requestAnimationFrame(run);
      }
    };

    run();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return null;
}
