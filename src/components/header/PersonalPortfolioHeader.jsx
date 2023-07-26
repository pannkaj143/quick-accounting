import React, { useEffect, useState } from "react";
import Canvas from "../canvas/Canvas";
import Link from "next/link";
import LogoBlack from "../../../public/assets/imgs/logo/logo-black.png";
import LogoWhite2 from "../../../public/assets/imgs/logo/site-logo-white-2.png";
import MenuBlack from "../../../public/assets/imgs/icon/menu-black.png";
import Image from "next/image";

const PersonalPortfolioHeader = () => {
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
    let header_bg_2 = document.querySelector(".header__area-2");
    if (header_bg_2) {
      if (topScroll > 20) {
        header_bg_2.style.background = "#121212";
        header_bg_2.classList.add("sticky-2");
      } else {
        header_bg_2.style.background = "transparent";
        header_bg_2.classList.remove("sticky-2");
      }
    }
  }
  const openCanvas = () => {
    document.querySelector(".offcanvas__area").style.opacity = "1";
    document.querySelector(".offcanvas__area").style.visibility = "visible";
  };
  return (
    <>
      <header className="header__area-2">
        <div className="header__inner-5">
          <div className="header__logo-5">
            <Link href="/digital-marketing" className="logo-dark">
              <Image
                priority
                width={136}
                height={45}
                src={LogoBlack}
                alt="Site Logo"
              />
            </Link>
            <Link href="/digital-marketing" className="logo-light">
              <Image
                priority
                width={100}
                height={33}
                src={LogoWhite2}
                alt="Site Logo"
              />
            </Link>
          </div>
          <div className="header__nav-icon-5">
            <button onClick={openCanvas} id="open_offcanvas">
              <span className="menu-text-pp">Menu</span>
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
      <Canvas />
    </>
  );
};

export default PersonalPortfolioHeader;
