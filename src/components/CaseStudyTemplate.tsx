import type { ContentItem } from "@/lib/content";
import Link from "next/link";
import OtherCaseStudies from "./OtherCaseStudies";
import PageCta from "./PageCta";
import TestimonialsSection from "./TestimonialsSection";
import WebflowContent from "./WebflowContent";

type CaseStudyTemplateProps = {
  caseStudy: ContentItem;
};

const FIRST_SECTION_PATTERN = /^\s*<section\b[\s\S]*?<\/section>/i;

export default function CaseStudyTemplate({
  caseStudy,
}: CaseStudyTemplateProps) {
  const details = caseStudy.caseStudy;

  if (!details) {
    return <WebflowContent html={caseStudy.content} depth={1} />;
  }

  const projectContent = caseStudy.content.replace(FIRST_SECTION_PATTERN, "");

  return (
    <>
      <section className="section u-p-40-hero case-study-hero">
        <div className="container">
          <div className="case-study-breadcrumb">
            <Link href="/">Work</Link>
            <span aria-hidden="true">→</span>
            <span>{caseStudy.client}</span>
          </div>

          <p className="case-study-eyebrow">
            {details.eyebrow || `${caseStudy.client} case study`}
          </p>
          <h1 className="case-study-title">{details.headline}</h1>
          <p className="case-study-summary">{details.summary}</p>

          <div className="case-study-hero-actions">
            <Link href="/book-a-call" className="btn u-mr-2 small w-button">
              Discuss a Similar Project
            </Link>
            <a href="#project-work" className="case-study-text-link">
              View the work ↓
            </a>
          </div>

          <dl className="case-study-snapshot">
            <div>
              <dt>Client</dt>
              <dd>{caseStudy.client}</dd>
            </div>
            <div>
              <dt>Industry</dt>
              <dd>{details.industry}</dd>
            </div>
            <div>
              <dt>Engagement</dt>
              <dd>{details.engagement}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{details.role}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section u-pt-0">
        <div className="container">
          <div className="wrapper-orange">
            <h2 className="h2">From Business Challenge to Brand System</h2>
          </div>
          <div className="case-study-story">
            <article>
              <span className="case-study-step">01 / The challenge</span>
              <h2>
                {details.challengeTitle ||
                  "Make a complex product easier to understand."}
              </h2>
              <p>{details.challenge}</p>
            </article>
            <article>
              <span className="case-study-step">02 / The approach</span>
              <h2>
                {details.approachTitle ||
                  "Build clarity and credibility into every touchpoint."}
              </h2>
              <p>{details.approach}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section u-pt-0">
        <div className="container">
          <div className="case-study-scope">
            <div>
              <p className="case-study-eyebrow">Capabilities applied</p>
              <h2>A focused team, working across the whole experience.</h2>
            </div>
            <ul aria-label="Services provided">
              {details.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div id="project-work" className="case-study-project-work">
        <WebflowContent html={projectContent} depth={1} />
      </div>

      <section className="section u-pt-0">
        <div className="container">
          <div className="wrapper-orange">
            <h2 className="h2">The Result</h2>
          </div>
          <div className="case-study-results">
            <div className="case-study-outcomes">
              {details.outcomes.map((outcome, index) => (
                <article key={outcome}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{outcome}</p>
                </article>
              ))}
            </div>
            <aside>
              <p className="case-study-step">Delivered</p>
              <ul>
                {details.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
            </aside>
          </div>
          <p className="case-study-result-note">
            {details.resultSummary ||
              "The outcome was more than a polished website. It was a clearer foundation for explaining the product, earning buyer confidence, and scaling future marketing."}
          </p>
        </div>
      </section>

      <OtherCaseStudies excludeSlug={caseStudy.slug} />
      <TestimonialsSection />

      <PageCta
        headline={details.ctaHeadline || "Need Complex Work Made Clear?"}
      />
    </>
  );
}
