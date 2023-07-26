import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";

gsap.registerPlugin(ScrollTrigger);

const PortfolioMasonryHero = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        gsap.set(".fade_left", { x: -20, opacity: 0 });
        gsap.to(".fade_left", {
          scrollTrigger: {
            trigger: ".fade_left",
            start: "top center+=300",
          },
          x: 0,
          opacity: 1,
          ease: "power2.out",
          delay: 0.5,
          duration: 1,
          stagger: {
            each: 0.2,
          },
        });

        // Fade Bottom
        gsap.set(".fade_bottom", { y: 30, opacity: 0 });

        if (device_width < 1023) {
          const fadeArray = gsap.utils.toArray(".fade_bottom");
          fadeArray.forEach((item, i) => {
            let fadeTl = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: "top center+=200",
              },
            });
            fadeTl.to(item, {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              delay: 0.5,
              duration: 1.5,
            });
          });
        } else {
          gsap.to(".fade_bottom", {
            scrollTrigger: {
              trigger: ".fade_bottom",
              start: "top center+=300",
              markers: false,
            },
            y: 0,
            opacity: 1,
            ease: "power2.out",
            delay: 0.5,
            duration: 1,
            stagger: {
              each: 0.2,
            },
          });
        }

        // Fade Bottom 2
        gsap.set(".fade_bottom_2", { y: 30, opacity: 0 });

        if (device_width < 1023) {
          const fadeArray = gsap.utils.toArray(".fade_bottom_2");
          fadeArray.forEach((item, i) => {
            let fadeTl = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: "top center+=200",
              },
            });
            fadeTl.to(item, {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              delay: 0.5,
              duration: 1.5,
            });
          });
        } else {
          gsap.to(".fade_bottom_2", {
            scrollTrigger: {
              trigger: ".fade_bottom_2",
              start: "top center+=300",
              markers: false,
            },
            y: 0,
            opacity: 1,
            ease: "power2.out",
            delay: 0.5,
            duration: 1,
            stagger: {
              each: 0.2,
            },
          });
        }
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <div class="section_title_wrapper">
        <div class="title_left">
          <h2 class="sec-title-8 animation__char_come">work</h2>
          <p class="dis_port_4 fade_bottom">
            The projects we do are for startups who make bureaucracy easier,
            teach tech for in-demand and many more.
          </p>
        </div>
        <div class="title_right">
          <div class="title_right__inner">
            <div class="title_right__inner__left fade_left">
              <span>Know more</span>
            </div>
            <div class="title_right__inner__right">
              <ul>
                <li class="fade_bottom_2">
                  <a href="#">behance</a>
                </li>
                <li class="fade_bottom_2">
                  <a href="#">Dribbble</a>
                </li>
                <li class="fade_bottom_2">
                  <a href="#">Instagram</a>
                </li>
                <li class="fade_bottom_2">
                  <a href="#">awwward</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioMasonryHero;
