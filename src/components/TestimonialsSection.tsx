import { TESTIMONIALS } from "@/data/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="section u-pt-0">
      <div className="container">
        <div className="wrapper-orange">
          <h2 className="h2">Testimonials</h2>
        </div>
        <div
          data-delay="4000"
          data-animation="slide"
          className="slider testimonials-slider"
          data-review-slider
          data-autoplay="false"
          data-easing="ease"
          data-hide-arrows="false"
          data-disable-swipe="false"
          data-autoplay-limit="0"
          data-nav-spacing="3"
          data-duration="500"
          data-infinite="true"
        >
          <div className="mask w-slider-mask">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.name} className="slider-reviews w-slide">
                <div className="wrapper-blue testimonials-card">
                  <div className="wrapper-blue-header u-p-20-around">
                    <div className="wrapper-header u-mb-0">
                      <img
                        src={testimonial.avatar}
                        loading="lazy"
                        alt=""
                        className="image-header"
                      />
                      <p className="text-paragraph u-extra-bold u-text-white u-mb-0 u-mr-2">
                        {testimonial.name}
                      </p>
                      {testimonial.logo ? (
                        <>
                          <div className="line-divider-vertical u-bg-white" />
                          <img
                            src={testimonial.logo.src}
                            loading="lazy"
                            sizes={testimonial.logo.sizes}
                            srcSet={testimonial.logo.srcSet}
                            alt=""
                            className={
                              testimonial.logo.cover
                                ? "image-blurrd u-cover"
                                : "image-blurrd"
                            }
                          />
                        </>
                      ) : null}
                    </div>
                  </div>
                  <p
                    className="text-paragraph u-text-gray u-margin-20-around"
                    dangerouslySetInnerHTML={{ __html: testimonial.quoteHtml }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="left-arrow w-slider-arrow-left">
            <div className="text-paragraph">
              [<span className="u-text-gray">previous</span>
            </div>
          </div>
          <div className="right-arrow w-slider-arrow-right">
            <div className="text-paragraph">next]</div>
          </div>
          <div className="slide-nav u-d-none w-slider-nav w-num" />
        </div>
      </div>
    </section>
  );
}
