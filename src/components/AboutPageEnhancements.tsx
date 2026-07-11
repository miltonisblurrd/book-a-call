"use client";

import Script from "next/script";
import { useCallback, useEffect } from "react";

declare global {
  interface Window {
    initAboutMyspacePlayer?: () => void;
    __mspPlayerReady?: boolean;
  }
}

function ordinal(day: number) {
  if (day >= 11 && day <= 13) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

function formatAboutDate(date: Date) {
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const day = ordinal(date.getDate());
  const year = date.getFullYear();
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${weekday}, ${month} ${day}, ${year} ${time}`;
}

function formatPublishDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  });
}

function getPublishDate() {
  const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE;
  if (buildDate) return buildDate;
  return formatPublishDate(new Date());
}

function findProfileValue(labelText: string) {
  const label = Array.from(
    document.querySelectorAll<HTMLElement>(".wrapper-profile p")
  ).find((p) => p.textContent?.trim() === labelText);
  return label?.nextElementSibling as HTMLElement | null;
}

export default function AboutPageEnhancements() {
  const initPlayer = useCallback(() => {
    window.initAboutMyspacePlayer?.();
  }, []);

  useEffect(() => {
    initPlayer();
    const retryId = window.setTimeout(initPlayer, 250);
    return () => window.clearTimeout(retryId);
  }, [initPlayer]);

  useEffect(() => {
    const updateDate = () => {
      const el = document.querySelector<HTMLElement>(".date-text");
      if (!el) return;
      const formatted = formatAboutDate(new Date());
      if (el.textContent !== formatted) el.textContent = formatted;
    };

    updateDate();
    const id = window.setInterval(updateDate, 1_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const value = findProfileValue("Latest Publish:");
    if (value) value.textContent = getPublishDate();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/profile-views", { method: "POST", signal: controller.signal })
      .then((res) => res.json())
      .then(({ views }: { views: number }) => {
        const value = findProfileValue("Profile Views:");
        if (value) value.textContent = views.toLocaleString("en-US");
      })
      .catch(() => {
        // Keep the static number from the export if the API is unreachable.
      });

    return () => controller.abort();
  }, []);

  return (
    <Script
      src="/js/about-myspace-player.js"
      strategy="afterInteractive"
      onLoad={initPlayer}
    />
  );
}
