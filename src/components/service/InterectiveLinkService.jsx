import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const InterectiveLinkService = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      const portfImgItem12 = document.querySelectorAll(".portfolio__item-12");

      function portfImageCursor(event, portfImgItem12) {
        const contentBox = portfImgItem12.getBoundingClientRect();
        const dx = event.clientX - contentBox.x;
        const dy = event.clientY - contentBox.y;
        portfImgItem12.children[3].style.transform = `translate(${dx}px, ${dy}px)`;
      }

      portfImgItem12.forEach((item, i) => {
        item.addEventListener("mousemove", (event) => {
          setInterval(portfImageCursor(event, item), 1000);
        });
      });
      let tHero = gsap.context(() => {
        gsap.set(".fade_bottom", { y: 30, opacity: 0 });

        if (device_width < 1023) {
          const fadeArray = gsap.utils.toArray(".fade_bottom");
          fadeArray.forEach((item, i) => {
            let fadeTl = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: "top center+=200",
              },
            });
            fadeTl.to(item, {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              duration: 1.5,
            });
          });
        } else {
          gsap.to(".fade_bottom", {
            scrollTrigger: {
              trigger: ".fade_bottom",
              start: "top center+=300",
              markers: false,
            },
            y: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 1,
            stagger: {
              each: 0.2,
            },
          });
        }
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <section className="portfolio__area-12">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-12">
              <div className="sec-title-wrapper">
                <h2 className="sub-title animation__char_come">selected </h2>
                <h3 className="title animation__char_come">
                  wo<span>r</span>k
                </h3>
                <p className="fade_bottom">
                  Static and dynamic secure code can prevent a 0day before your
                  product is even released. We can integrate with your dev
                  environment
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xx-12">
              <div className="portfolio__list-12">
                <Link href="/portfolio-details">
                  <div className="portfolio__item-12 fade_bottom">
                    <h4 className="portfolio__no-12">01</h4>
                    <h5 className="portfolio__title-12">
                      Design <span>CONCEPT</span>
                    </h5>
                    <p>
                      Branding <br /> - 2014
                    </p>
                    <div
                      className="portfolio__hover-12"
                      style={{
                        backgroundImage: "url(assets/imgs/service/3/1.jpg)",
                      }}
                    ></div>
                  </div>
                </Link>
                <Link href="/portfolio-details">
                  <div className="portfolio__item-12 fade_bottom">
                    <h4 className="portfolio__no-12">02</h4>
                    <h5 className="portfolio__title-12">
                      Vector <span>Art</span>
                    </h5>
                    <p>
                      Artwork <br /> - 2012
                    </p>
                    <div
                      className="portfolio__hover-12"
                      style={{
                        backgroundImage: "url(assets/imgs/service/3/2.png)",
                      }}
                    ></div>
                  </div>
                </Link>
                <Link href="/portfolio-details">
                  <div className="portfolio__item-12 fade_bottom">
                    <h4 className="portfolio__no-12">03</h4>
                    <h5 className="portfolio__title-12">
                      blue <span>Shadow</span>
                    </h5>
                    <p>
                      Marketing <br /> - 2014
                    </p>
                    <div
                      className="portfolio__hover-12"
                      style={{
                        backgroundImage: "url(assets/imgs/service/3/3.png)",
                      }}
                    ></div>
                  </div>
                </Link>
                <Link href="/portfolio-details">
                  <div className="portfolio__item-12 fade_bottom">
                    <h4 className="portfolio__no-12">04</h4>
                    <h5 className="portfolio__title-12">
                      Visual <span>Pastom</span>
                    </h5>
                    <p>
                      Interaction <br /> - 2014
                    </p>
                    <div
                      className="portfolio__hover-12"
                      style={{
                        backgroundImage: "url(assets/imgs/service/3/4.png)",
                      }}
                    ></div>
                  </div>
                </Link>
                <Link href="/portfolio-details">
                  <div className="portfolio__item-12 fade_bottom">
                    <h4 className="portfolio__no-12">05</h4>
                    <h5 className="portfolio__title-12">
                      FRESH <span>EDGE</span>
                    </h5>
                    <p>
                      Design <br /> - 2014
                    </p>
                    <div
                      className="portfolio__hover-12"
                      style={{
                        backgroundImage: "url(assets/imgs/service/3/5.jpg)",
                      }}
                    ></div>
                  </div>
                </Link>

                <div className="service3__img-wrap">
                  <div className="service3__img"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InterectiveLinkService;
