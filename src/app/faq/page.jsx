"use client";

import { useState, useEffect } from "react";

const faqData = [
  {
    id: "general",
    title: "General",
    questions: [
      {
        question: "What materials are your jewelry pieces made from?",
        answer:
          "Our jewelry is handcrafted using premium materials including sterling silver, 14K and 18K gold, platinum, and carefully selected natural gemstones. Each product page contains complete material information.",
      },
      {
        question: "Are your gemstones natural or synthetic?",
        answer:
          "We use only genuine natural gemstones sourced from trusted suppliers. Every product clearly mentions the gemstone type and its authenticity.",
      },
      {
        question: "Do you offer custom jewelry design services?",
        answer:
          "Yes. We create bespoke jewelry for engagements, weddings, anniversaries and special occasions. Contact our design team to discuss your ideas.",
      },
    ],
  },

  {
    id: "order",
    title: "Order and Payment",
    questions: [
      {
        question: "How can I place an order?",
        answer:
          "Simply browse our collections, add your favorite pieces to the cart, and proceed through our secure checkout process.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept Visa, Mastercard, American Express, PayPal and other secure payment options depending on your location.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Absolutely. All transactions are encrypted using industry-standard SSL security to protect your payment information.",
      },
    ],
  },

  {
    id: "shipping",
    title: "Shipping and Delivery",
    questions: [
      {
        question: "Do you offer international shipping?",
        answer:
          "Yes. We ship worldwide with trusted courier partners. Shipping costs are calculated during checkout.",
      },
      {
        question: "How long will it take to receive my order?",
        answer:
          "Orders usually arrive within 5–7 business days domestically and 10–14 business days internationally.",
      },
    ],
  },

  {
    id: "care",
    title: "Care & Maintenance",
    questions: [
      {
        question: "How should I care for my jewelry?",
        answer:
          "Store your jewelry in a dry jewelry box, avoid harsh chemicals, and clean it gently with a soft polishing cloth.",
      },
      {
        question: "Do you offer cleaning or repair services?",
        answer:
          "Yes. We provide professional cleaning, resizing and repair services for eligible jewelry pieces.",
      },
    ],
  },
];

export default function FAQPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [openItems, setOpenItems] = useState({});

  const toggleFAQ = (key) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };


const scrollToSection = (id) => {
  setActiveSection(id);

  const section = document.getElementById(id);

  if (!section) return;

  window.scrollTo({
    top: section.offsetTop - 120,
    behavior: "smooth",
  });
};
useEffect(() => {
  const handleScroll = () => {
    const sections = faqData.map((item) =>
      document.getElementById(item.id)
    );

    const scrollPosition = window.scrollY + 150;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];

      if (section && scrollPosition >= section.offsetTop) {
        setActiveSection(section.id);
        break;
      }
    }
  };

  window.addEventListener("scroll", handleScroll);

  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  return (
    <>
      {/* ================= HEADER ================= */}

      <section className="faqHero">
        <div className="container">

          <h1 className="faqTitle">
            Frequently Asked Questions
          </h1>

          <p className="faqSubtitle">
            A seamless experience is at the heart of everything we do.
          </p>

          <p className="faqSubtitle">
            Below you'll find answers to the most common inquiries about our
            craftsmanship, orders, shipping, and jewelry care.
          </p>

        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <section className="faqContent">

        <div className="container">

          <div className="faqWrapper">

            {/* ================= LEFT MENU ================= */}

            <aside className="faqSidebar">

              {faqData.map((item) => (

                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={
                    activeSection === item.id
                      ? "sidebarButton active"
                      : "sidebarButton"
                  }
                >
                  {item.title}
                </button>

              ))}

            </aside>

            {/* ================= RIGHT ================= */}

            <div className="faqRight">
                              {faqData.map((section) => (

                <section
                  key={section.id}
                  id={section.id}
                  className="faqSection"
                >

                  <h2 className="sectionTitle">
                    {section.title}
                  </h2>

                  {section.questions.map((item, index) => {

                    const key = `${section.id}-${index}`;

                    return (

                      <div
                        className="faqItem"
                        key={key}
                      >

                        <button
                          className="faqQuestion"
                          onClick={() => toggleFAQ(key)}
                        >

                          <span>
                            {item.question}
                          </span>

                          <span
                            className={
                              openItems[key]
                                ? "faqIcon rotate"
                                : "faqIcon"
                            }
                          >
                            ⌄
                          </span>

                        </button>

                        <div
                          className={
                            openItems[key]
                              ? "faqAnswer open"
                              : "faqAnswer"
                          }
                        >

                          <p>
                            {item.answer}
                          </p>

                        </div>

                      </div>

                    );

                  })}

                </section>

              ))}

            </div>

          </div>

        </div>

      </section>
            <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
        }

        /* ================= HERO ================= */

        .faqHero {
          padding: 80px 0 70px;
          text-align: center;
          background: #fff;
        }

        .faqTitle {
          font-family: "Times New Roman", serif;
          font-size: 28px;
          font-weight: 600;
          color: #111;
          margin-bottom: 24px;
        }

        .faqSubtitle {
          font-family: "Times New Roman", serif;
          font-size: 14px;
          line-height: 1.9;
          color: #444;
        }

        /* ================= CONTENT ================= */

        .faqContent {
          padding-bottom: 120px;
          background: #fff;
        }

        .faqWrapper {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 70px;
          align-items: start;
        }

        /* ================= SIDEBAR ================= */

        .faqSidebar {
          position: sticky;
          top: 120px;
        }

        .sidebarButton {
          width: 100%;
          text-align: left;
          padding: 18px 20px;
          border: 1px solid #d9d9d9;
          background: #fff;
          font-family: "Times New Roman", serif;
          font-size: 14px;
          cursor: pointer;
          transition: .3s;
        }

        .sidebarButton + .sidebarButton {
          border-top: none;
        }

        .sidebarButton.active {
          background: #000;
          color: #fff;
        }

        /* ================= RIGHT ================= */

        .faqSection {
          margin-bottom: 70px;
          scroll-margin-top: 120px;
        }

        .sectionTitle {
          font-family: "Times New Roman", serif;
          font-size: 28px;
          font-weight: 400;
          margin-bottom: 30px;
          color: #111;
        }

        .faqItem {
          border-bottom: 1px solid #ddd;
        }

        .faqQuestion {
          width: 100%;
          padding: 24px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          background: transparent;
          border: none;
          font-family: "Times New Roman", serif;
          font-size: 16px;
          font-weight: 600;
          color: #111;
        }

        .faqIcon {
          font-size: 24px;
          transition: .3s;
        }

        .faqIcon.rotate {
          transform: rotate(180deg);
        }

        .faqAnswer {
          max-height: 0;
          overflow: hidden;
          transition: .35s;
        }

        .faqAnswer.open {
          max-height: 250px;
          padding-bottom: 24px;
        }

        .faqAnswer p {
          font-family: "Times New Roman", serif;
          font-size: 14px;
          line-height: 1.9;
          color: #444;
        }

        /* ================= MOBILE ================= */

        @media (max-width:768px){

          .container{
            padding:0 20px;
          }

          .faqHero{
            padding:60px 0 50px;
          }

          .faqTitle{
            font-size:24px;
          }

          .faqSubtitle{
            font-size:13px;
            line-height:1.8;
          }

          .faqWrapper{
            grid-template-columns:1fr;
            gap:40px;
          }

          .faqSidebar{
            position:static;
            display:flex;
            overflow-x:auto;
            gap:10px;
          }

          .sidebarButton{
            white-space:nowrap;
            border:1px solid #ddd;
            min-width:max-content;
            font-size:13px;
          }

          .sectionTitle{
            font-size:22px;
            margin-bottom:20px;
          }

          .faqQuestion{
            font-size:13px;
            padding:18px 0;
          }

          .faqAnswer p{
            font-size:13px;
            line-height:1.8;
          }

        }

      `}</style>
    </>
  );
}