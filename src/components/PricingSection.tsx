"use client";

import Link from "next/link";
import { useState } from "react";

type PricingTab = {
  id: string;
  label: string;
  eyebrow: string;
  price: string;
  features: string[];
};

const PRICING_TABS: PricingTab[] = [
  {
    id: "product",
    label: "Product",
    eyebrow: "Custom scope",
    price: "$15,000+",
    features: [
      "Mobile/web/desktop products",
      "Dedicated PM + senior designer",
      "Deep UX research",
      "Pixel-perfect frontend development",
      "Rapid iteration and feedback cycles",
      "Figma + PNG handoff",
    ],
  },
  {
    id: "landing",
    label: "Landing",
    eyebrow: "Flat fee",
    price: "$6,000",
    features: [
      "Single page",
      "3 full design concepts",
      "Full copywriting",
      "2 week delivery",
      "Figma + rive/lottie",
      "Framer/Webflow/NextJS",
    ],
  },
  {
    id: "web",
    label: "Web",
    eyebrow: "Custom scope",
    price: "$10,000+",
    features: [
      "Multiple pages",
      "3 full design concepts",
      "Full copywriting",
      "2-4 week delivery",
      "Figma + rive/lottie",
      "Framer/Webflow/NextJS",
    ],
  },
  {
    id: "brand",
    label: "Brand",
    eyebrow: "Flat fee",
    price: "$7,500",
    features: [
      "Logo, type, colors",
      "Brand assets",
      "Brand guidelines",
      "2 week delivery",
      "5 full brand explorations",
      "Ready-to-use brand kit",
    ],
  },
];

const RETAINER_FEATURES = [
  "1 request at a time",
  "Flexible, evolving scope",
  "Daily updates mon-fri",
  "Dedicated project manager",
];

type PricingSectionProps = {
  id?: string;
};

export default function PricingSection({ id }: PricingSectionProps) {
  const [activeId, setActiveId] = useState(PRICING_TABS[0].id);
  const active = PRICING_TABS.find((tab) => tab.id === activeId) ?? PRICING_TABS[0];

  return (
    <section id={id} className="section u-pt-0">
      <div className="container">
        <div className="wrapper-orange">
          <h2 className="h2">Pricing</h2>
        </div>
        <div className="wrapper-blue u-scroll-none">
          <div className="wrapper-blue-header u-mb-2">
            <div className="grid-3 pricing">
              <div className="tabs-pricing">
                <div className="tabs-menu" role="tablist" aria-label="Pricing packages">
                  {PRICING_TABS.map((tab) => {
                    const selected = tab.id === activeId;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        id={`pricing-tab-${tab.id}`}
                        aria-selected={selected}
                        aria-controls={`pricing-panel-${tab.id}`}
                        tabIndex={selected ? 0 : -1}
                        className={`tab-pricing w-inline-block w-tab-link${selected ? " w--current" : ""}`}
                        onClick={() => setActiveId(tab.id)}
                      >
                        <div className="text-paragraph text-size-small u-text-center">
                          <strong>{tab.label}</strong>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div
                  id={`pricing-panel-${active.id}`}
                  role="tabpanel"
                  aria-labelledby={`pricing-tab-${active.id}`}
                  className="wrapper-pricing"
                >
                  <div className="text-paragraph-article-body">
                    <strong>{active.eyebrow}</strong>
                  </div>
                  <div className="text-paragraph u-mb-1">
                    <strong>{active.price}</strong>
                  </div>
                  <ul role="list">
                    {active.features.map((feature) => (
                      <li key={feature}>
                        <div className="text-paragraph-article-body">
                          <strong>{feature}</strong>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Link href="/book-a-call" className="btn u-mr-2 small w-button">
                    Book Intro
                  </Link>
                </div>
              </div>
              <div className="wrapper-pricing u-bg-black u-d-flex-space">
                <div>
                  <div className="text-paragraph-article-body u-text-white">
                    <strong>Design + dev retainer</strong>
                  </div>
                  <div className="text-paragraph u-mb-1 u-text-baby-blue">
                    <strong>$10,000/mo</strong>
                  </div>
                  <ul role="list" className="u-text-white">
                    {RETAINER_FEATURES.map((feature) => (
                      <li key={feature}>
                        <div className="text-paragraph-article-body u-text-white">
                          <strong>{feature}</strong>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Link href="/book-a-call" className="btn u-mr-2 small w-button">
                    Book Intro
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
