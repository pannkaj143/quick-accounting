import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import PortfolioSwiperMobile from "../common/PortfolioSwiperMobile";
import PortfolioSwiperDestop from "../common/PortfolioSwiperDestop";

const PortfolioPage = () => {
  const [desktop, setDesktop] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      imageMovingPortfolio(".portfolio-section", ".portfolio__hero img");
      let breakpoint = window.matchMedia("( max-width: 1300px )");
      if (breakpoint.matches === true) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    }
  }, []);
  function imageMovingPortfolio(wrapper, image_list) {
    let container = document.querySelector(wrapper);
    let tHero = gsap.context(() => {
      if (container) {
        container.addEventListener("mousemove", (e) => {
          var x = e.clientX;
          var y = e.clientY;
          let viewportWidth = window.innerWidth;
          let center = viewportWidth / 2;
          let centerHeight = innerHeight / 2;

          if (x > center) {
            gsap.to(image_list, {
              x: 60,
              duration: 5,
              ease: "power4.out",
            });
          } else {
            gsap.to(image_list, {
              x: -60,
              duration: 5,
              ease: "power4.out",
            });
          }
          if (y > centerHeight) {
            gsap.to(image_list, {
              scale: 1.15,
              duration: 5,
              ease: "power4.out",
            });
          } else {
            gsap.to(image_list, {
              scale: 1,
              duration: 5,
              ease: "power4.out",
            });
          }
        });
      }
    });
    return () => tHero.revert();
  }
  return (
    <>
      <div className="portfolio__page">
        {desktop ? <PortfolioSwiperMobile /> : <PortfolioSwiperDestop />}
      </div>
    </>
  );
};

export default PortfolioPage;
