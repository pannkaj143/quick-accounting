import Link from "next/link";
import React, { useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Image from "next/image";

import PortfolioHome401 from "../../../public/assets/imgs/portfolio/portfolio-home-4/portfolio-01.jpg"
import PortfolioHome412 from "../../../public/assets/imgs/portfolio/portfolio-home-4/12.jpg"
import PortfolioHome409 from "../../../public/assets/imgs/portfolio/portfolio-home-4/9.jpg"
import PortfolioHome402 from "../../../public/assets/imgs/portfolio/portfolio-home-4/portfolio-02.jpg"
import PortfolioHome405 from "../../../public/assets/imgs/portfolio/portfolio-home-4/portfolio-05.jpg"
import PortfolioHome410 from "../../../public/assets/imgs/portfolio/portfolio-home-4/10.jpg"
import PortfolioHome403 from "../../../public/assets/imgs/portfolio/portfolio-home-4/portfolio-03.jpg"
import PortfolioHome406 from "../../../public/assets/imgs/portfolio/portfolio-home-4/portfolio-06.jpg"

gsap.registerPlugin(ScrollTrigger);

const PortfolioMasonryGallery = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        // Fade Bottom 2
        gsap.set(".fade_bottom_3", { y: 30, opacity: 0 });

        if (device_width < 1023) {
          const fadeArray = gsap.utils.toArray(".fade_bottom_3");
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
          gsap.to(".fade_bottom_3", {
            scrollTrigger: {
              trigger: ".fade_bottom_3",
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
      <div class="showcase__area-4">
        <div class="row">
          <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
            <div class="showcase4 wc-tilt-2 fade_bottom_3">
              <Tilt perspective={2000}>
                <Link href="/portfolio-details">
                  <div class="showcase4__thumb">
                  <Image
                    priority
                    width={850}
                    style={{ height: "auto" }}
                    src={PortfolioHome401}
                    alt="image"
                    data-speed="auto"
                  />
                  </div>
                  <div class="showcase4__content">
                    <div class="showcase4__content__left">
                      <h2>
                        Design <br /> <span>concept</span>
                      </h2>
                    </div>
                    <div class="showcase4__content__right">
                      <span>
                        design <br />{" "}
                      </span>
                      <span>- 2019 </span>
                    </div>
                  </div>
                </Link>
              </Tilt>
            </div>
          </div>
          <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
            <div class="showcase4 wc-tilt-2 fade_bottom_3">
              <Tilt perspective={2000}>
                <Link href="/portfolio-details">
                  <div class="showcase4__thumb">
                  <Image
                    priority
                    width={850}
                    style={{ height: "auto" }}
                    src={PortfolioHome412}
                    alt="image"
                    data-speed="auto"
                  />
                    
                  </div>
                  <div class="showcase4__content">
                    <div class="showcase4__content__left">
                      <h2>
                        vector <br /> <span>art</span>
                      </h2>
                    </div>
                    <div class="showcase4__content__right">
                      <span>
                        branding <br />{" "}
                      </span>
                      <span>- 2019 </span>
                    </div>
                  </div>
                </Link>
              </Tilt>
            </div>
          </div>

          <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
            <div class="showcase4 wc-tilt-2 fade_bottom_3">
              <Tilt perspective={2000}>
                <Link href="/portfolio-details">
                  <div class="showcase4__thumb">
                  <Image
                    priority
                    width={1820}
                    style={{ height: "auto" }}
                    src={PortfolioHome409}
                    alt="image"
                    data-speed="auto"
                  />
                  </div>
                  <div class="showcase4__content">
                    <div class="showcase4__content__left">
                      <h2>
                        Visual
                        <br /> <span>Pastom</span>
                      </h2>
                    </div>
                    <div class="showcase4__content__right">
                      <span>
                        Interaction <br />{" "}
                      </span>
                      <span>- 2019 </span>
                    </div>
                  </div>
                </Link>
              </Tilt>
            </div>
          </div>
          <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
            <div class="showcase4 wc-tilt-2 fade_bottom_3">
              <Tilt perspective={2000}>
                <Link href="/portfolio-details">
                  <div class="showcase4__thumb">
                  <Image
                    priority
                    width={850}
                    style={{ height: "auto" }}
                    src={PortfolioHome402}
                    alt="image"
                    data-speed="auto"
                  />
                  </div>
                  <div class="showcase4__content">
                    <div class="showcase4__content__left">
                      <h2>
                        Design <br /> <span>concept</span>
                      </h2>
                    </div>
                    <div class="showcase4__content__right">
                      <span>
                        branding <br />{" "}
                      </span>
                      <span>- 2019 </span>
                    </div>
                  </div>
                </Link>
              </Tilt>
            </div>
          </div>
          <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
            <div class="showcase4 wc-tilt-2 fade_bottom_3">
              <Tilt perspective={2000}>
                <Link href="/portfolio-details">
                  <div class="showcase4__thumb">
                  <Image
                    priority
                    width={850}
                    style={{ height: "auto" }}
                    src={PortfolioHome405}
                    alt="image"
                    data-speed="auto"
                  />
                  </div>
                  <div class="showcase4__content">
                    <div class="showcase4__content__left">
                      <h2>
                        vector <br /> <span>art</span>
                      </h2>
                    </div>
                    <div class="showcase4__content__right">
                      <span>
                        branding <br />{" "}
                      </span>
                      <span>- 2019 </span>
                    </div>
                  </div>
                </Link>
              </Tilt>
            </div>
          </div>
          <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
            <div class="showcase4 wc-tilt-2 fade_bottom_3">
              <Tilt perspective={2000}>
                <Link href="/portfolio-details">
                  <div class="showcase4__thumb">
                  <Image
                    priority
                    width={1820}
                    style={{ height: "auto" }}
                    src={PortfolioHome410}
                    alt="image"
                    data-speed="auto"
                  />
                  </div>
                  <div class="showcase4__content">
                    <div class="showcase4__content__left">
                      <h2>
                        Visual
                        <br /> <span>Pastom</span>
                      </h2>
                    </div>
                    <div class="showcase4__content__right">
                      <span>
                        Interaction <br />{" "}
                      </span>
                      <span>- 2019 </span>
                    </div>
                  </div>
                </Link>
              </Tilt>
            </div>
          </div>
          <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
            <div class="showcase4 wc-tilt-2 fade_bottom_3">
              <Tilt perspective={2000}>
                <Link href="/portfolio-details">
                  <div class="showcase4__thumb">
                  <Image
                    priority
                    width={850}
                    style={{ height: "auto" }}
                    src={PortfolioHome403}
                    alt="image"
                    data-speed="auto"
                  />
                  </div>
                  <div class="showcase4__content">
                    <div class="showcase4__content__left">
                      <h2>
                        Design <br /> <span>concept</span>
                      </h2>
                    </div>
                    <div class="showcase4__content__right">
                      <span>
                        branding <br />{" "}
                      </span>
                      <span>- 2019 </span>
                    </div>
                  </div>
                </Link>
              </Tilt>
            </div>
          </div>
          <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
            <div class="showcase4 wc-tilt-2 fade_bottom_3 m-0">
              <Tilt perspective={2000}>
                <Link href="/portfolio-details">
                  <div class="showcase4__thumb">
                  <Image
                    priority
                    width={850}
                    style={{ height: "auto" }}
                    src={PortfolioHome406}
                    alt="image"
                    data-speed="auto"
                  />
                  </div>
                  <div class="showcase4__content">
                    <div class="showcase4__content__left">
                      <h2>
                        vector <br /> <span>art</span>
                      </h2>
                    </div>
                    <div class="showcase4__content__right">
                      <span>
                        branding <br />{" "}
                      </span>
                      <span>- 2019 </span>
                    </div>
                  </div>
                </Link>
              </Tilt>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioMasonryGallery;
