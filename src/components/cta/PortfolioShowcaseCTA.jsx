import React from 'react';

const PortfolioShowcaseCTA = () => {
  return (
    <>
      <section className="cta__area-5 pt-130 pb-140">
            <div className="container-fluid">
              <div className="cta__inner-5">
                <div className="row">
                  <div className="col-xxl-8 col-xl-8 col-lg-7 col-md-7">
                    <div className="cta__content-5">
                      <h2 className="cta__title-5 title-anim">what we do for your <br /> brands</h2>
                      <div className="cta__list-wrapper">
                        <div className="cta__item-5">
                          <h3>Services</h3>
                          <ul className="cta__list-left">
                            <li>User experience</li>
                            <li>User interface</li>
                            <li>CMS-System</li>
                            <li>Webshop-System</li>
                            <li>Native-Apps</li>
                          </ul>
                        </div>
                        <div className="cta__item-5">
                          <h3>Awards</h3>
                          <ul className="cta__list-right">
                            <li> Awwwards - 2019</li>
                            <li>Dribbble Winner - 2020</li>
                            <li>Behance - 2021</li>
                            <li>Ziber award - 2012</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-5">
                    <div className="cta__btn-5">
                      <a className="btn-together" href="contact.html">Let’s work together <span><i
                            className="fa-solid fa-arrow-right"></i></span></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
    </>
  );
};

export default PortfolioShowcaseCTA;