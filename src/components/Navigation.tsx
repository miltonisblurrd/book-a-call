"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SERVICE_LINKS = [
  { href: "/services/branding", label: "Brand Identity & Kits" },
  { href: "/services/design", label: "Web & Product Design" },
  { href: "/services/development", label: "Web & Product Development" },
] as const;

export default function Navigation() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const isServicesActive = isActive("/services");
  const isAboutPage = pathname === "/about";
  const containerClass = isAboutPage ? "container about" : "container";

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-open", mobileOpen);
    return () => document.body.classList.remove("mobile-nav-open");
  }, [mobileOpen]);

  return (
    <nav className="nav-master">
      <div className="nav-top">
        <div className={containerClass}>
          <div className="wrapper-header nav-top-row">
            <Link href="/" className="nav-brand-link" aria-label="BLURRD Studio home">
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
            </Link>

            <button
              type="button"
              className={`mobile-nav-toggle${mobileOpen ? " is-open" : ""}`}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <div className="nav-bottom nav-bottom-desktop">
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
                {SERVICE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`h2 u-underline-none u-mb-1${pathname === link.href ? " w--current" : ""}`}
                  >
                    {link.label}
                  </Link>
                ))}
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

      <div
        id="mobile-nav-panel"
        className={`mobile-nav-panel${mobileOpen ? " is-open" : ""}`}
      >
        <div className="mobile-nav-links">
          <Link href="/" className={pathname === "/" ? "is-active" : undefined}>
            Home
          </Link>
          <Link
            href="/services"
            className={isServicesActive ? "is-active" : undefined}
          >
            Services
          </Link>
          {SERVICE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`mobile-nav-sublink${pathname === link.href ? " is-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/about"
            className={isActive("/about") ? "is-active" : undefined}
          >
            About
          </Link>
          <Link
            href="/blog"
            className={isActive("/blog") ? "is-active" : undefined}
          >
            Blog
          </Link>
          <Link href="/faqs">FAQs</Link>
          <Link href="/book-a-call" className="mobile-nav-cta">
            Book a 15 Min. Call
          </Link>
        </div>
      </div>
    </nav>
  );
}
