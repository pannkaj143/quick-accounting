import React from "react";
import { Accordion } from "react-bootstrap";

const Faq1 = () => {
  return (
    <>
      <section className="faq__area-6">
        <div className="container g-0 line pt-130 pb-140">
          <div className="line-3"></div>

          <div className="row">
            <div className="col-xxl-12">
              <div className="sec-title-wrapper">
                <h2 className="sec-title-2 animation__char_come">FAQ</h2>
                <p className="">
                  Frequently asked question (FAQ) <br /> by prospective clients
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xxl-12">
              <div className="faq__list-6">
                <Accordion
                  defaultActiveKey="0"
                  className="accordion"
                  id="accordionExample"
                >
                  <Accordion.Item eventKey="0" className="accordion-item">
                    <Accordion.Header
                      className="accordion-header"
                      id="headingOne"
                    >
                      How easy is it to change accountants and why should I change?
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      <p>
                      If your existing accountant is offering you an excellent pro-active service at a fair 
                      fee then stick with them. However, different accountants will save you different amounts 
                      of tax and provide different levels of business advice. If your present accountant doesn&apos;t 
                      offer the type of service you want and that we do offer, then changing over to us is very easy. 
                      It involves just one letter from you and we take care of everything else for you.
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1" className="accordion-item">
                    <Accordion.Header
                      className="accordion-header"
                      id="headingTwo"
                    >
                      You seem to offer a lot. Are your fees expensive?
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      <p>
                      No! We offer fixed fees linked to the value of what we provide. 
                      We&apos;re not always the cheapest and as with many things in life the cheapest 
                      is often the most expensive in the long run. However, we are not expensive and 
                      we offer excellent value for what we provide. Most importantly we never undertake 
                      work without agreeing the fee arrangements in advance so you always know where you stand.
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2" className="accordion-item">
                    <Accordion.Header
                      className="accordion-header"
                      id="headingThree"
                    >
                      I&apos;ve just had my accounts done and don&apos;t need an accountant until next year, so is there any need to contact you now?
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      <p>
                      We can&apos;t over emphasise the importance of tax planning at an early stage, not crisis driven advice. 
                      Ideally you do tax planning before the year even starts but after that, the earlier the better. 
                      The same is applicable to all areas of advice and we are about helping you change the future, 
                      not just reporting what has already happened.
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3" className="accordion-item">
                    <Accordion.Header
                      className="accordion-header"
                      id="headingFour"
                    >
                      Will you come to visit us for an initial consultation?
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      <p>
                      Yes. It often helps to see your business, books and records, etc at first hand and we are always 
                      happy to invest our time without charge to show you what we can do. Of course, 
                      if you prefer to visit us, that&apos;s fine too.
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="4" className="accordion-item">
                    <Accordion.Header
                      className="accordion-header"
                      id="headingFive"
                    >
                      When and how soon can you come to see us?
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      <p>
                        When&apos;s good for you? Let us know and we&apos;ll do our utmost to help. 
                        If you need to see somebody urgently, we&apos;re always out and about and can 
                        arrange to see you very quickly.
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="5" className="accordion-item">
                    <Accordion.Header
                      className="accordion-header"
                      id="headingSix"
                    >
                      Is your fixed quote guaranteed for more than one year?
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      <p>
                      We&apos;re not in the business of providing low quotes just to get your business 
                      for the first year and then raising the fees. We want you as a long term client who 
                      trusts us to do what we say we will do. We quote what we anticipate to be a fair fee for 
                      the value provided and would only anticipate normal inflationary increases if the work stays 
                      the same. Very occasionally there may be reasons why the amount of work involved exceeded what was 
                      expected but we would sit down and discuss these with you. In some cases, where it is clear exactly 
                      what work is involved we can guarantee the fee for more than one year.
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>


                  <Accordion.Item eventKey="6" className="accordion-item">
                    <Accordion.Header
                      className="accordion-header"
                      id="headingSeven"
                    >
                      You seem to be offering so much that Im just not used to from my present accountant. How do I know you will deliver?
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      <p>
                      All we can say is that as accountants, you&apos;d expect us to be a bit analytical, which is true. 
                      Our clients are used to this level of service. You are also more than welcome to speak with 
                      some of our existing clients who have the experience of our service. See what our clients say.
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>


                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq1;
