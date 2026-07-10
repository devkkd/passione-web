"use client";

import { useState } from "react";

/**
 * Footer.jsx
 * -----------------------------------------------------------------
 * Passione "Enter the world of Passione" subscribe banner/footer.
 *
 * - Full viewport width background image (/footer.png from /public).
 * - Dark left-to-right gradient overlay on top of the image so the
 *   text always stays readable, exactly like the reference screenshot.
 * - Content column is capped with the exact .footer-inner rule the
 *   client specified (max-width 1400px, padding 40px 64px 24px,
 *   and 32px 24px 20px under 860px).
 * - Fonts:
 *     - "ENTER THE WORLD OF PASSIONE" (eyebrow) -> Montserrat
 *     - Fine print ("By subscribing...Privacy Policy.") -> Montserrat
 *     - Everything else (heading, paragraph, input, button) -> Times New Roman
 * - Subscribe button background is #FFFFFF as requested.
 * - Fully responsive: mobile stacks the email field + button and
 *   scales type down, desktop matches the screenshot 1:1.
 *
 * NOTE: Make sure Montserrat is actually loaded on the page (e.g. via
 * next/font/google in your root layout, or a Google Fonts <link> tag),
 * otherwise the browser will silently fall back to the next font in
 * the stack. Example using next/font in app/layout.jsx:
 *
 *   import { Montserrat } from "next/font/google";
 *   const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
 *   // then add montserrat.variable to your <html> or <body> className
 *
 * Usage:
 *   import Footer from "@/components/Footer";
 *   ...
 *   <Footer />
 */

const SERIF_FONT = '"Times New Roman", Times, serif';
const SANS_FONT = '"Montserrat", "Helvetica Neue", Arial, sans-serif';

export default function Footer() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Hook up actual subscribe logic here.
    console.log("Subscribe:", email);
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-eyebrow">ENTER THE WORLD OF PASSIONE</p>

        <h2 className="footer-heading">
          Inspired by the raw elegance of nature.
          <br />
          Curated exclusively for you.
        </h2>

        <p className="footer-desc">
          Discover a rare realm of fine craftsmanship, heritage design, and private collections.
          Subscribe to receive priority access to new collection debuts, bespoke inspirations, and
          private invitations reserved only for our inner circle.
        </p>

        <form className="footer-form" onSubmit={handleSubmit}>
          <label className="footer-email-label" htmlFor="footer-email">
            Enter email address
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
            />
          </label>

          <button type="submit" className="footer-subscribe-btn">
            Subscribe
          </button>
        </form>

        <p className="footer-terms">
          By subscribing, you agree to receive curated, elite communications from Passione. View
          our <a href="/privacy-policy">Privacy Policy.</a>
        </p>
      </div>

      <style jsx>{`
        .site-footer {
          position: relative;
          width: 100%;
          background-image: url("/footer.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          isolation: isolate;
        }

        /* Dark gradient overlay so text always stays legible on top of
           the photo, regardless of how bright/dark the source image is. */
        .site-footer::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.72) 0%,
            rgba(0, 0, 0, 0.5) 30%,
            rgba(0, 0, 0, 0.15) 55%,
            rgba(0, 0, 0, 0) 75%
          );
          z-index: 0;
        }

        .footer-inner {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 480px;
  justify-content: center;
}

        .footer-eyebrow {
          font-family: ${SANS_FONT};
          font-size: 14px;
          letter-spacing: 0.18em;
          font-weight: 400;
          color: #ffffff;
          margin: 0 0 22px;
        }

        .footer-heading {
          font-family: ${SERIF_FONT};
          font-weight: 400;
          font-size: 25px;
          line-height: 1.35;
          color: #ffffff;
          margin: 0 0 18px;
          max-width: 480px;
        }

        .footer-desc {
          font-family: ${SERIF_FONT};
          font-size: 13.5px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.88);
          max-width: 380px;
          margin: 0 0 34px;
        }

        .footer-form {
          display: flex;
          align-items: flex-end;
          gap: 24px;
          width: 100%;
          max-width: 420px;
          margin-bottom: 22px;
        }

        .footer-email-label {
          flex: 1;
          display: flex;
          flex-direction: column;
          font-family: ${SERIF_FONT};
          font-size: 12px;
          color: rgba(255, 255, 255, 0.85);
        }

        .footer-email-label input {
          margin-top: 10px;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.55);
          outline: none;
          color: #ffffff;
          font-family: ${SERIF_FONT};
          font-size: 14px;
          padding: 0 0 8px;
        }

        .footer-email-label input:focus {
          border-bottom-color: #ffffff;
        }

        .footer-subscribe-btn {
          flex-shrink: 0;
          background-color: #ffffff;
          color: #141414;
          border: none;
          border-radius: 2px;
          padding: 11px 26px;
          font-family: ${SERIF_FONT};
          font-size: 13px;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .footer-subscribe-btn:hover {
          opacity: 0.85;
        }

        .footer-terms {
          font-family: ${SANS_FONT};
          font-size: 11px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.75);
          max-width: 420px;
          margin: 0;
        }

        .footer-terms a {
          font-family: ${SANS_FONT};
          color: #ffffff;
          font-weight: 700;
          text-decoration: underline;
        }

        /* ------------------------- Responsive ------------------------- */
        @media (max-width: 860px) {
          .footer-inner {
  padding: 32px 20px 20px;
  min-height: 560px;
}

          .footer-heading {
            font-size: 21px;
            max-width: 100%;
          }

          .footer-desc {
            font-size: 13px;
            max-width: 100%;
          }

          .footer-form {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            max-width: 100%;
          }

          .footer-subscribe-btn {
            width: 100%;
          }

          .footer-terms {
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .footer-eyebrow {
            font-size: 11px;
            letter-spacing: 0.14em;
          }

          .footer-heading {
            font-size: 18px;
          }

          .site-footer::before {
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.55) 0%,
              rgba(0, 0, 0, 0.75) 55%,
              rgba(0, 0, 0, 0.8) 100%
            );
          }
        }
      `}</style>
    </footer>
  );
}