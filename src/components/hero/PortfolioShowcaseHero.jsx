import Image from "next/image";
import React from "react";

import HeroBg5 from "../../../public/assets/imgs/hero/5/hero-bg-5.png";

const PortfolioShowcaseHero = () => {
  return (
    <>
      <section className="hero__area-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-12">
              <div className="hero__content-5">
                <h1 className="hero__title-5 animation__word_come">
                  We work with top brands <br /> and industry & We share <br />
                  our best works.
                </h1>
                <div className="hero__text-5 text-anim">
                  <p>
                    Leading creative agency with over years driving growth,
                    brining digital arts and engaging growing brands through
                    bold something with us that matters the how to best works.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Image
          priority
          style={{ width: "auto", height: "auto" }}
          src={HeroBg5}
          alt="Shape Image"
        />
      </section>
    </>
  );
};

export default PortfolioShowcaseHero;
