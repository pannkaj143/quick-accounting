/** @format */

import Link from "next/link";
import React from "react";
import ArrowBlack from "../../../public/assets/imgs/icon/arrow-black.png";
import Image from "next/image";

const CreativeAgencyFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="footer__area-2 pt-130">
        <div className="container">
          <div className="footer__top-2 text-anim">
            <div className="row">
              <div className="col-xxl-12">
                <h2 className="sec-title-3 title-anim">
                  Get started <br /> now
                </h2>
                <p className="footer__sub-title">
                  If you would like to work with us or just want to get in
                  touch, we’d love to hear from you!
                </p>
              </div>
            </div>
          </div>
          <div className="footer__middle-2">
            <div className="row">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                <div className="footer__location-2">
                  <div className="location">
                    <h3>London</h3>
                    <p>
                      Office 3, 5th Floor, Lambourne House,
                      <br />
                      Western Road,
                      <br />
                      Romford, England, RM1 3LP
                    </p>
                  </div>
                  <div className="location">
                    <h3>Contact</h3>
                    <p>
                      020 4542 0907 <br />
                      info@quick-accounting.co.uk
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                <div className="footer__subscribe-2">
                  <form action="#">
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter your email"
                    />
                    <button type="submit" className="submit">
                      <Image
                        priority
                        style={{ width: "auto", height: "auto" }}
                        src={ArrowBlack}
                        alt="Arrow Icon"
                      />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="footer__btm-2">
            <div className="row">
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-5">
                <div className="footer__copyright-2">
                  <p>
                    © {currentYear} | Quick Accounting Ltd | Developed by-
                    <a href="https://www.karadinfotech.com/" target="_blank">
                      Karad Infotech Ltd
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-7">
                <div className="footer__nav">
                  <ul className="footer-menu menu-anim">
                    <li>
                      <Link href="/about">about us</Link>
                    </li>
                    <li>
                      <Link href="/contact">contact</Link>
                    </li>
                    <li>
                      <Link href="#">Career</Link>
                    </li>
                    <li>
                      <Link href="/faq">FAQs</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CreativeAgencyFooter;
