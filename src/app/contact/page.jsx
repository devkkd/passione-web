"use client";

import Image from "next/image";

export default function ContactPage() {
  return (
    <>
          {/* ================= CONTACT INTRO ================= */}

      <section className="contactIntro">
        <div className="container">

          <h1 className="introTitle">
            Contact us
          </h1>

          <div className="introContent">

            <p>
              Have a question, special request, or need help choosing the
              perfect piece?
            </p>

            <p>
              Our team is here to assist you every step of the way.
            </p>

            <br />

            <p>
              Whether it’s about your order, customization, or product
              details, we’re committed to providing a smooth and personal
              experience.
            </p>

            <br />

            <p>
              Reach out to us we’d love to hear from you.
            </p>

          </div>

        </div>
      </section>
            {/* ================= FULL WIDTH IMAGE ================= */}

      <section className="contactHero">
        <Image
          src="/contact.png"
          alt="Passione Jewelry Contact"
          width={1920}
          height={900}
          priority
          className="contactHeroImage"
        />
      </section>

      {/* ================= CONTACT SECTION ================= */}

      <section className="contactSection">
        <div className="container">
            <h2 className="contactHeading">
  Contact Us
</h2>

<p className="contactDescription">
  We'd love to hear from you. Whether you have a question, a custom request,
  or need assistance, our team is here to help.
</p>
                     <div className="contactWrapper">

            {/* ================= LEFT ================= */}

            <div className="contactLeft">

             

              <div className="infoItem">
                <h4>Visit us:</h4>

                <p>
                  1807/11 Charoenkrung Soi 69,
                 
                  Yannawa, Sathorn
                  <br />
                  Bangkok 10120
                </p>
              </div>

              <div className="infoItem">
                <h4>Email:</h4>

                <p>
                  passionjewelrydesigns@gmail.com
                </p>
              </div>

              <div className="infoItem">
                <h4>Call us:</h4>

                <p>
                  +66 99 096 7686
                </p>
              </div>

            </div>

            {/* ================= RIGHT ================= */}

            <div className="contactRight">

              <h3 className="formHeading">
                Send Message
              </h3>

              <form className="contactForm">

                <div className="formRow">

                  <div className="formGroup">
                    <label>Full Name *</label>

                    <input
                      type="text"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="formGroup">
                    <label>Email Address *</label>

                    <input
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>

                </div>

                <div className="formRow">

                  <div className="formGroup">
                    <label>Phone Number *</label>

                    <input
                      type="text"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="formGroup">
                    <label>City *</label>

                    <input
                      type="text"
                      placeholder="Enter city"
                    />
                  </div>

                </div>

                <div className="formGroup fullWidth">

                  <label>Message *</label>

                  <textarea
                    rows={5}
                    placeholder="Write your message..."
                  />

                </div>

                <button
                  type="submit"
                  className="sendButton"
                >
                  SEND MESSAGE
                </button>

              </form>

            </div>

          </div>

        </div>
      </section>
            <style jsx>{`

      *{
        box-sizing:border-box;
      }

      .container{
        width:100%;
        max-width:1400px;
        margin:0 auto;
        padding:0 32px;
      }

      /* ==========================
         Intro
      ========================== */

      .contactIntro{
        background:#fff;
        padding:80px 0;
      }

      .introTitle{
        font-family:"Times New Roman",serif;
        font-size:35px;
        font-weight:600;
        text-align:center;
        color:#111;
        margin-bottom:36px;
      }

      .introContent{
        max-width:820px;
        margin:0 auto;
        text-align:center;
      }

      .introContent p{
        font-family:"Times New Roman",serif;
        font-size:16px;
        line-height:1.9;
        color:#222;
      }

      /* ==========================
         Image
      ========================== */

      .contactHero{
        width:100%;
      }

      .contactHeroImage{
        width:100%;
        height:auto;
        display:block;
        object-fit:cover;
      }

      /* ==========================
         Contact Section
      ========================== */

     .contactSection{
  background:#fff;
  padding:110px 0 120px;
}
  .contactWrapper{
  display:grid;
  grid-template-columns:430px 1fr;
  gap:40px;
}

      /* ==========================
         Left
      ========================== */
.contactLeft{
  border-right:1px solid #D8D8D8;
  padding-right:8px;
}
     .contactHeading{
  font-family:"Times New Roman", serif;
  font-size:35px;
  font-weight:600;
  color:#111;
  text-align:center;
  margin:0 0 24px;
}

.contactDescription{
  max-width:860px;
  margin:0 auto 80px;
  text-align:center;

  font-family:"Times New Roman", serif;
  font-size:16px;
  line-height:1.9;
  color:#333;
}

     .infoItem{
  margin-bottom:58px;
}

      .infoItem h4{
        font-family:Montserrat,sans-serif;
        font-size:16px;
        font-weight:600;
        margin-bottom:12px;
        color:#111;
      }

      .infoItem p{
        font-family:Montserrat,sans-serif;
        font-size:15px;
        line-height:1.8;
        color:#444;
      }

      /* ==========================
         Right
      ========================== */
      .contactRight{
  padding-left:24px;
}

      .formHeading{
        font-family:Montserrat,sans-serif;
        font-size:22px;
        font-weight:400;
        color:#111;
        margin-bottom:38px;
      }

      .contactForm{
        width:100%;
      }

      .formRow{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:28px;
        margin-bottom:30px;
      }

      .formGroup{
        display:flex;
        flex-direction:column;
      }

      .formGroup label{
        font-family:Montserrat,sans-serif;
        font-size:13px;
        font-weight:300;
        margin-bottom:12px;
        color:#111;
      }

      .formGroup input,
      .formGroup textarea{

        width:100%;
        padding:0 0 15px;

        font-family:Montserrat,sans-serif;
        font-size:13px;

        border:none;
        border-bottom:1px solid #d8d8d8;

        background:transparent;
        outline:none;

      }

      .formGroup textarea{
        resize:none;
      }

      .fullWidth{
        margin-bottom:40px;
      }
        .formGroup input::placeholder,
.formGroup textarea::placeholder {
  color: #B1B7AB;
  opacity: 1; /* Firefox support */
}

.formGroup input::-webkit-input-placeholder,
.formGroup textarea::-webkit-input-placeholder {
  color: #B1B7AB;
}

.formGroup input::-moz-placeholder,
.formGroup textarea::-moz-placeholder {
  color: #B1B7AB;
}

.formGroup input:-ms-input-placeholder,
.formGroup textarea:-ms-input-placeholder {
  color: #B1B7AB;
}

      .sendButton{

        width:220px;
        height:54px;

        border:none;
        cursor:pointer;

        background:#276152;
        color:#fff;

        font-family:Montserrat,sans-serif;
        font-size:13px;
        font-weight:500;
        letter-spacing:.08em;

        transition:.3s;

      }

      .sendButton:hover{
        opacity:.9;
      }

      /* ==========================
         Tablet
      ========================== */

      @media(max-width:992px){

        .contactWrapper{
          gap:50px;
        }

      }

      /* ==========================
         Mobile
      ========================== */

      @media(max-width:768px){

        .container{
          padding:0 20px;
        }

        .contactIntro{
          padding:60px 0;
        }

        .introTitle{
          font-size:26px;
          margin-bottom:24px;
        }

        .introContent p{
          font-size:13px;
          line-height:1.8;
        }

       .contactSection{
  padding:80px 0;
}

        .contactWrapper{
          grid-template-columns:1fr;
          gap:55px;
        }

       .contactHeading{
  font-size:26px;
  text-align:center;
  margin-bottom:18px;
}

.contactDescription{
  max-width:100%;
  text-align:center;
  font-size:13px;
  margin:0 auto 45px;
}

        .infoItem{
          margin-bottom:28px;
        }

        .infoItem h4{
          <font-size:14></font-size:14>px;
        }

        .infoItem p{
          font-size:13px;
        }

        .formHeading{
          font-size:20px;
          margin-bottom:28px;
        }

        .formRow{
          grid-template-columns:1fr;
          gap:24px;
          margin-bottom:24px;
        }

        .sendButton{
          width:100%;
        }
          .contactLeft{
  border-right:none;
  padding-right:0;
}

.contactRight{
  padding-left:0;
}

.infoItem{
  margin-bottom:35px;
}

      }

      `}</style>

    </>
  );
} 