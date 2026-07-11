import {
  getOtherCaseStudyShowcases,
  type CaseStudyShowcase,
} from "@/data/case-study-showcase";
import Link from "next/link";

type OtherCaseStudiesProps = {
  excludeSlug: string;
};

function CaseStudyShowcaseCard({
  item,
  isLast,
}: {
  item: CaseStudyShowcase;
  isLast: boolean;
}) {
  return (
    <div className={`wrapper-work${isLast ? " u-mb-0" : ""}`}>
      <Link
        href={`/case-studies/${item.slug}`}
        className="wrapper-blue u-scroll-none work-project-card other-case-study-card"
      >
        <div className="wrapper-blue-header u-mb-2">
          <div className="wrapper-header u-mb-0 u-p-20-around">
            <p className="text-paragraph u-extra-bold u-text-white u-mb-0 u-mr-2">
              {item.name}
            </p>
          </div>
          <img
            src={item.thumbnail}
            loading="lazy"
            alt=""
            className={`image-work-thumbnail${item.thumbnailClass ? ` ${item.thumbnailClass}` : ""}`}
          />
        </div>
      </Link>
      {item.categories.map((category) => (
        <span key={category} className="link-categories w-inline-block">
          <div className="h2">{category}</div>
        </span>
      ))}
    </div>
  );
}

export default function OtherCaseStudies({ excludeSlug }: OtherCaseStudiesProps) {
  const studies = getOtherCaseStudyShowcases(excludeSlug, 6);

  if (studies.length === 0) return null;

  return (
    <section className="section u-pt-0 other-case-studies">
      <div className="container">
        <div className="wrapper-orange">
          <h2 className="h2">Other Case Studies</h2>
        </div>
        <div className="work-section-pane work-section--grid other-case-studies-grid">
          {studies.map((study, index) => (
            <CaseStudyShowcaseCard
              key={study.slug}
              item={study}
              isLast={index === studies.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
