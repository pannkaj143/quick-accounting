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
  ModernAgencyFooter,
  VerticalGridWork,
} from "@/components";

const VerticalGrid = () => {
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
        <title>Vertical Grid</title>
        <meta name="description" content="Vertical Grid Description" />
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
            <VerticalGridWork />
            <ModernAgencyFooter />
          </div>
        </div>
      </main>
    </>
  );
};

export default VerticalGrid;
