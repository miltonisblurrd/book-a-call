import Link from "next/link";

export default function LearnPageCta() {
  return (
    <section className="section u-p-40-hero">
      <div className="container">
        <img
          loading="lazy"
          src="/images/Group-47609-1.svg"
          alt=""
          className="iimage-reviews u-text-center"
        />
        <h1 className="h1 u-text-center u-mt-2">
          <strong className="bold-text">Questions on Any Resources Above?</strong>
        </h1>
        <div className="wrapper-buttons u-mt-2 u-text-center">
          <a
            href="mailto:milton@Blurrdstudio.com?subject=Question%20for%20Milton%20at%20BLURRD%20studio"
            className="btn white w-button"
          >
            Send Me An Email
          </a>
        </div>
      </div>
    </section>
  );
}
