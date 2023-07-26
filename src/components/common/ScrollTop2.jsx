import Image from "next/image";
import React, { useEffect } from "react";
import ArrowUp from "../../../public/assets/imgs/portfolio/11/arrow-up.png";

const ScrollTop2 = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let scroll_top = document.getElementById("scroll_top");
      if (scroll_top) {
        window.onscroll = function () {
          if (
            document.body.scrollTop > 50 ||
            document.documentElement.scrollTop > 50
          ) {
            scroll_top.style.display = "block";
          } else {
            scroll_top.style.display = "none";
          }
        };

        scroll_top.addEventListener("click", function () {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        });
      }
    }
  }, []);
  return (
    <>
      <div id="scroll_top" className="scroll-top-2">
        <div className="scroll-inner">
          <p>
            Go back <br /> to top
          </p>
          <Image
            priority
            width={20}
            style={{ height: "auto" }}
            src={ArrowUp}
            alt="Arrow Icon"
          />
        </div>
      </div>
    </>
  );
};

export default ScrollTop2;
