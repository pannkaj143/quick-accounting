import Image from "next/image";
import React from "react";

import FooterLogo52 from "../../../public/assets/imgs/icon/5/footer-logo-5-2.png"
import FooterLogo5 from "../../../public/assets/imgs/icon/5/footer-logo-5.png"

const PortfolioShowcaseFooter = () => {
  return (
    <>
      <footer className="footer__area-5">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <a href="index.html" className="logo-dark">
                <Image
                  priority
                  width={26}
                  height={21}
                  src={FooterLogo52}
                  alt="Site Logo"
                />
              </a>
              <a href="index.html" className="logo-light">
              <Image
                  priority
                  width={26}
                  height={21}
                  src={FooterLogo5}
                  alt="Site Logo"
                />
              </a>
              <ul className="footer__menu-5 menu-anim">
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">behance</a>
                </li>
                <li>
                  <a href="#">Dribbble</a>
                </li>
              </ul>
              <div className="footer__copyright-4">
                <p>
                  © 2022 - 2025 | Alrights reserved
                  <br /> by{" "}
                  <a
                    href="https://themeforest.net/user/crowdyflow/portfolio"
                    target="_blank"
                  >
                    Crowdyflow
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default PortfolioShowcaseFooter;
