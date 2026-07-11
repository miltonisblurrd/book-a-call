"use client";

import { useLayoutEffect } from "react";

function initPricingTabs() {
  const tabsRoot = document.querySelector<HTMLElement>(".tabs-pricing.w-tabs");
  if (!tabsRoot) return null;

  const tabLinks = Array.from(
    tabsRoot.querySelectorAll<HTMLElement>(".w-tab-menu a[data-w-tab]")
  );
  const panes = Array.from(
    tabsRoot.querySelectorAll<HTMLElement>(".w-tab-content > [data-w-tab]")
  );

  if (tabLinks.length === 0 || panes.length === 0) return null;

  const activate = (tabId: string) => {
    tabLinks.forEach((link) => {
      link.classList.toggle("w--current", link.dataset.wTab === tabId);
    });
    panes.forEach((pane) => {
      pane.classList.toggle("w--tab-active", pane.dataset.wTab === tabId);
    });
  };

  const handlers = tabLinks.map((link) => {
    const handler = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      if (link.dataset.wTab) activate(link.dataset.wTab);
    };
    link.addEventListener("click", handler);
    return () => link.removeEventListener("click", handler);
  });

  const currentTab =
    tabLinks.find((link) => link.classList.contains("w--current"))?.dataset
      .wTab ?? tabLinks[0]?.dataset.wTab;
  if (currentTab) activate(currentTab);

  return () => {
    handlers.forEach((cleanup) => cleanup());
  };
}

export default function ServicesPricingTabs() {
  useLayoutEffect(() => {
    let cleanup = initPricingTabs();

    if (!cleanup) {
      const id = window.requestAnimationFrame(() => {
        cleanup = initPricingTabs();
      });
      return () => {
        window.cancelAnimationFrame(id);
        cleanup?.();
      };
    }

    return cleanup;
  }, []);

  return null;
}
