import React, { useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "@/plugins";
import TeamDetails from "../../../public/assets/imgs/team/detail.jpg";
import Image from "next/image.js";

const TeamDetails1 = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let tHero = gsap.context(() => {
        let char_come = document.querySelectorAll(".animation__char_come");

        char_come.forEach((char_come) => {
          let split_char = new SplitText(char_come, { type: "chars, words" });
          gsap.from(split_char.chars, {
            duration: 1,
            x: 70,
            autoAlpha: 0,
            stagger: 0.05,
          });
        });
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <section className="team__detail">
        <div className="container line pb-140">
          <div className="line-3"></div>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 offset-lg-0 offset-md-2">
              <div className="team__member-img">
                <Image
                  priority
                  style={{ width: "auto", height: "auto" }}
                  src={TeamDetails}
                  alt="Team Member Picture"
                  data-speed="0.5"
                />
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12">
              <div className="sec-title-wrapper pt-120">
                <h2 className="team__member-name-7 animation__char_come">
                  Jassica <br />
                  Oliver
                </h2>
                <h3 className="team__member-role-7 animation__char_come">
                  UX Researcher and Instructor, at
                  <span> Axtra</span>
                </h3>
                <p>
                  Jassica Oliver is known for her ability to take a creative
                  brief and run with it, coming back with fresh ideas and a
                  perfectly built design file every time. From digital design to
                  long-format layouts, she blends beautiful and intuitive with
                  each project she touches. She also happens to be the queen of
                  deadline-crushing, all while maintaining a can-do, Zen
                  attitude that keeps the whole Statement team centered.
                </p>
                <p>
                  When he’s not building strong alliances with other creatives,
                  project managers and stakeholders alike, you’ll find him
                  giving voice to client strategies with fresh, compelling
                  concepts and delightfully clever messaging.
                </p>
              </div>
              <div className="team__member-work">
                <h4 className="work-title">Portfolio :</h4>
                <ul>
                  <li>
                    <a href="#">Behance</a>
                  </li>
                  <li>
                    <a href="#">Dribble</a>
                  </li>
                  <li>
                    <a href="#">Meduim</a>
                  </li>
                </ul>
              </div>
              <div className="team__member-social">
                <h4 className="work-title">Follow :</h4>
                <ul>
                  <li>
                    <a href="#">
                      <span>
                        <i className="fa-brands fa-facebook-f"></i>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>
                        <i className="fa-brands fa-twitter"></i>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>
                        <i className="fa-brands fa-instagram"></i>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>
                        <i className="fa-brands fa-linkedin"></i>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamDetails1;
