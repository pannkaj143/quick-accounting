import React from "react";
import { Mousewheel, Navigation, Pagination, Keyboard } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Portfolio26 from "../../../public/assets/imgs/hero/portfolio-2/6.jpg";
import Portfolio27 from "../../../public/assets/imgs/hero/portfolio-2/7.jpg";
import Portfolio21 from "../../../public/assets/imgs/hero/portfolio-2/portfolio-01.jpg";
import Portfolio22 from "../../../public/assets/imgs/hero/portfolio-2/portfolio-02.jpg";
import Portfolio23 from "../../../public/assets/imgs/hero/portfolio-2/portfolio-03.jpg";
import Portfolio24 from "../../../public/assets/imgs/hero/portfolio-2/portfolio-04.jpg";
import Portfolio25 from "../../../public/assets/imgs/hero/portfolio-2/5.jpg";
import NextPortfolioRight from "../../../public/assets/imgs/hero/portfolio-2/slider-arrow-right.svg";
import PrevPortfolioLeft from "../../../public/assets/imgs/hero/portfolio-2/slider-arrow-left.svg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/mousewheel";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/keyboard";
import Link from "next/link";
import Image from "next/image";

const ShowcaseCarouselHero = () => {
  return (
    <>
      <div className="hero__area-10">
        <div className="swiper hero10_activition">
          <Swiper
            modules={[Mousewheel, Navigation, Pagination, Keyboard]}
            direction="horizontal"
            loop={true}
            speed={1500}
            spaceBetween={30}
            slidesPerView={4}
            mousewheel={true}
            mouseWheelControl={true}
            keyboard={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              el: ".swiper-pagination",
              type: "fraction",
              clickable: true,

              renderFraction: function (currentClass, totalClass) {
                return (
                  '<span class="' +
                  currentClass +
                  '"></span>' +
                  ' <span><i class="fa-solid fa-minus increase-dash"></i></span> ' +
                  '<span class="' +
                  totalClass +
                  '"></span>'
                );
              },
            }}
            breakpoints={{
              1400: {
                slidesPerView: 4,
              },
              1000: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 2,
              },
              320: {
                slidesPerView: 1,
              },
            }}
          >
            <SwiperSlide>
              <Link href="/portfolio-details">
                <div className="hero10">
                  <div className="hero10__thumb">
                    <Image
                      priority
                      width={419}
                      style={{ height: "auto" }}
                      src={Portfolio26}
                      alt="Image"
                    />
                  </div>
                  <div className="hero10__content">
                    <p>
                      <i className="fa-solid fa-arrow-right"></i>
                    </p>
                    <h3 className="hero10__content__name">Modelling - 2012</h3>
                    <h4 className="hero10__content__title">
                      Siyantika <span>Glory</span>
                    </h4>
                  </div>
                </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link href="/portfolio-details">
                <div className="hero10">
                  <div className="hero10__thumb">
                    <Image
                      priority
                      width={419}
                      style={{ height: "auto" }}
                      src={Portfolio27}
                      alt="Image"
                    />
                  </div>
                  <div className="hero10__content">
                    <p>
                      <i className="fa-solid fa-arrow-right"></i>
                    </p>
                    <h3 className="hero10__content__name">Interaction - 2022</h3>
                    <h4 className="hero10__content__title">
                      Fresh <span>Edge</span>
                    </h4>
                  </div>
                </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link href="/portfolio-details">
                <div className="hero10">
                  <div className="hero10__thumb">
                    <Image
                      priority
                      width={419}
                      style={{ height: "auto" }}
                      src={Portfolio21}
                      alt="Image"
                    />
                  </div>
                  <div className="hero10__content">
                    <p>
                      <i className="fa-solid fa-arrow-right"></i>
                    </p>
                    <h3 className="hero10__content__name">Artwork - 2020</h3>
                    <h4 className="hero10__content__title">
                      blue <span>Shadow</span>
                    </h4>
                  </div>
                </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link href="/portfolio-details">
                <div className="hero10">
                  <div className="hero10__thumb">
                    <Image
                      priority
                      width={419}
                      style={{ height: "auto" }}
                      src={Portfolio22}
                      alt="Image"
                    />
                  </div>
                  <div className="hero10__content">
                    <p>
                      <i className="fa-solid fa-arrow-right"></i>
                    </p>
                    <h3 className="hero10__content__name">Modelling - 2012</h3>
                    <h4 className="hero10__content__title">
                      Vector <span>Art</span>
                    </h4>
                  </div>
                </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link href="/portfolio-details">
                <div className="hero10">
                  <div className="hero10__thumb">
                    <Image
                      priority
                      width={419}
                      style={{ height: "auto" }}
                      src={Portfolio23}
                      alt="Image"
                    />
                  </div>
                  <div className="hero10__content">
                    <p>
                      <i className="fa-solid fa-arrow-right"></i>
                    </p>
                    <h3 className="hero10__content__name">Branding - 2012</h3>
                    <h4 className="hero10__content__title">
                      Visual <span>Pastom</span>
                    </h4>
                  </div>
                </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link href="/portfolio-details">
                <div className="hero10">
                  <div className="hero10__thumb">
                    <Image
                      priority
                      width={419}
                      style={{ height: "auto" }}
                      src={Portfolio24}
                      alt="Image"
                    />
                  </div>
                  <div className="hero10__content">
                    <p>
                      <i className="fa-solid fa-arrow-right"></i>
                    </p>
                    <h3 className="hero10__content__name">Design - 2017</h3>
                    <h4 className="hero10__content__title">
                      Oliverr <span>Luxe</span>
                    </h4>
                  </div>
                </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link href="/portfolio-details">
                <div className="hero10">
                  <div className="hero10__thumb">
                    <Image
                      priority
                      width={419}
                      style={{ height: "auto" }}
                      src={Portfolio25}
                      alt="Image"
                    />
                  </div>
                  <div className="hero10__content">
                    <p>
                      <i className="fa-solid fa-arrow-right"></i>
                    </p>
                    <h3 className="hero10__content__name">Modelling - 2015</h3>
                    <h4 className="hero10__content__title">
                      Fresh <span>Edge</span>
                    </h4>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href="/portfolio-details">
                <div className="hero10">
                  <div className="hero10__thumb">
                    <Image
                      priority
                      width={419}
                      style={{ height: "auto" }}
                      src={Portfolio27}
                      alt="Image"
                    />
                  </div>
                  <div className="hero10__content">
                    <p>
                      <i className="fa-solid fa-arrow-right"></i>
                    </p>
                    <h3 className="hero10__content__name">Interaction - 2022</h3>
                    <h4 className="hero10__content__title">
                      Fresh <span>Edge</span>
                    </h4>
                  </div>
                </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link href="/portfolio-details">
                <div className="hero10">
                  <div className="hero10__thumb">
                    <Image
                      priority
                      width={419}
                      style={{ height: "auto" }}
                      src={Portfolio21}
                      alt="Image"
                    />
                  </div>
                  <div className="hero10__content">
                    <p>
                      <i className="fa-solid fa-arrow-right"></i>
                    </p>
                    <h3 className="hero10__content__name">Artwork - 2020</h3>
                    <h4 className="hero10__content__title">
                      blue <span>Shadow</span>
                    </h4>
                  </div>
                </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link href="/portfolio-details">
                <div className="hero10">
                  <div className="hero10__thumb">
                    <Image
                      priority
                      width={419}
                      style={{ height: "auto" }}
                      src={Portfolio22}
                      alt="Image"
                    />
                  </div>
                  <div className="hero10__content">
                    <p>
                      <i className="fa-solid fa-arrow-right"></i>
                    </p>
                    <h3 className="hero10__content__name">Modelling - 2012</h3>
                    <h4 className="hero10__content__title">
                      Vector <span>Art</span>
                    </h4>
                  </div>
                </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link href="/portfolio-details">
                <div className="hero10">
                  <div className="hero10__thumb">
                    <Image
                      priority
                      width={419}
                      style={{ height: "auto" }}
                      src={Portfolio23}
                      alt="Image"
                    />
                  </div>
                  <div className="hero10__content">
                    <p>
                      <i className="fa-solid fa-arrow-right"></i>
                    </p>
                    <h3 className="hero10__content__name">Branding - 2012</h3>
                    <h4 className="hero10__content__title">
                      Visual <span>Pastom</span>
                    </h4>
                  </div>
                </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link href="/portfolio-details">
                <div className="hero10">
                  <div className="hero10__thumb">
                    <Image
                      priority
                      width={419}
                      style={{ height: "auto" }}
                      src={Portfolio24}
                      alt="Image"
                    />
                  </div>
                  <div className="hero10__content">
                    <p>
                      <i className="fa-solid fa-arrow-right"></i>
                    </p>
                    <h3 className="hero10__content__name">Design - 2017</h3>
                    <h4 className="hero10__content__title">
                      Oliverr <span>Luxe</span>
                    </h4>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          </Swiper>

          <div className="swiper-button-next hero_next ">
            Next{" "}
            <Image
              priority
              width={30}
              height={11}
              src={NextPortfolioRight}
              alt="Next"
            />
          </div>
          <div className="swiper-button-prev hero_prev ">
            <Image
              priority
              width={30}
              height={11}
              src={PrevPortfolioLeft}
              alt="Next"
            />{" "}
            Prev
          </div>
          <div className="swiper-pagination "></div>
        </div>
      </div>
    </>
  );
};

export default ShowcaseCarouselHero;
