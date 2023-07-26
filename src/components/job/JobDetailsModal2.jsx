import React from "react";
import LogoBlack from "../../../public/assets/imgs/logo/logo-black.png";
import Image from "next/image";

const JobDetailsModal2 = () => {
  const backForm = () => {
    document.querySelector("#application_form2").classList.remove("modal-show");
  };

  const applyClose = () => {
    document.querySelector("#application_form2").classList.remove("modal-show");
    document.querySelector("#application_form").classList.remove("modal-show");
  };
  return (
    <>
      <div className="modal__application" id="application_form2">
        <div className="modal__apply">
          <button
            onClick={applyClose}
            className="modal__close-2"
            id="apply_close2"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="form-top">
            <Image
              priority
              style={{ width: "auto", height: "auto" }}
              src={LogoBlack}
              alt="Site logo"
            />
            <h2 className="sec-title">Frontend Developer</h2>
            <p>Full time</p>
          </div>
          <div className="form-apply">
            <form action="#">
              <div className="input-apply-2">
                <p>Name *</p>
                <input type="text" name="name" required />
              </div>
              <div className="input-apply-2">
                <p>Email *</p>
                <input type="email" name="email" required />
              </div>
              <div className="input-apply-2">
                <p>Phone *</p>
                <input type="tel" name="phone" required />
              </div>
              <div className="input-apply-2">
                <p>Upload CV *</p>
                <input type="file" name="cv" />
              </div>
            </form>
          </div>
          <div className="form-btn-2">
            <button
              onClick={backForm}
              className="wc-btn-primary btn-hover"
              id="back_form1"
            >
              <span></span> back <i className="fa-solid fa-arrow-right"></i>
            </button>
            <button
              onClick={applyClose}
              type="submit"
              className="wc-btn-primary btn-hover"
            >
              <span></span> Submit <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailsModal2;
