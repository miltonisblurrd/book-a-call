"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const INIT_ATTR = "data-blurrd-slider-init";
const REVIEW_SLIDER_HEIGHT = 300;

function getWrappedIndex(index: number, length: number, infinite: boolean) {
  if (infinite) {
    return ((index % length) + length) % length;
  }
  return Math.max(0, Math.min(length - 1, index));
}

function getSlideDirection(
  from: number,
  to: number,
  length: number,
  infinite: boolean
) {
  if (!infinite) return to > from ? 1 : -1;

  const forward = (to - from + length) % length;
  const backward = (from - to + length) % length;
  return forward <= backward ? 1 : -1;
}

/** Testimonials: each card slides over the previous one, clipped inside the mask */
function initReviewSlider(
  slider: HTMLElement,
  mask: HTMLElement,
  slides: HTMLElement[],
  infinite: boolean,
  duration: number
) {
  let currentIndex = 0;
  let destroyed = false;
  let transitionTimer: ReturnType<typeof setTimeout> | undefined;

  const prevBtn = slider.querySelector<HTMLElement>(".w-slider-arrow-left");
  const nextBtn = slider.querySelector<HTMLElement>(".w-slider-arrow-right");

  const syncPrevStyle = () => {
    const prevLabel = prevBtn?.querySelector<HTMLElement>("span");
    if (!prevLabel) return;

    if (!infinite && currentIndex === 0) {
      prevLabel.classList.add("u-text-gray");
    } else {
      prevLabel.classList.remove("u-text-gray");
    }
  };

  const layout = () => {
    mask.style.position = "relative";
    mask.style.overflow = "hidden";
    mask.style.width = "100%";
    mask.style.height = `${REVIEW_SLIDER_HEIGHT}px`;
    mask.style.display = "block";
    mask.style.transform = "none";
    mask.style.transition = "none";
    mask.style.whiteSpace = "normal";

    slides.forEach((slide) => {
      slide.style.position = "absolute";
      slide.style.top = "0";
      slide.style.left = "0";
      slide.style.width = "100%";
      slide.style.height = `${REVIEW_SLIDER_HEIGHT}px`;
      slide.style.display = "block";
      slide.style.whiteSpace = "normal";
    });
  };

  const syncHeight = () => {
    slider.style.height = `${REVIEW_SLIDER_HEIGHT}px`;
    mask.style.height = `${REVIEW_SLIDER_HEIGHT}px`;
  };

  const restSlide = (slide: HTMLElement, index: number) => {
    if (index === currentIndex) {
      slide.style.visibility = "visible";
      slide.style.zIndex = "2";
      slide.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    slide.style.visibility = "hidden";
    slide.style.zIndex = "1";
    slide.style.transform =
      index < currentIndex
        ? "translate3d(-100%, 0, 0)"
        : "translate3d(100%, 0, 0)";
  };

  const showIndex = (index: number, animate = true) => {
    if (destroyed) return;

    const nextIndex = getWrappedIndex(index, slides.length, infinite);
    if (nextIndex === currentIndex && animate) return;
    if (slider.clientWidth === 0) return;

    layout();

    if (nextIndex === currentIndex) {
      slides.forEach((slide, i) => restSlide(slide, i));
      syncPrevStyle();
      syncHeight();
      return;
    }

    const prevIndex = currentIndex;
    const direction = getSlideDirection(
      prevIndex,
      nextIndex,
      slides.length,
      infinite
    );
    const outgoing = slides[prevIndex];
    const incoming = slides[nextIndex];
    const transition = animate ? `transform ${duration}ms ease` : "none";

    slides.forEach((slide, i) => {
      slide.style.transition = "none";

      if (i === prevIndex) {
        slide.style.visibility = "visible";
        slide.style.zIndex = "2";
        slide.style.transform = "translate3d(0, 0, 0)";
        return;
      }

      if (i === nextIndex) {
        slide.style.visibility = "visible";
        slide.style.zIndex = "3";
        slide.style.transform =
          direction > 0
            ? "translate3d(100%, 0, 0)"
            : "translate3d(-100%, 0, 0)";
        return;
      }

      slide.style.visibility = "hidden";
      slide.style.zIndex = "1";
    });

    syncHeight();
    currentIndex = nextIndex;
    syncPrevStyle();

    if (!animate) {
      slides.forEach((slide, i) => restSlide(slide, i));
      syncHeight();
      return;
    }

    requestAnimationFrame(() => {
      outgoing.style.transition = transition;
      incoming.style.transition = transition;
      outgoing.style.transform =
        direction > 0
          ? "translate3d(-100%, 0, 0)"
          : "translate3d(100%, 0, 0)";
      incoming.style.transform = "translate3d(0, 0, 0)";
    });

    if (transitionTimer) clearTimeout(transitionTimer);
    transitionTimer = setTimeout(() => {
      slides.forEach((slide, i) => restSlide(slide, i));
      syncHeight();
    }, duration);
  };

  const onPrev = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    showIndex(currentIndex - 1);
  };

  const onNext = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    showIndex(currentIndex + 1);
  };

  prevBtn?.addEventListener("click", onPrev);
  nextBtn?.addEventListener("click", onNext);

  const onResize = () => showIndex(currentIndex, false);
  window.addEventListener("resize", onResize);

  const runInitialLayout = () => showIndex(0, false);
  runInitialLayout();

  if (slider.clientWidth === 0) {
    requestAnimationFrame(runInitialLayout);
    requestAnimationFrame(() => requestAnimationFrame(runInitialLayout));
  }

  return () => {
    destroyed = true;
    if (transitionTimer) clearTimeout(transitionTimer);
    prevBtn?.removeEventListener("click", onPrev);
    nextBtn?.removeEventListener("click", onNext);
    window.removeEventListener("resize", onResize);
    slider.removeAttribute(INIT_ATTR);
  };
}

/** Video / other sliders: horizontal filmstrip */
function initFilmstripSlider(
  slider: HTMLElement,
  mask: HTMLElement,
  slides: HTMLElement[],
  infinite: boolean,
  duration: number
) {
  let currentIndex = 0;
  let destroyed = false;

  const prevBtn = slider.querySelector<HTMLElement>(".w-slider-arrow-left");
  const nextBtn = slider.querySelector<HTMLElement>(".w-slider-arrow-right");

  const syncPrevStyle = () => {
    const prevLabel = prevBtn?.querySelector<HTMLElement>("span");
    if (!prevLabel) return;

    if (!infinite && currentIndex === 0) {
      prevLabel.classList.add("u-text-gray");
    } else {
      prevLabel.classList.remove("u-text-gray");
    }
  };

  const layoutSlides = () => {
    const slideWidth = slider.clientWidth;
    if (slideWidth === 0) return 0;

    mask.style.position = "relative";
    mask.style.overflow = "hidden";
    mask.style.width = "100%";
    mask.style.display = "block";
    mask.style.whiteSpace = "nowrap";

    slides.forEach((slide) => {
      slide.style.position = "relative";
      slide.style.display = "inline-block";
      slide.style.verticalAlign = "top";
      slide.style.width = `${slideWidth}px`;
    });

    return slideWidth;
  };

  const syncHeight = () => {
    const activeSlide = slides[currentIndex];
    if (!activeSlide) return;

    const content = activeSlide.firstElementChild as HTMLElement | null;
    const height = content?.offsetHeight ?? activeSlide.scrollHeight;
    if (height <= 0) return;

    slider.style.height = `${height}px`;
    mask.style.height = `${height}px`;
  };

  const goTo = (index: number, animate = true) => {
    if (destroyed) return;

    currentIndex = getWrappedIndex(index, slides.length, infinite);

    const slideWidth = layoutSlides();
    if (slideWidth === 0) return;

    mask.style.transition = animate
      ? `transform ${duration}ms ease`
      : "none";
    mask.style.transform = `translate3d(-${currentIndex * slideWidth}px, 0px, 0px)`;

    syncPrevStyle();
    syncHeight();
  };

  const onPrev = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    goTo(currentIndex - 1);
  };

  const onNext = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    goTo(currentIndex + 1);
  };

  prevBtn?.addEventListener("click", onPrev);
  nextBtn?.addEventListener("click", onNext);

  const onResize = () => goTo(currentIndex, false);
  window.addEventListener("resize", onResize);

  let resizeObserver: ResizeObserver | undefined;
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(() => onResize());
    resizeObserver.observe(slider);
  }

  const runInitialLayout = () => goTo(0, false);
  runInitialLayout();

  if (slider.clientWidth === 0) {
    requestAnimationFrame(runInitialLayout);
    requestAnimationFrame(() => requestAnimationFrame(runInitialLayout));
  }

  return () => {
    destroyed = true;
    prevBtn?.removeEventListener("click", onPrev);
    nextBtn?.removeEventListener("click", onNext);
    window.removeEventListener("resize", onResize);
    resizeObserver?.disconnect();
    slider.removeAttribute(INIT_ATTR);
  };
}

function initWebflowSliders() {
  const sliders = document.querySelectorAll<HTMLElement>(
    `[data-review-slider]:not([${INIT_ATTR}]), .slider.w-slider:not([${INIT_ATTR}])`
  );
  const cleanups: Array<() => void> = [];

  sliders.forEach((slider) => {
    const mask = slider.querySelector<HTMLElement>(".w-slider-mask");
    const slides = Array.from(
      mask?.querySelectorAll<HTMLElement>(":scope > .w-slide") ?? []
    );

    if (!mask || slides.length === 0) return;

    slider.setAttribute(INIT_ATTR, "true");

    const infinite = slider.dataset.infinite === "true";
    const duration = Number.parseInt(slider.dataset.duration || "500", 10);
    const isReviewSlider =
      slider.hasAttribute("data-review-slider") ||
      slides.some((slide) => slide.classList.contains("slider-reviews"));

    const cleanup = isReviewSlider
      ? initReviewSlider(slider, mask, slides, infinite, duration)
      : initFilmstripSlider(slider, mask, slides, infinite, duration);

    cleanups.push(cleanup);
  });

  return cleanups.length
    ? () => {
        cleanups.forEach((cleanup) => cleanup());
      }
    : null;
}

export default function WebflowSlider() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const cleanup = initWebflowSliders();
    return () => cleanup?.();
  }, [pathname]);

  return null;
}
