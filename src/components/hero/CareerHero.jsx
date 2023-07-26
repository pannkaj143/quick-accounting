import React, { useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "@/plugins";

const CareerHero = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let tHero = gsap.context(() => {
        let char_come = document.querySelectorAll(".animation__char_come");

        char_come.forEach((char_come) => {
          let split_char = new SplitText(char_come, { type: "chars, words" });
          gsap.from(split_char.chars, {
            duration: 1,
            x: 70,
            autoAlpha: 0,
            stagger: 0.05,
          });
        });
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <section className="career__top">
        <div className="career__top-title">
          <div className="container pt-120">
            <div className="row pb-120">
              <div className="col-xxl-10 col-xl-9 col-lg-9 col-md-9">
                <div className="sec-title-wrapper">
                  <h2 className="sec-title-2 animation__char_come">
                    Join our team & let’s work together
                  </h2>
                </div>
              </div>
              <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-3">
                <div className="btn_wrapper">
                  <a
                    href="#job_list"
                    className="wc-btn-secondary btn-hover btn-item"
                  >
                    <span></span> Explore job
                    <br />
                    vacancies <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="career__thumb">
          <div className="container g-0">
            <div className="row inherit">
              <div className="col-xxl-12">
                <div className="career__top-img">
                  <video autoPlay muted loop>
                    <source src="assets/video/video.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerHero;
