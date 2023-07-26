import React, { useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "@/plugins";
import ArrowDownSm from "../../../public/assets/imgs/icon/arrow-down-sm.png";
import Hero31 from "../../../public/assets/imgs/hero/3/1.jpg";
import Image from "next/image.js";

const DigitalMarketingHero = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let mark = document.querySelector(".hero__area-3 .title-left");
      let eting = document.querySelector(".hero__area-3 .title-right");
      let hero__text_animation = document.querySelector(
        ".hero__text-animation"
      );

      const radio_buttons = document.querySelector("#video_check");
      const video_start = document.querySelector(".hero__area-3");

      if (radio_buttons) {
        radio_buttons.addEventListener("click", function () {
          let video = document.querySelector(".video-title");
          let videoClose = document.querySelector(
            ".video-title.close-video-title"
          );
          if (radio_buttons.checked) {
            document.querySelector(".wrapper").style.zIndex = "1";
            video.style.display = "none";
            videoClose.style.display = "block";
            video_start.classList.add("start-video");
            document.querySelector(".header__area-3").classList.add("bg-white");
          } else {
            document.querySelector(".wrapper").style.zIndex = "999";
            video.style.display = "block";
            videoClose.style.display = "none";
            video_start.classList.remove("start-video");
            document
              .querySelector(".header__area-3")
              .classList.remove("bg-white");
          }
        });
      }

      let split_creatives = new SplitText(mark, { type: "chars" });
      let split_solutions = new SplitText(eting, { type: "chars" });
      let split_text_animation = new SplitText(hero__text_animation, {
        type: "chars words",
      });
      let tHero = gsap.context(() => {
        let HomeDigital = gsap.timeline();

        HomeDigital.from(split_creatives.chars, {
          duration: 2,
          x: 100,
          autoAlpha: 0,
          stagger: 0.2,
        });
        HomeDigital.from(
          split_solutions.chars,
          { duration: 1, x: 100, autoAlpha: 0, stagger: 0.1 },
          "-=1"
        );
        HomeDigital.from(
          split_text_animation.words,
          { duration: 1, x: 50, autoAlpha: 0, stagger: 0.05 },
          "-=1"
        );
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <section className="hero__area-3">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="hero__inner-3">
                <div className="sec-title-wrapper">
                  <h2 className="sec-sub-title">Digital</h2>
                  <h3 className="sec-title title-left">Mark</h3>
                  <h3 className="sec-title title-right">eting</h3>
                </div>
                <div className="hero__text-3">
                  <p className="hero__text-animation">
                    Static and dynamic secure code review can prevent a day
                    before your product is even released. We can integrate with
                    your dev environment
                  </p>
                </div>
                <div className="scroll-down">
                  <button>
                    <Image
                      priority
                      style={{ width: "auto", height: "auto" }}
                      src={ArrowDownSm}
                      alt="arrow icon"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="video-info">
            <div className="video-intro">
              <input id="video_check" type="checkbox" />
              <div className="intro-title">
                <h4 className="video-title">
                  Watch <span>video intro</span>
                </h4>
                <h4 className="video-title close-video-title">
                  Close <span>video intro</span>
                </h4>
              </div>
              <div className="video">
                <video
                  src="assets/video/hero-3.mp4"
                  loop
                  muted
                  autoPlay
                  playsInline
                ></video>
              </div>
            </div>
          </div>
        </div>

        <div className="hero3-img-ani">
          <Image
            priority
            width={1195}
            style={{ height: "auto" }}
            src={Hero31}
            alt="Hero Image"
            className="hero3-img"
          />
        </div>
      </section>
    </>
  );
};

export default DigitalMarketingHero;
