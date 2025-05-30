/** @format */

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollSmoother, ScrollToPlugin } from "@/plugins";
import A1 from "../../../public/assets/imgs/home-7/a1.jpg";
import Video from "../../../public/assets/imgs/home-7/video.jpg";
import Shape4 from "../../../public/assets/imgs/home-7/shape-4.png";
import Shape5 from "../../../public/assets/imgs/home-7/shape-5.png";
import A2 from "../../../public/assets/imgs/home-7/a2.jpg";
import A3 from "../../../public/assets/imgs/home-7/a3.jpg";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

const CreativeAgencyAbout = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        ScrollSmoother.create({
          smooth: 1.35,
          effects: device_width < 1025 ? false : true,
          smoothTouch: false,
          normalizeScroll: false,
          ignoreMobileResize: true,
        });
        gsap.to(".about__img-2 img", {
          scale: 1.15,
          duration: 1,
          scrollTrigger: {
            trigger: ".about__img-2",
            start: "top bottom",
            markers: false,
            scrub: 1,
            end: "bottom center",
          },
        });
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <div className="video__area about__img-2">
        <Image
          priority
          style={{ width: "auto", height: "auto" }}
          src={Video}
          alt="Video Image"
          data-speed="0.2"
        />
      </div>
      <section className="about__area-7">
        <div className="container pt-130 pb-110">
          <div className="row">
            <div className="col-xxl-12">
              <div className="sec-title-wrapper">
                <h2 className="sec-title title-anim">
                  We unite accounting and business <br /> for optimized
                  financial management <br /> and sustainable growth.
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
              <div className="about__left-7">
                <Image
                  priority
                  style={{ width: "auto", height: "auto" }}
                  src={A1}
                  alt="Image"
                  data-speed="auto"
                />
              </div>
            </div>
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
              <div className="about__mid-7 text-anim">
                <p>
                  Our success is intertwined with yours, and we prioritize our
                  clients prosperity. We collaborate closely, serving diverse
                  businesses and individuals.
                </p>
                <p>
                  Quick Accounting team have over 7 years of experience servicing clients at
                  various stages of their business all over the United Kingdom. Whether you
                  are self-employed, a new startup, a growing business, or an established
                  business, we know that every business is different; that&apos;s why we
                  offer a fully tailored service to meet you and your business&apos; needs.
                  </p>

                <p>
                  We believe in investing time to all new clients. In our
                  experience this initial time allows us to get a strong
                  understanding of your business or situation, which will help
                  us provide the best possible service to you.
                </p>
                <p>
                  In addition to comprehensive accounting services, we offer
                  support in business development and specialized tax matters.
                </p>
                {/* <Image
                  priority
                  width={155}
                  height={57}
                  src={Shape5}
                  alt="Shape"
                  className="signature"
                /> */}
                <Image
                  priority
                  width={140}
                  height={160}
                  src={A2}
                  alt="Image"
                  className="image-1"
                />
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3">
              <div className="about__right-7">
                <Image
                  priority
                  width={220}
                  style={{ height: "auto" }}
                  src={A3}
                  alt="Image"
                  data-speed="0.7"
                />
              </div>
            </div>
          </div>
        </div>

        <Image
          priority
          width={76}
          height={119}
          src={Shape4}
          alt="Shape"
          className="shape-1"
        />
      </section>
    </>
  );
};

export default CreativeAgencyAbout;
