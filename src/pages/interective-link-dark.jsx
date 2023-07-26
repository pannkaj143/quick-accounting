import Head from "next/head";
import React, { useEffect, useState } from "react";
import allNavData from "../data/navData.json";
import { gsap } from "gsap";
import {
  ScrollTrigger,
  SplitText,
} from "@/plugins";
import {
  CursorAnimation,
  Switcher,
  ScrollTop2,
  Preloader,
  ScrollSmootherComponents,
  ShowcaseCarouselHeader,
  InterectiveLinkService,
  ModernAgencyFooter,
} from "@/components";

gsap.registerPlugin(ScrollTrigger);


const InterectiveLinkDark = () => {
  const [mode, setMode] = useState("dark");
  const [navData, setNavData] = useState({});
  useEffect(() => {
    setNavData(allNavData);
    if (typeof window !== "undefined") {
      if (mode == "dark") {
        document.querySelector("body").classList.add("dark");
      } else {
        document.querySelector("body").classList.remove("dark");
      }
      let tHero = gsap.context(() => {
        let splitTextLines = gsap.utils.toArray(".text-anim p");

        splitTextLines.forEach((splitTextLine) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: splitTextLine,
              start: "top 90%",
              duration: 2,
              end: "bottom 60%",
              scrub: false,
              markers: false,
              toggleActions: "play none none none",
            },
          });

          const itemSplitted = new SplitText(splitTextLine, { type: "lines" });
          gsap.set(splitTextLine, { perspective: 400 });
          itemSplitted.split({ type: "lines" });
          tl.from(itemSplitted.lines, {
            duration: 1,
            delay: 0.5,
            opacity: 0,
            rotationX: -80,
            force3D: true,
            transformOrigin: "top center -50",
            stagger: 0.1,
          });
        });
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
  }, [mode]);
  return (
    <>
      <Head>
        <title>Interective Link Dark</title>
        <meta name="description" content="Interective Link Dark Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/x-icon"
          href="assets/imgs/logo/favicon.png"
        />
      </Head>
      <main>
        <div className="has-smooth" id="has_smooth"></div>
        <ScrollSmootherComponents />
        <Preloader />
        <CursorAnimation />
        <Switcher setMode={setMode} />
        <ScrollTop2 />
        <ShowcaseCarouselHeader navData={navData} />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <InterectiveLinkService />
            <ModernAgencyFooter />
          </div>
        </div>
      </main>
    </>
  );
};

export default InterectiveLinkDark;
