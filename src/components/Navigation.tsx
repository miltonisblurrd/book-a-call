"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const isServicesActive = isActive("/services");
  const isAboutPage = pathname === "/about";
  const containerClass = isAboutPage ? "container about" : "container";

  return (
    <nav className="nav-master">
      <div className="nav-top">
        <div className={containerClass}>
          <div className="wrapper-header">
            <img
              sizes="(max-width: 1170px) 100vw, 1170px"
              srcSet="/images/IMG_6481-p-500.jpg 500w, /images/IMG_6481-p-800.jpg 800w, /images/IMG_6481-p-1080.jpg 1080w, /images/IMG_6481.jpg 1170w"
              alt="Blurrd's Blurry Selfie"
              loading="eager"
              src="/images/IMG_6481.jpg"
              className="image-header"
            />
            <div className="line-divider-vertical u-bg-white" />
            <div
              className="image-blurrd"
              data-rive-url="/logo.riv"
              data-rive-state-machine="State Machine 1"
              data-rive-artboard="Artboard"
              data-rive-autoplay="true"
              data-rive-is-touch-scroll-enabled="false"
              data-rive-automatically-handle-events="false"
              data-rive-fit="contain"
              data-rive-alignment="center"
              data-animation-type="rive"
            >
              <canvas style={{ height: "100%", width: "100%" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="nav-bottom">
        <div className={containerClass}>
          <div className="grid-navigation">
            <Link
              id="w-node-dd165d71-daff-afae-de91-3b451ed6c7e0-1ed6c7d6"
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={`link-nav w-inline-block${pathname === "/" ? " w--current" : ""}`}
            >
              <h2 className="h2">Home</h2>
            </Link>
            <div
              className={`link-nav u-border-left-none w-dropdown${servicesOpen ? " w--open" : ""}${isServicesActive ? " w--current" : ""}`}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <div
                className="dropdown-toggle w-dropdown-toggle"
                onClick={() => setServicesOpen((v) => !v)}
              >
                <div className="icon-nav-dropdown w-icon-dropdown-toggle" />
                <Link
                  href="/services"
                  className="h2"
                  onClick={(event) => event.stopPropagation()}
                >
                  Services
                </Link>
              </div>
              <nav
                className={`dropdown-list w-dropdown-list${servicesOpen ? " w--open" : ""}`}
              >
                <Link
                  href="/services/branding"
                  aria-current={pathname === "/services/branding" ? "page" : undefined}
                  className={`h2 u-underline-none u-mb-1${pathname === "/services/branding" ? " w--current" : ""}`}
                >
                  Brand Identity & Kits
                </Link>
                <Link
                  href="/services/design"
                  aria-current={pathname === "/services/design" ? "page" : undefined}
                  className={`h2 u-underline-none u-mb-1${pathname === "/services/design" ? " w--current" : ""}`}
                >
                  Web & Product Design
                </Link>
                <Link
                  href="/services/development"
                  aria-current={
                    pathname === "/services/development" ? "page" : undefined
                  }
                  className={`h2 u-underline-none${pathname === "/services/development" ? " w--current" : ""}`}
                >
                  Web & Product Development
                </Link>
              </nav>
            </div>
            <Link
              id="w-node-dd165d71-daff-afae-de91-3b451ed6c7ef-1ed6c7d6"
              href="/about"
              aria-current={isActive("/about") ? "page" : undefined}
              className={`link-nav u-border-left-none w-inline-block${isActive("/about") ? " w--current" : ""}`}
            >
              <h2 className="h2">About</h2>
            </Link>
            <Link
              id="w-node-dd165d71-daff-afae-de91-3b451ed6c7f2-1ed6c7d6"
              href="/blog"
              aria-current={isActive("/blog") ? "page" : undefined}
              className={`link-nav u-border-left-none w-inline-block${isActive("/blog") ? " w--current" : ""}`}
            >
              <h2 className="h2">Blog</h2>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
