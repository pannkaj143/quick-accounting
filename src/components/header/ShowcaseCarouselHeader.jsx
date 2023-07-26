import React, { useEffect, useState } from "react";
import DigitalMarketingLogo from "../logo/DigitalMarketingLogo";
import Canvas from "../canvas/Canvas";
import MenuBlack from "../../../public/assets/imgs/icon/menu-black.png";
import Image from "next/image";
import ShowcaseCarouselNav from "../nav/ShowcaseCarouselNav";

const ShowcaseCarouselHeader = ({ navData }) => {
  const [topScroll, setTopScroll] = useState(0);
  const handleTopScroll = () => {
    const position = window.pageYOffset;
    setTopScroll(position);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleTopScroll, { passive: true });
    setTimeout(() => {
      document
        .querySelectorAll(".menu-anim > li > a")
        .forEach(
          (button) =>
            (button.innerHTML =
              '<div class="menu-text"><span>' +
              button.textContent.split("").join("</span><span>") +
              "</span></div>")
        );

      setTimeout(() => {
        var menu_text = document.querySelectorAll(".menu-text span");
        menu_text.forEach((item) => {
          var font_sizes = window.getComputedStyle(item, null);
          let font_size = font_sizes.getPropertyValue("font-size");
          let size_in_number = parseInt(font_size.replace("px", ""));
          let new_size = parseInt(size_in_number / 3);
          new_size = new_size + "px";
          if (item.innerHTML == " ") {
            item.style.width = new_size;
          }
        });
      }, 1000);
    }, 10);
    return () => {
      window.removeEventListener("scroll", handleTopScroll);
    };
  }, []);
  if (typeof window !== "undefined") {
    let header_bg_3 = document.querySelector(".header__area-3");
    if (header_bg_3) {
      if (topScroll > 20) {
        header_bg_3.classList.add("sticky-3");
      } else {
        header_bg_3.classList.remove("sticky-3");
      }
    }
  }

  const openCanvas = () => {
    document.querySelector(".offcanvas__area").style.opacity = "1";
    document.querySelector(".offcanvas__area").style.visibility = "visible";
  };
  return (
    <>
      {navData && Object.keys(navData).length && (
        <>
          <header className="header__area-3">
            <div className="header__inner-2">
              <DigitalMarketingLogo />
              {navData.nav && navData.nav.length && (
                <ShowcaseCarouselNav nav={navData.nav} />
              )}
              <div className="header__nav-icon-3">
                <button onClick={openCanvas}>
                  <Image
                    priority
                    width={21}
                    height={15}
                    src={MenuBlack}
                    alt="Menubar Icon"
                  />
                </button>
              </div>
            </div>
          </header>
        </>
      )}
      <Canvas />
    </>
  );
};

export default ShowcaseCarouselHeader;
