import React, { useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "@/plugins";
import Link from "next/link.js";
import ArrowIcon from "../../../public/assets/imgs/hero/4/arrow-icon.png";
import Hero4 from "../../../public/assets/imgs/hero/4/hero-4.png";
import HeroShape from "../../../public/assets/imgs/hero/4/hero-shape.png";
import HeroShape2 from "../../../public/assets/imgs/hero/4/hero-shape-2.png";
import HeroShape3 from "../../../public/assets/imgs/hero/4/hero-shape-3.png";
import Shape20 from "../../../public/assets/imgs/shape/20.png";
import Image from "next/image.js";

const StartupAgencyHero = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let tHero = gsap.context(() => {
        let hero6_title = document.querySelector(
          ".hero__six_anim .hero__title-6"
        );
        let hero6_desc = document.querySelector(".hero__six_anim p");

        let hero6_button = document.querySelector(".hero__six_anim a");
        let hero6_image = document.querySelector(".hero__right-6 img");

        gsap.set(hero6_image, {
          opacity: 0,
          y: 50,
        });
        gsap.set(hero6_button, {
          opacity: 0,
          y: 50,
        });

        let split_hero6_title = new SplitText(hero6_title, { type: "chars" });
        let split_hero6_desc = new SplitText(hero6_desc, {
          type: "chars words",
        });

        gsap.from(split_hero6_title.chars, {
          duration: 1,
          x: 70,
          autoAlpha: 0,
          stagger: 0.1,
        });
        gsap.from(
          split_hero6_desc.words,
          { duration: 1, x: 50, autoAlpha: 0, stagger: 0.05 },
          "-=1"
        );
        gsap.to(
          hero6_button,
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=1.5"
        );
        gsap.to(
          hero6_image,
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=1"
        );
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <section className="hero__area-6">
        <div className="container g-0 line_4">
          <div className="line-col-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
              <div className="hero__content-6 hero__six_anim">
                <Image
                  priority
                  style={{ width: "auto", height: "auto" }}
                  className="hero__arrow-icon"
                  src={ArrowIcon}
                  alt="Arrow Icon"
                />
                <h1 className="hero__title-6 ">
                  Magical <br /> Axtra Startup Solution{" "}
                </h1>
                <p>
                  Our team always reviews all previous methods with <br />{" "}
                  models, and processes to determined
                </p>
                <Link className="btn-started btn-hover" href="/contact">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
              <div className="hero__right-6">
                <Image
                  priority
                  style={{ width: "auto", height: "auto" }}
                  src={Hero4}
                  alt="Hero Image"
                />
              </div>
            </div>
          </div>
        </div>
        <Image
          priority
          width={80}
          height={158}
          className="hero__shape"
          src={HeroShape}
          alt="Shape Image"
        />
        <Image
          priority
          width={48}
          height={48}
          className="hero__shape-2"
          src={HeroShape2}
          alt="Layout"
        />
        <Image
          priority
          width={38}
          height={49}
          className="hero__shape-3"
          src={HeroShape3}
          alt="Star Icon"
        />
        <Image
          priority
          width={489}
          height={382}
          className="shape-4"
          src={Shape20}
          alt="Star Icon"
        />
      </section>
    </>
  );
};

export default StartupAgencyHero;
