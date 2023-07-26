import React, { useEffect, useState } from "react";
import DigitalMarketingLogo from "../logo/DigitalMarketingLogo";
import DigitalMarketingNav from "../nav/DigitalMarketingNav";
import Canvas from "../canvas/Canvas";
import MenuBlack from "../../../public/assets/imgs/icon/menu-black.png";
import Image from "next/image";
import SearchData from "../../data/searchData.json";
import { useRouter } from "next/router";

const DigitalMarketingHeader = ({ navData }) => {
  const [topScroll, setTopScroll] = useState(0);
  const [searchData, setSearchData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [searchSlug, setSearchSlug] = useState([])
  const router = useRouter();
  const handleTopScroll = () => {
    const position = window.pageYOffset;
    setTopScroll(position);
  };
  useEffect(() => {
    setSearchData(SearchData.search);
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

  const openSearch = () => {
    document.querySelector(".header__search").classList.add("open-search");
    document.querySelector("#search_icon").style.display = "none";
    document.querySelector("#search_close").style.display = "block";
  };
  const closeSearch = () => {
    document.querySelector(".header__search").classList.remove("open-search");
    document.querySelector("#search_icon").style.display = "block";
    document.querySelector("#search_close").style.display = "none";
    setSearchValue('')
    let inputData = document.getElementById("s")
    inputData.value = ''
  };
  useEffect(() => {
    if (searchData && Object.keys(searchData).length) {
      if (searchValue) {
        let parentDiv = document.getElementById("search-value");
        parentDiv.innerHTML = "";
        const allSlug = [];
        searchData.map((el) => {
          let result = el.name.includes(searchValue);
          if (result) {
            allSlug.push(el.slug)
            let createTag = document.createElement("p");
            createTag.innerHTML = el.name;
            createTag.classList.add("search-name")
            parentDiv.appendChild(createTag);
          }
        });
        setSearchSlug(allSlug)
      } else {
        let parentDiv = document.getElementById("search-value");
        parentDiv.innerHTML = "";
        const allSlug = [];
        setSearchSlug(allSlug)
      }
    }
  }, [searchValue, searchData]);
  const test = (event) => {
    event.preventDefault()
    if(searchSlug && searchSlug.length) {
      router.push("/" + searchSlug[0])
    }
  }
  return (
    <>
      {navData && Object.keys(navData).length && (
        <>
          <header className="header__area-3">
            <div className="header__inner-3">
              <DigitalMarketingLogo />
              {navData.nav && navData.nav.length && (
                <DigitalMarketingNav nav={navData.nav} />
              )}
              <div className="header__nav-icon-3">
                <button
                  className="search-icon"
                  onClick={openSearch}
                  id="search_icon"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <button
                  className="search-icon"
                  onClick={closeSearch}
                  id="search_close"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
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
          <div className="header__search">
            <form onSubmit={(event) => test(event)}>
              <input
                type="text"
                name="s"
                id="s"
                placeholder="Search.."
                
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <div id="search-value"></div>
            </form>
            {/* <input
                type="text"
                name="s"
                id="s"
                placeholder="Search.."
                onSubmit={test}
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <div id="search-value"></div> */}
          </div>
        </>
      )}
      <Canvas />
    </>
  );
};

export default DigitalMarketingHeader;
