"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
/**
 * Footer.jsx
 * -----------------------------------------------------------------
 * Passione Jewelry jaisa footer.
 *  - BG color: #276152, font: Montserrat
 *  - Top: logo.png (center)
 *  - Border line
 *  - Columns: desktop par sab links dikhte hain, mobile par sirf
 *    heading dikhta hai aur tap karne par accordion khulta hai
 *  - Border line
 *  - Bottom row: copyright (left) - logo2.png (center) - socials (right)
 *  - Border line
 *  - Payment methods text
 *
 * Images public folder se aani chahiye:
 *   frontend/public/logo.png
 *   frontend/public/logo2.png
 * (Next.js mai public folder ke andar files "/logo.png" path se access
 *  hoti hain, isliye src="/logo.png" use kiya hai.)
 *
 * Font: Montserrat ko app/layout.jsx mai next/font se load karo aur
 * body/html par apply karo, ya neeche di gayi @import wali line use
 * kar lo (dono options neeche notes mai diye hain).
 *
 * Usage:
 *   import Footer from "@/components/Footer";
 *   <Footer />
 * -----------------------------------------------------------------
 */

const footerColumns = [
  {
    title: "FEATURED",
    links: ["NEW ARRIVALS", "BESTSELLERS"],

  },
//   {
//   title: "COMPANY",
//   links: [
//     "OUR STORY",
//     "HAPPY CUSTOMER'S",
//   ],
// },
  {
    title: "TYPE",
    links: ["RINGS", "EARRINGS", "PENDANTS", "NECKLACES", "BRACELETS", "SHOP ALL"],
  },
  {
    title: "COLLECTION",
    links: ["ARTIFACT NEW", "MESH", "RAW", "SINGULAR EDITION", "GOLD", "ELEMENTAL"],
  },
  {
    title: "STYLE",
    links: ["MEN'S", "CASUAL", "STATEMENT", "FRIENDSHIP"],
  },
  {
    title: "CUSTOMER CARE",
    links: [
      "TRACK MY ORDER",
      "RETURNS & EXCHANGES",
      "SIZING GUIDE",
      "CARE INSTRUCTIONS",
      "FAQ",
      "CONTACT US",
      "CUSTOMER REVIEW"
    ],
  },
  {
    title: "LEGAL",
    links: [
      "PRIVACY POLICY",
      "TERMS & CONDITIONS",
      "ACCESSIBILITY ",
      "STATEMENT",
      "PRODUCT SAFETY",
      "YOUR PRIVACY CHOICES",
    ],
  },
];

export default function Footer() {
  // Mobile accordion: kaunsa column khula hai (index), null = sab band
  const [openIndex, setOpenIndex] = useState(null);

  const toggleColumn = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* ---- Top logo ---- */}
        <div className="footer-logo-row">
          <Image
            src="/logo3.png"
            alt="Passione Jewelry"
            width={320}
            height={30}
            className="footer-logo"
            priority={false}
          />
        </div>

        <div className="footer-divider" />

        {/* ---- Columns ---- */}
        <div className="footer-columns">
          {footerColumns.map((col, i) => (
            <div className={`footer-col ${openIndex === i ? "is-open" : ""}`} key={col.title}>
              <button
                type="button"
                className="footer-col-heading"
                onClick={() => toggleColumn(i)}
                aria-expanded={openIndex === i}
              >
                {col.title}
                <span className="footer-col-chevron" aria-hidden="true">
                  +
                </span>
              </button>

             <div className="footer-col-body">
  <ul className="footer-col-links">
    {col.links.map((link) => (
      <li key={link}>
        <Link
          href={
            link === "OUR STORY"
              ? "/about"
              : link === "HAPPY CUSTOMER'S"
              ? "/reviewssection"

              // TYPE
              : link === "RINGS"
              ? "/shop-by/rings"
              : link === "EARRINGS"
              ? "/shop-by/earrings"
              : link === "PENDANTS"
              ? "/shop-by/pendants"
              : link === "NECKLACES"
              ? "#"
              : link === "BRACELETS"
              ? "#"
              : link === "SHOP ALL"
              ? "/shop-by/shop-all"

              // FEATURED
              : link === "NEW ARRIVALS"
              ? "/shop-by/new-arrivals"
              : link === "BESTSELLERS"
              ? "/shop-by/bestsellers"

              // COLLECTION
              : link === "ARTIFACT NEW"
              ? "#"
              : link === "MESH"
              ? "#"
              : link === "RAW"
              ? "#"
              : link === "SINGULAR EDITION"
              ? "#"
              : link === "GOLD"
              ? "#"
              : link === "ELEMENTAL"
              ? "#"

              // STYLE
              : link === "MEN'S"
              ? "#"
              : link === "CASUAL"
              ? "#"
              : link === "STATEMENT"
              ? "#"
              : link === "FRIENDSHIP"
              ? "#"

              // CUSTOMER CARE
              : link === "TRACK MY ORDER"
              ? "#"
              : link === "RETURNS & EXCHANGES"
              ? "#"
              : link === "SIZING GUIDE"
              ? "#"
              : link === "CARE INSTRUCTIONS"
              ? "#"
              : link === "FAQ"
              ? "/faq"
              : link === "CONTACT US"
              ? "/contact"
               : link === "CUSTOMER REVIEW"
              ? "/reviewssection"

              // LEGAL
              : link === "PRIVACY POLICY"
              ? "#"
              : link === "TERMS & CONDITIONS"
              ? "#"
              : link === "ACCESSIBILITY STATEMENT"
              ? "#"
              : link === "PRODUCT SAFETY"
              ? "#"
              : link === "YOUR PRIVACY CHOICES"
              ? "#"

              : "#"
          }
        >
          {link}
        </Link>
      </li>
    ))}
  </ul>
</div>
            </div>
          ))}
        </div>

        <div className="footer-divider" />

        {/* ---- Bottom row ---- */}
        <div className="footer-bottom-row">
          <p className="footer-copyright">
            &copy; 2026 PASSIONE JEWELRY CO., LTD. &mdash; BANGKOK, THAILAND
          </p>

          <div className="footer-logo2">
            <Image src="/logo2.png" alt="Passione Jewelry" width={40} height={40} />
          </div>

          <div className="footer-socials">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Etsy</a>
          </div>
        </div>

        <div className="footer-divider" />

        {/* ---- Payment methods ---- */}
        <p className="footer-payments">VISA | MC | AMEX | PAYPAL | APPLE PAY</p>
     <p className="footer-crafted">
  Crafted by{" "}
  <a
    href="https://www.kontentkraftdigital.com/"
    target="_blank"
    rel="noopener noreferrer"
  >
    Kontent Kraft Digital
  </a>
</p>
      </div>

      <style jsx>{`
        .site-footer {
          background-color: #1B807F;
          color: #f4f4f2;
          font-family: "Montserrat", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .footer-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 32px 24px;
        }

        .footer-divider {
          height: 1px;
          background-color:#B4AA8F;
          width: 100%;
        }

        /* ---------------- Logo row ---------------- */
        .footer-logo-row {
          display: flex;
          justify-content: center;
          padding-bottom: 28px;
        }
        .footer-logo {
          height: auto;
          width: auto;
          max-height: 46px;
          object-fit: contain;
        }

        /* ---------------- Columns ---------------- */
       .footer-columns {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  padding: 32px 0;
}

        .footer-col-heading {
          all: unset;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          cursor: default;
          color: #f4f4f2;
        }

        .footer-col-chevron {
          display: none;
        }

        .footer-col-body {
          margin-top: 5px;
        }

        .footer-col-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
         
        }

        .footer-col-links :global(a) {
          font-size: 11.5px;
          letter-spacing: 0.03em;
          color: rgba(244, 244, 242, 0.85);
          text-decoration: none;
          transition: opacity 0.3s ease;
        }
        .footer-col-links :global(a:hover) {
          opacity: 0.65;
          text-decoration: underline;
        }

        /* ---------------- Bottom row ---------------- */
        .footer-bottom-row {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 22px 0;
          gap: 16px;
        }

        .footer-copyright {
          font-size: 11px;
          letter-spacing: 0.02em;
          color: rgba(244, 244, 242, 0.85);
          margin: 0;
          text-align: left;
        }

        .footer-logo2 {
          display: flex;
          justify-content: center;
        }
        .footer-logo2 :global(img) {
          height: 36px;
          width: auto;
          object-fit: contain;
        }

        .footer-socials {
          display: flex;
          justify-content: flex-end;
          gap: 22px;
        }
        .footer-socials a {
          font-size: 11px;
          letter-spacing: 0.03em;
          color: rgba(244, 244, 242, 0.85);
          text-decoration: none;
          transition: opacity 0.3s ease;
        }
        .footer-socials a:hover {
          opacity: 0.65;
        }

        /* ---------------- Payments ---------------- */
        .footer-payments {
          text-align: center;
          font-size: 10.5px;
          letter-spacing: 0.04em;
          color: rgba(244, 244, 242, 0.75);
          margin: 0;
          padding-top: 18px;
        }

    .footer-crafted {
  margin-top: 14px;
  text-align: center;
  font-size: 12px;
  color: rgba(244, 244, 242, 0.9);
}

.footer-crafted a {
  color: #FFFBF1;
  font-weight: 700;
  text-decoration: none;
}

.footer-crafted a:hover {
  text-decoration: underline;
}
        /* =====================================================
           MOBILE: sirf heading dikhega, tap karke accordion khulega
           ===================================================== */
        @media (max-width: 860px) {
          .footer-inner {
            padding: 32px 20px 20px;
          }

          .footer-columns {
            grid-template-columns: 1fr;
            gap: 0;
            padding: 8px 0;
          }

          .footer-col {
            border-bottom: 1px solid rgba(244, 244, 242, 0.15);
          }
          .footer-col:first-child {
            border-top: 1px solid rgba(244, 244, 242, 0.15);
          }

          .footer-col-heading {
            cursor: pointer;
            width: 100%;
            padding: 16px 4px;
          }

          .footer-col-chevron {
            display: inline-block;
            font-size: 16px;
            font-weight: 300;
            transition: transform 0.3s ease;
            line-height: 1;
          }

          .footer-col.is-open .footer-col-chevron {
            transform: rotate(45deg);
          }

          .footer-col-body {
            display: grid;
            grid-template-rows: 0fr;
            overflow: hidden;
            margin-top: 0;
            transition: grid-template-rows 0.35s ease;
          }
          .footer-col-body > .footer-col-links {
            overflow: hidden;
            min-height: 0;
          }
          .footer-col.is-open .footer-col-body {
            grid-template-rows: 1fr;
          }
          .footer-col.is-open .footer-col-links {
            padding-bottom: 16px;
          }

          .footer-bottom-row {
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
            gap: 14px;
          }
          .footer-copyright {
            text-align: center;
            order: 2;
          }
          .footer-logo2 {
            order: 1;
          }
          .footer-socials {
            order: 3;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .footer-socials {
            gap: 16px;
          }
          .footer-payments {
            font-size: 10px;
          }
        }
      `}</style>
    </footer>
  );
}