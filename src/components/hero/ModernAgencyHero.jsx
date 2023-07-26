import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "@/plugins";
import Shape23 from "../../../public/assets/imgs/shape/23.png";
import ScrollDown from "../../../public/assets/imgs/essential-img/scrolldown.svg";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ModernAgencyHero = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let hero__text_animation = document.querySelector(
        ".hero__text-animation"
      );
      let char_come = document.querySelectorAll(".animation__char_come");
      let tHero = gsap.context(() => {
        char_come.forEach((char_come) => {
          let split_char = new SplitText(char_come, { type: "chars, words" });
          gsap.from(split_char.chars, {
            duration: 1,
            x: 70,
            autoAlpha: 0,
            stagger: 0.05,
          });
        });
        let split_text_animation = new SplitText(hero__text_animation, {
          type: "chars words",
        });
        gsap.from(
          split_text_animation.words,
          { duration: 1, x: 50, autoAlpha: 0, stagger: 0.05 },
          "-=1"
        );
        let imageTl_8 = gsap.timeline({
          scrollTrigger: {
            trigger: ".portfolio__big",
            start: "top top+=90",
            pin: true,
            markers: false,
            scrub: 1,
            pinSpacing: false,
            end: "bottom bottom+=150",
          },
        });
        imageTl_8.to(".portfolio__big-inner", {
          width: "100%",
        });
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <section className="hero__area-4 sp-x">
        <div className="hero__content-8">
          <h2 className="sec-title-4 sec-title-5 animation__char_come">
            Design{" "}
            <Image
              priority
              width={108}
              height={108}
              src={Shape23}
              alt="shape"
            />
          </h2>
          <h2 className="sec-title-4 animation__char_come">
            Development <span>Craft</span>
          </h2>
          <div className="scroll-wrapper">
            <div className="scroll-down">
              <span>scroll</span>
              <Image
                priority
                style={{ width: "auto", height: "auto" }}
                src={ScrollDown}
                alt="Scroll Down"
              />
            </div>
            <p className="discription hero__text-animation">
              Static and dynamic secure code review can prevent a 0day before
              your product is even released. We can integrate with your dev
              environment
            </p>
          </div>
        </div>
      </section>
      <div className="portfolio__big">
        <div
          className="portfolio__big-inner"
          style={{ backgroundImage: "url(assets/imgs/portfolio/detail/1.jpg)" }}
        >
          {" "}
        </div>
      </div>
    </>
  );
};

export default ModernAgencyHero;
