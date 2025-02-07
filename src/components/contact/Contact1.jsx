import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact1 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
        publicKey
      );

      setStatus("Your message has been sent successfully!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Failed to send email:", error);
      setStatus("Failed to send your message. Please try again later.");
    }
  };

  return (
    <>
      <section className="contact__area-6">
        <div className="container g-0 line pt-120 pb-110">
          <span className="line-3"></span>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
              <div className="sec-title-wrapper">
                <h2 className="sec-title-2 animation__char_come">
                  Let’s get in touch
                </h2>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
              <div className="contact__text">
                <p>
                  {
                    "Wonderful! We are eagerly awaiting your contact and are enthusiastic about commencing a remarkable partnership."
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="row contact__btm">
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
              <div className="contact__info">
                <h3 className="sub-title-anim-top animation__word_come">
                  {"Please don't hesitate to"}
                  <br />
                  reach out
                </h3>
                <ul>
                  <li>
                    <a href="tel:+020 4542 0907">020 4542 0907</a>
                  </li>
                  <li>
                    <a href="mailto:info@quick-accounting.co.uk">
                      info@quick-accounting.co.uk
                    </a>
                  </li>
                  <li>
                    <span>
                      Office 3, 5th Floor, Lambourne House, 7 Western Road,
                      <br />
                      Romford, England, RM1 3LP
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
              <div className="contact__form">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-xxl-6 col-xl-6 col-12">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name *"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-12">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-xxl-6 col-xl-6 col-12">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-12">
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject *"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-12">
                      <textarea
                        name="message"
                        placeholder="Messages *"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="btn_wrapper">
                        <button
                          type="submit"
                          className="wc-btn-primary btn-hover btn-item"
                        >
                          <span></span> Send <br />
                          Messages <i className="fa-solid fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                {status && <p>{status}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact1;
