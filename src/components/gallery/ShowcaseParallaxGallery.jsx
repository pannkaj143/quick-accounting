import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Image from "next/image";
import PortfolioHome601 from "../../../public/assets/imgs/portfolio/portfolio-home-6/portfolio-01.jpg";
import PortfolioHome605 from "../../../public/assets/imgs/portfolio/portfolio-home-6/portfolio-05.jpg";
import PortfolioHome114 from "../../../public/assets/imgs/portfolio/11/4.jpg";
import PortfolioHome604 from "../../../public/assets/imgs/portfolio/portfolio-home-6/portfolio-04.jpg";
import PortfolioHome602 from "../../../public/assets/imgs/portfolio/portfolio-home-6/portfolio-02.jpg";
import PortfolioHome6Star from "../../../public/assets/imgs/portfolio/portfolio-home-6/star.png";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseParallaxGallery = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        var shocase_list_16 = document.querySelectorAll(
          ".showcase__content-16"
        );

        shocase_list_16.forEach((shocase16) => {
          gsap.to(shocase16, {
            scrollTrigger: {
              trigger: shocase16,
              pin: shocase16,
              pinSpacing: false,
              start: "top top",
              delay: 1,
            },
          });
        });
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
      <div class="showcase__area-16" style={{ overflow: "hidden" }}>
        <div class="showcase__content-16">
          <Link href="/portfolio-details">
            <div class="showcase__image-16">
              <Image
                priority
                width={1920}
                style={{ height: "auto" }}
                src={PortfolioHome601}
                alt="Image"
                data-speed="1.2"
              />
            </div>
            <div class="showcase__info-16">
              <h2 class="showcase__title-16">
                Design <br /> <span>CONCEPT</span>
              </h2>
              <h3 class="showcase__sub-title-16">
                Interaction <br /> - 2019
              </h3>
            </div>
          </Link>
        </div>

        <div class="showcase__content-16">
          <Link href="/portfolio-details">
            <div class="showcase__image-16">
              <Image
                priority
                width={1920}
                style={{ height: "auto" }}
                src={PortfolioHome605}
                alt="Image"
                data-speed="1.2"
              />
            </div>
            <div class="showcase__info-16">
              <h2 class="showcase__title-16">
                Vector <br /> <span>Art</span>
              </h2>
              <h3 class="showcase__sub-title-16">
                Interaction <br /> - 2019
              </h3>
            </div>
          </Link>
        </div>

        <div class="showcase__content-16">
          <Link href="/portfolio-details">
            <div class="showcase__image-16">
              <Image
                priority
                width={1920}
                style={{ height: "auto" }}
                src={PortfolioHome114}
                alt="Image"
                data-speed="1.3"
              />
            </div>
            <div class="showcase__info-16">
              <h2 class="showcase__title-16">
                Visual
                <br /> <span>Pastom</span>{" "}
              </h2>
              <h3 class="showcase__sub-title-16">
                Interaction <br /> - 2019
              </h3>
            </div>
          </Link>
        </div>

        <div class="showcase__content-16">
          <Link href="/portfolio-details">
            <div class="showcase__image-16">
              <Image
                priority
                width={1920}
                style={{ height: "auto" }}
                src={PortfolioHome604}
                alt="Image"
                data-speed="1.3"
              />
            </div>
            <div class="showcase__info-16">
              <h2 class="showcase__title-16">
                Blue <br /> <span>Shadow</span>
              </h2>
              <h3 class="showcase__sub-title-16">
                Interaction <br /> - 2019
              </h3>
            </div>
          </Link>
        </div>

        <div class="showcase__content-16">
          <Link href="/portfolio-details">
            <div class="showcase__image-16">
              <Image
                priority
                width={1920}
                style={{ height: "auto" }}
                src={PortfolioHome602}
                alt="Image"
                data-speed="1.3"
              />
            </div>
            <div class="showcase__info-16">
              <h2 class="showcase__title-16">
                Fresh <br /> <span>Edge</span>
              </h2>
              <h3 class="showcase__sub-title-16">
                Interaction <br /> - 2019
              </h3>
            </div>
          </Link>
        </div>

        <div class="showcase_info">
          <div class="col-lg-12 text-center pt-150 pb-0">
            <div class="showcase5__content">
              <Image
                priority
                width={85}
                height={94}
                src={PortfolioHome6Star}
                alt="Image"
                class="fade_bottom_2"
              />
              <p class="fade_bottom_2">
                Amazed by the Axtra I went in to create a concept presentation{" "}
                <br /> for this popular brand by redesigning the website and
                breathed <br /> some branding approaches along the way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowcaseParallaxGallery;
