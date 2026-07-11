"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const PANEL_TRANSITION_MS = 450;

function initWorkProjectOverlays() {
  const triggers = document.querySelectorAll<HTMLElement>(
    ".work-section-pane .wrapper-work .wrapper-blue.u-scroll-none"
  );

  if (!triggers.length) return null;

  let openModal: HTMLElement | null = null;
  let closeTimer: ReturnType<typeof setTimeout> | null = null;

  const clearCloseTimer = () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  };

  const closeModal = (modal: HTMLElement) => {
    if (openModal !== modal) return;

    clearCloseTimer();
    modal.classList.remove("is-open");
    openModal = null;

    closeTimer = setTimeout(() => {
      modal.style.display = "none";
      document.body.classList.remove("work-overlay-open");
      closeTimer = null;
    }, PANEL_TRANSITION_MS);
  };

  const openProjectModal = (modal: HTMLElement) => {
    if (openModal && openModal !== modal) {
      closeModal(openModal);
    }

    clearCloseTimer();
    openModal = modal;

    modal.style.display = "flex";
    document.body.classList.add("work-overlay-open");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.classList.add("is-open");
      });
    });
  };

  const cleanups: Array<() => void> = [];

  triggers.forEach((trigger) => {
    const workItem = trigger.closest(".wrapper-work");
    const modal = workItem?.querySelector<HTMLElement>(
      ".contact-modal3_component"
    );

    if (!modal) return;

    modal.classList.add("work-project-overlay");

    const overlay = modal.querySelector<HTMLElement>(
      ".contact-modal3_background-overlay"
    );
    const closeButton = modal.querySelector<HTMLElement>(
      ".contact-modal3_close-button"
    );

    trigger.style.cursor = "pointer";
    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");

    const onTriggerClick = (e: Event) => {
      e.preventDefault();
      openProjectModal(modal);
    };

    const onTriggerKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProjectModal(modal);
      }
    };

    const onOverlayClick = () => closeModal(modal);

    const onCloseClick = (e: Event) => {
      e.preventDefault();
      closeModal(modal);
    };

    trigger.addEventListener("click", onTriggerClick);
    trigger.addEventListener("keydown", onTriggerKeyDown);
    overlay?.addEventListener("click", onOverlayClick);
    closeButton?.addEventListener("click", onCloseClick);

    cleanups.push(() => {
      trigger.removeEventListener("click", onTriggerClick);
      trigger.removeEventListener("keydown", onTriggerKeyDown);
      overlay?.removeEventListener("click", onOverlayClick);
      closeButton?.removeEventListener("click", onCloseClick);
    });
  });

  const onEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && openModal) {
      closeModal(openModal);
    }
  };

  document.addEventListener("keydown", onEscape);
  cleanups.push(() => document.removeEventListener("keydown", onEscape));

  return () => {
    clearCloseTimer();
    if (openModal) {
      openModal.classList.remove("is-open");
      openModal.style.display = "none";
    }
    document.body.classList.remove("work-overlay-open");
    cleanups.forEach((fn) => fn());
  };
}

export default function WorkProjectOverlay() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    let cleanup = initWorkProjectOverlays();

    if (!cleanup) {
      const id = window.requestAnimationFrame(() => {
        cleanup = initWorkProjectOverlays();
      });
      return () => {
        window.cancelAnimationFrame(id);
        cleanup?.();
      };
    }

    return cleanup;
  }, [pathname]);

  return null;
}
