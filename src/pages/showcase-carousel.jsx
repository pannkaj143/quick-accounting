import Head from "next/head";
import React, { useEffect, useState } from "react";
import allNavData from "../data/navData.json";
import {
  CursorAnimation,
  Switcher,
  Preloader,
  ShowcaseCarouselHeader,
  ShowcaseCarouselHero
} from "@/components";


const ShowcaseCarousel = () => {
  const [mode, setMode] = useState("");
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
        <title>Showcase Carousel</title>
        <meta name="description" content="Showcase Carousel Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/x-icon"
          href="assets/imgs/logo/favicon.png"
        />
      </Head>
      <main>
        <div className="has-smooth" id="has_smooth"></div>
        <Preloader />
        <CursorAnimation />
        <Switcher setMode={setMode} />
        <ShowcaseCarouselHeader navData={navData} />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <ShowcaseCarouselHero />
          </div>
        </div>
      </main>
    </>
  );
};

export default ShowcaseCarousel;