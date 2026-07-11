"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { initWorkProjectHover } from "@/components/WorkProjectHover";

function initWorkSectionToggle() {
  const tabMenu = document.querySelector(".wrapper-orange.work.w-tab-menu");
  if (!tabMenu) return null;

  const tabsRoot = tabMenu.closest(".w-tabs");
  if (!tabsRoot) return null;

  const columnLink = tabsRoot.querySelector<HTMLElement>(
    '.w-tab-menu a[data-w-tab="Tab 1"]'
  );
  const gridLink = tabsRoot.querySelector<HTMLElement>(
    '.w-tab-menu a[data-w-tab="Tab 2"]'
  );
  const workPane = tabsRoot.querySelector<HTMLElement>(
    '.w-tab-content > [data-w-tab="Tab 1"]'
  );
  const gridPane = tabsRoot.querySelector<HTMLElement>(
    '.w-tab-content > [data-w-tab="Tab 2"]'
  );

  if (!columnLink || !gridLink || !workPane) return null;

  // One list of projects — hide duplicate grid tab pane from Webflow export
  if (gridPane) {
    gridPane.style.display = "none";
    gridPane.classList.remove("w--tab-active");
  }

  workPane.classList.add("w--tab-active", "work-section-pane");
  workPane.classList.add("work-section--column");

  const setView = (view: "column" | "grid") => {
    const isColumn = view === "column";

    columnLink.classList.toggle("w--current", isColumn);
    gridLink.classList.toggle("w--current", !isColumn);
    workPane.classList.toggle("work-section--column", isColumn);
    workPane.classList.toggle("work-section--grid", !isColumn);
  };

  const onColumnClick = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    setView("column");
  };

  const onGridClick = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    setView("grid");
  };

  columnLink.addEventListener("click", onColumnClick);
  gridLink.addEventListener("click", onGridClick);

  setView("column");
  initWorkProjectHover();

  return () => {
    columnLink.removeEventListener("click", onColumnClick);
    gridLink.removeEventListener("click", onGridClick);
  };
}

export default function WorkSectionToggle() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    let cleanup = initWorkSectionToggle();

    if (!cleanup) {
      const id = window.requestAnimationFrame(() => {
        cleanup = initWorkSectionToggle();
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
