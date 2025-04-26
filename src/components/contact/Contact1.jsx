import React, { useState } from "react";

const Contact1 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");
    setIsSuccess(false);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          from_name: "Quick Accounting Contact Form", // Add a descriptive name for email subject
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSuccess(true);
        setStatus("Your message has been sent successfully!");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setIsSuccess(false);
        setStatus("Failed to send your message. Please try again later.");
        console.error("Form submission error:", result);
      }
    } catch (error) {
      setIsSuccess(false);
      console.error("Failed to send message:", error);
      setStatus("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
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
                  Let&apos;s get in touch
                </h2>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
              <div className="contact__text">
                <p>
                  Wonderful! We are eagerly awaiting your contact and are enthusiastic about commencing a remarkable partnership.
                </p>
              </div>
            </div>
          </div>
          <div className="row contact__btm">
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
              <div className="contact__info">
                <h3 className="sub-title-anim-top animation__word_come">
                  Please don&apos;t hesitate to
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
                      Office 3, 5th Floor, Lambourne House, Western Road,
                      <br />
                      Romford, England, RM1 3LP
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
              <div className="contact__form">
                {isSuccess ? (
                  <div className="success-message p-4 mb-4 bg-success text-white rounded">
                    <h4>Thank you for your message!</h4>
                    <p>We&apos;ve received your inquiry and will get back to you shortly.</p>
                    <button 
                      className="btn btn-light mt-3"
                      onClick={() => setIsSuccess(false)}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-xxl-6 col-xl-6 col-12">
                        <input
                          type="text"
                          name="name"
                          placeholder="Name *"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-xxl-6 col-xl-6 col-12">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email *"
                          value={formData.email}
                          onChange={handleChange}
                          required
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
                          required
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
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="btn_wrapper">
                          <button
                            type="submit"
                            className="wc-btn-primary btn-hover btn-item"
                            disabled={isSubmitting}
                          >
                            <span></span> 
                            {isSubmitting ? "Sending..." : "Send Messages"} 
                            <i className="fa-solid fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    {status && !isSuccess && (
                      <div className="form-status mt-3 text-danger">
                        {status}
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact1;
