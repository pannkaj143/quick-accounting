import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollSmoother } from "@/plugins";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const CreativeAgencyService = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        let animation_services_7 = gsap.utils.toArray(
          ".animation_service_7 .service__item-7"
        );
        gsap.set(animation_services_7, {
          opacity: 0,
          x: -30,
        });

        if (animation_services_7) {
          if (device_width < 1023) {
            animation_services_7.forEach((item, i) => {
              gsap.to(item, {
                scrollTrigger: {
                  trigger: item,
                  start: "top center+=200",
                  markers: false,
                },
                opacity: 1,
                x: -0,
                ease: "power2.out",
                duration: 2,
                stagger: {
                  each: 0.4,
                },
              });
            });
          } else {
            gsap.to(".animation_service_7 .service__item-7", {
              scrollTrigger: {
                trigger: ".animation_service_7",
                start: "top center+=200",
                markers: false,
              },
              opacity: 1,
              x: 0,
              ease: "power2.out",
              duration: 2,
              stagger: {
                each: 0.4,
              },
            });
          }
        }
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <section className="service__area-7 pt-130">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="service__items-7 animation_service_7">
                <div className="service__item-7">
                  <Link href="/contact">
                    <h3 className="service__title-7">
                    Company<span>Incorporation</span>
                    </h3>
                  </Link>
                  <p>
                  Supporting company registration, ensuring Companies House compliance for entrepreneurs and businesses.
                  </p>
                  <ul>
                    <li>+ Company Formation</li>
                    <li>+ Regulatory Compliance</li>
                    <li>+ Shareholder Agreements</li>
                  </ul>
                </div>
                <div className="service__item-7">
                  <Link href="/contact">
                    <h3 className="service__title-7">
                      Tax <span>Planning</span>{" "}
                    </h3>
                  </Link>
                  <p>
                  Personalized strategies to minimize tax liabilities and ensure 
                  compliance with tax laws, optimizing your tax obligations.
                  </p>
                  <ul>
                    <li>+ Personalized Strategies</li>
                    <li>+ Minimize Liabilities</li>
                    <li>+ Compliance Assurance</li>
                  </ul>
                </div>
                <div className="service__item-7">
                  <Link href="/contact">
                    <h3 className="service__title-7">
                    Bookkeeping<span>Solutions</span>{" "}
                    </h3>
                  </Link>
                  <p>
                  Accurate and organized financial record management, providing 
                  clear insights for effective decision-making.
                  </p>
                  <ul>
                    <li>+ Accurate Records</li>
                    <li>+ Organized Books</li>
                    <li>+ Informed Decision-making</li>
                  </ul>
                </div>
                <div className="service__item-7">
                  <Link href="/contact">
                    <h3 className="service__title-7">
                    Payroll<span>Management</span>{" "}
                    </h3>
                  </Link>
                  <p>
                  Efficient handling of payroll processes, ensuring accurate calculations 
                  and timely disbursements for smooth payroll operations.
                  </p>
                  <ul>
                    <li>+ Efficient Processing</li>
                    <li>+ Timely Disbursements</li>
                    <li>+ Smooth Operations</li>
                  </ul>
                </div>
                <div className="service__item-7">
                  <Link href="/contact">
                    <h3 className="service__title-7">
                      Business <span>Consulting</span>
                    </h3>
                  </Link>
                  <p>
                  Insights and recommendations to enhance operational efficiency, profitability, 
                  and strategic growth, driving your business towards success.
                  </p>
                  <ul>
                    <li>+ Operational Insights</li>
                    <li>+ Profitability Strategies</li>
                    <li>+ Strategic Growth</li>
                  </ul>
                </div>
                <div className="service__item-7">
                  <Link href="/contact">
                    <h3 className="service__title-7">
                    Financial<span>Accounts</span>{" "}
                    </h3>
                  </Link>
                  <p>
                  Every UK business is required to complete accounts on an annual basis. 
                  These accounts are then used to calculate the amount of tax payable..
                  </p>
                  <ul>
                    <li>+ Thorough Examination</li>
                    <li>+ Accuracy Assurance</li>
                    <li>+ Compliance Validation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreativeAgencyService;
