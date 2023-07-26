import Head from "next/head";
import React, { useEffect, useState } from "react";
import allNavData from "../data/navData.json";
import {
  CursorAnimation,
  Switcher,
  ScrollTop,
  Preloader,
  ScrollSmootherComponents,
  ShowcaseCarouselHeader,
  ShowcaseParallaxHero,
  ShowcaseParallaxGallery,
  ModernAgencyFooter
} from "@/components";

const ShowcaseParallaxDark = () => {
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
    }
  }, [mode]);
  return (
    <>
      <Head>
        <title>Showcase Parallax Dark</title>
        <meta name="description" content="Showcase Parallax Dark Description" />
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
        <ScrollTop />
        <ShowcaseCarouselHeader navData={navData} />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <ShowcaseParallaxHero />
            <ShowcaseParallaxGallery />
            <ModernAgencyFooter />
          </div>
        </div>
      </main>
    </>
  );
};

export default ShowcaseParallaxDark;
