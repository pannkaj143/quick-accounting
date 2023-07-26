import React, { useEffect, useState } from "react";
import Canvas from "../canvas/Canvas";
import CreativeAgencyLogo from "../logo/CreativeAgencyLogo";
import CreativeAgencyNav from "../nav/CreativeAgencyNav";
import MenuDark from "../../../public/assets/imgs/icon/menu-dark.png";
import Image from "next/image";

const CreativeAgencyHeader = ({ navData }) => {
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
    let header_bg_7 = document.querySelector(".header__area-7");
    if (header_bg_7) {
      if (topScroll > 20) {
        header_bg_7.classList.add("sticky-7");
      } else {
        header_bg_7.classList.remove("sticky-7");
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
          <header className="header__area-7">
            <div className="header__inner-2">
              <CreativeAgencyLogo />
              {navData.nav && navData.nav.length && (
                <CreativeAgencyNav nav={navData.nav} />
              )}
              <div className="header__nav-icon-7">
                <button onClick={openCanvas} className="menu-icon-2">
                  <Image
                    priority
                    width={22}
                    height={22}
                    src={MenuDark}
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

export default CreativeAgencyHeader;
