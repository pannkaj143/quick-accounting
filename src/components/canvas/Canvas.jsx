import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logoWhite2 from "../../../public/assets/imgs/logo/site-logo-white-2.png";
import Shape11 from "../../../public/assets/imgs/shape/11.png";
import Shape12 from "../../../public/assets/imgs/shape/12.png";
import Image from "next/image";

const Canvas = ({ bladeMode }) => {
  const [accordion, setAccordion] = useState(0);
  const [subAccordion, setSubAccordion] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        document
          .querySelectorAll(".header_title > a")
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
    }
  }, []);
  const openData = (data) => {
    setAccordion(data);
  };
  const openSubData = (data) => {
    setSubAccordion(data);
  };
  const closeCanvas = () => {
    document.querySelector(".offcanvas__area").style.opacity = "0";
    document.querySelector(".offcanvas__area").style.visibility = "hidden";
    if (bladeMode) {
      let header_bg = document.querySelector(".header__area");
      header_bg.style.setProperty("mix-blend-mode", "exclusion");
    }
  };
  return (
    <>
      <div className="offcanvas__area">
        <div className="offcanvas__body">
          <div className="offcanvas__left">
            <div className="offcanvas__logo">
              <Link href="/quick-accounting">
                <Image
                  priority
                  style={{ width: "auto", height: "auto" }}
                  src={logoWhite2}
                  alt="Offcanvas Logo"
                />
              </Link>
            </div>
            <div className="offcanvas__social">
              <h3 className="social-title">Follow Us</h3>
              <ul>
                <li>
                  <a href="#">Dribbble</a>
                </li>
                <li>
                  <a href="#">Behance</a>
                </li>
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">YouTube</a>
                </li>
              </ul>
            </div>
            <div className="offcanvas__links">
              <ul>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/contact">contact</Link>
                </li>
                <li>
                  <Link href="/career">Career</Link>
                </li>
                <li>
                  <Link href="/blog">blog</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="offcanvas__mid">
            <div className="offcanvas__menu-wrapper">
              <nav className="offcanvas__menu">
                <ul className="menu-anim title">
                  <li>
                    <div className="header_title">
                      <Link href={"/quick-accounting"}>HOME</Link>
                    </div>
                    
                    <div className="header_title">
                      <Link href={"/about"}>ABOUT</Link>
                    </div>
                  </li>
                  <li>
                    <div className="header_title d-flex">
                      <Link href={"/service-v6"}>SERVICE</Link> 
                    </div>
           
                    <div className="header_title">
                      <Link href={"/contact"}>CONTACT</Link>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="offcanvas__right">
            <div className="offcanvas__search">
              <form action="#">
                <input type="text" name="search" placeholder="Search keyword" />
                <button>
                  <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                </button>
              </form>
            </div>
            <div className="offcanvas__contact">
              <h3>Get in touch</h3>
              <ul>
                <li>
                  <a href="tel:+020 4542 0907">020 4542 0907</a>
                </li>
                <li>
                  <a href="info@quick-accounting.co.uk">info@quick-accounting.co.uk</a>
                </li>
                <li>48, Myrtle Road, <br />London RM3 8XS.</li>
              </ul>
            </div>
            <Image
              priority
              style={{ width: "auto", height: "auto" }}
              src={Shape11}
              alt="shape"
              className="shape-1"
            />
            <Image
              priority
              style={{ width: "auto", height: "auto" }}
              src={Shape12}
              alt="shape"
              className="shape-2"
            />
          </div>
          {bladeMode ? (
            <div className="offcanvas__close">
              <button type="button" onClick={closeCanvas}>
                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
              </button>
            </div>
          ) : (
            <div className="offcanvas__close">
              <button type="button" onClick={closeCanvas}>
                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Canvas;
