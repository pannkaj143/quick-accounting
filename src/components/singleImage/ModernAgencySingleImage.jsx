import Link from "next/link";
import React, { useEffect } from "react";
import VideoFrame from "../../../public/assets/imgs/essential-img/video-frame.png";
import SvgStar from "../../../public/assets/imgs/essential-img/svgstar.png";
import Shape24 from "../../../public/assets/imgs/shape/24.png";
import Image from "next/image";

const ModernAgencySingleImage = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hover_8_wrap = document.querySelectorAll(".hover_8_wrap a");
      const h8_wrap_len = hover_8_wrap.length;

      if (h8_wrap_len == 1) {
        function showCase8Func(event, hover_8_wrap) {
          const contentBox = hover_8_wrap[0].getBoundingClientRect();
          const dx = event.pageX;
          const dy = event.clientY - contentBox.y;
          document.querySelector(
            ".hover_8_img"
          ).style.transform = `translate(${dx}px, ${dy}px)`;
        }
        hover_8_wrap[0].addEventListener("mousemove", (event) => {
          setInterval(showCase8Func(event, hover_8_wrap), 1000);
          document.querySelector(".hover_8_img").classList.add("active");
        });
        hover_8_wrap[0].addEventListener("mouseout", (event) => {
          document.querySelector(".hover_8_img").classList.remove("active");
        });
      }

      if (h8_wrap_len == 2) {
        function showCase8Func(event, hover_8_wrap) {
          const contentBox = hover_8_wrap[0].getBoundingClientRect();
          const dx = event.pageX;
          const dy = event.clientY - contentBox.y;
          document.querySelector(
            ".hover_8_img"
          ).style.transform = `translate(${dx}px, ${dy}px)`;

          console.log(event.pageX);
        }
        hover_8_wrap[0].addEventListener("mousemove", (event) => {
          setInterval(showCase8Func(event, hover_8_wrap), 1000);
          document.querySelector(".hover_8_img").classList.add("active");
        });
        hover_8_wrap[0].addEventListener("mouseout", (event) => {
          document.querySelector(".hover_8_img").classList.remove("active");
        });

        function showCase8Func2(event, hover_8_wrap) {
          const contentBox = hover_8_wrap[1].getBoundingClientRect();
          const dx = event.pageX;
          const dy = event.clientY - contentBox.y;
          document.querySelector(
            ".hover_8_img_2"
          ).style.transform = `translate(${dx}px, ${dy}px)`;
        }
        hover_8_wrap[1].addEventListener("mousemove", (event) => {
          setInterval(showCase8Func2(event, hover_8_wrap), 1000);
          document.querySelector(".hover_8_img_2").classList.add("active");
        });
        hover_8_wrap[1].addEventListener("mouseout", (event) => {
          document.querySelector(".hover_8_img_2").classList.remove("active");
        });
      }
    }
  }, []);
  return (
    <>
      <div className="single__image-8 pt-130 pb-200 text-center sp-x">
        <div className="col-lg-10 text-center m-auto">
          <div className="singlecontent">
            <div className="hover_8_wrap">
              <h2 className="tech_title fade_bottom_4">
                DESIGN AND <Link href="/portfolio">Technology</Link> STUDIO
                TRANSFORMING YOUR <a href="#">IDEAS</a>
                INTO REALITY
              </h2>
              <div
                className="hover_8_img"
                style={{
                  backgroundImage: "url(assets/imgs/portfolio/detail/7.jpg)",
                }}
              ></div>
              <div
                className="hover_8_img_2"
                style={{
                  backgroundImage: "url(assets/imgs/portfolio/detail/6.jpg)",
                }}
              ></div>
            </div>
            <p className="single_dis pb-110 fade_bottom_4">
              Creating a successful digital services for innovative start-up and{" "}
              <br />
              established businesses with trendy design front and back-end{" "}
              <br /> development.
            </p>
            <div className="single__thumb">
              <video loop muted autoPlay playsInline>
                <source src="assets/video/video.mp4" type="video/mp4" />
              </video>
              <Image
                priority
                style={{ width: "auto", height: "auto" }}
                src={VideoFrame}
                alt="image"
                className="video-frame"
              />
              <Image
                priority
                width={113}
                style={{height: "auto"}}
                className="svgstar"
                src={SvgStar}
                alt="shape"
              />
              <Image
                priority
                width={77}
                style={{ height: "auto" }}
                src={Shape24}
                alt="shape"
                className="shape-2"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModernAgencySingleImage;
