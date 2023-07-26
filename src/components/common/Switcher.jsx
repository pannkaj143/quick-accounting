import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faXmark } from "@fortawesome/free-solid-svg-icons";

const Switcher = ({ setMode }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.querySelector(".switcher__icon").style.zIndex = "1000";
      document.querySelector(".switcher__items").style.zIndex = "1000";
      document
        .querySelector("#switcher_open")
        .addEventListener("click", function () {
          document.querySelector("#switcher_open").style.display = "none";
          document.querySelector("#switcher_close").style.display = "flex";
          document.querySelector(".switcher__icon").style.right = "280px";
          document.querySelector(".switcher__items").style.right = "0";
        });

      document
        .querySelector("#switcher_close")
        .addEventListener("click", function () {
          document.querySelector("#switcher_close").style.display = "none";
          document.querySelector("#switcher_open").style.display = "flex";
          document.querySelector(".switcher__icon").style.right = "0";
          document.querySelector(".switcher__items").style.right = "-280px";
        });

      // Mode JS
      const modeList = document.querySelectorAll(".mode-type button");
      for (let i = 0; i < modeList.length; i++) {
        modeList[i].addEventListener("click", function (e) {
          modeList[i].classList.add("active");
          for (let sib of modeList[i].parentElement.children) {
            if (sib !== modeList[i]) {
              sib.classList.remove("active");
            }
          }

          var mode_val = document
            .querySelector(".mode-type button.active")
            .getAttribute("data-mode");
          if (mode_val == "dark") {
            document.querySelector("body").classList.add("dark");
            if (setMode) {
              setMode("dark");
            }
          } else {
            document.querySelector("body").classList.remove("dark");

            if (setMode) {
              setMode("");
            }
          }
        });
      }

      // Cursor JS
      document
        .querySelector("#cursor_style")
        .addEventListener("change", function () {
          var cursor_val = document.querySelector("#cursor_style").value;

          if (cursor_val == "1") {
            document.querySelector(".cursor1").style.display = "none";
            document.querySelector(".cursor2").style.display = "none";
          } else {
            document.querySelector(".cursor1").style.display = "";
            document.querySelector(".cursor2").style.display = "";
          }
        });
    }
  }, [setMode]);
  return (
    <>
      <div className="switcher__area">
        <div className="switcher__icon">
          <button id="switcher_open">
            <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
          </button>
          <button id="switcher_close">
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </button>
        </div>

        <div className="switcher__items">
          <div className="switcher__item">
            <div className="switch__title-wrap">
              <h2 className="switcher__title">Cursor</h2>
            </div>
            <div className="switcher__btn">
              <select defaultValue={2} name="cursor-style" id="cursor_style">
                <option value="1">default</option>
                <option value="2">animated</option>
              </select>
            </div>
          </div>

          <div className="switcher__item">
            <div className="switch__title-wrap">
              <h2 className="switcher__title">mode</h2>
            </div>
            <div className="switcher__btn mode-type wc-col-2">
              <button className="active" data-mode="light">
                light
              </button>
              <button data-mode="dark">dark</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Switcher;
