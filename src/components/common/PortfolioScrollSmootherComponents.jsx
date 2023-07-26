import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "@/plugins";

gsap.registerPlugin(ScrollSmoother);

const PortfolioScrollSmootherComponents = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        let skewSetter = gsap.quickTo(".portfolio__item-5 img", "skewY"),
          clamp = gsap.utils.clamp(-15, 15);
        ScrollSmoother.create({
          smooth: 1.35,
          effects: device_width < 1025 ? false : true,
          smoothTouch: false,
          normalizeScroll: false,
          ignoreMobileResize: true,
          onUpdate: (self) => skewSetter(clamp(self.getVelocity() / -80)),
          onStop: () => skewSetter(0),
        });
      });
      return () => tHero.revert();
    }
  }, []);
  return <div></div>;
};

export default PortfolioScrollSmootherComponents;
