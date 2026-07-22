"use client";

/**
 * BestSellingDesigns.jsx
 * -----------------------------------------------------------------
 * "Best Selling Designs" full-width background banner section.
 *
 * - Full viewport width background image: /public/home/21.png
 * - A soft dark gradient (bottom-heavy) sits on top of the image so
 *   the centered text at the bottom always stays readable, exactly
 *   like the reference screenshot.
 * - Fonts:
 *     - "Best Selling Designs" heading -> Montserrat (bold)
 *     - Everything else (description + "SHOP NOW") -> Times New Roman
 * - Fully responsive: scales height/type down on mobile while
 *   keeping the same look and layout.
 *
 * Usage (Next.js, app or pages router):
 *   import BestSellingDesigns from "@/components/BestSellingDesigns";
 *   ...
 *   <BestSellingDesigns />
 */

const SANS_FONT = '"Montserrat", "Helvetica Neue", Arial, sans-serif';
const SERIF_FONT = '"Times New Roman", Times, serif';

export default function BestSellingDesigns({
  heading = "Best Selling Designs",
  description = "A curated selection of our most coveted creations, celebrated for their distinctive gemstones, refined craftsmanship and timeless elegance.",
  ctaLabel = "SHOP NOW",
  ctaHref = "/shop-by/bestsellers",
}) {
  return (
    <section className="best-selling">
      <a href={ctaHref} className="bs-content-link">
        <div className="bs-content">
          <h2 className="bs-heading">{heading}</h2>
          <p className="bs-desc">{description}</p>
          <span className="bs-cta">{ctaLabel}</span>
        </div>
      </a>

      <style jsx>{`
        .best-selling {
          position: relative;
          width: 100%;
          min-height: 480px;
          background-image: url("/home/21.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          isolation: isolate;
        }

        /* Bottom-heavy gradient so the text always stays legible on
           top of the photo, no matter how bright/dark it is. */
        .best-selling::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.05) 45%,
            rgba(0, 0, 0, 0.45) 75%,
            rgba(0, 0, 0, 0.6) 100%
          );
          z-index: 0;
        }

        .bs-content-link {
          position: relative;
          z-index: 1;
          text-decoration: none;
          display: block;
          width: 100%;
        }

       .bs-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px 48px;
  text-align: center;
}

        .bs-heading {
          font-family: ${SANS_FONT};
          font-weight: 600;
          font-size: 30px;
          letter-spacing: 0.01em;
          color: #ffffff;
          margin: 0 0 14px;
        }
.bs-desc {
  font-family: "Times New Roman", sans serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.6;
  letter-spacing: 0.03em;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 auto 18px;
  text-align: center;
  width: fit-content;
  max-width: 100%;
  white-space: nowrap;
}

        .bs-cta {
          display: inline-block;
          font-family: ${SERIF_FONT};
          font-size: 15px;
          letter-spacing: 0.12em;
          color: #ffffff;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.85);
          transition: opacity 0.3s ease;
        }

        .bs-content-link:hover .bs-cta {
          opacity: 0.75;
        }

        /* ------------------------- Responsive ------------------------- */
        @media (max-width: 860px) {
          .best-selling {
            min-height: 420px;
          }

          .bs-content {
            padding: 0 20px 36px;
          }

          .bs-heading {
            font-size: 26px;
          }

            .bs-desc {
    font-size: 13px;
    white-space: normal;
    max-width: 100%;
    text-align: center;
    margin: 0 auto 18px;
  }

        }

        @media (max-width: 480px) {
          .best-selling {
            min-height: 360px;
          }

          .bs-content {
            padding: 0 20px 28px;
          }

          .bs-heading {
            font-size: 21px;
            margin-bottom: 10px;
          }

          .bs-desc {
  font-size: 12px;
  margin: 0 auto 14px;
  white-space: normal;
  max-width: 100%;
  text-align: center;
}

          .bs-cta {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  );
}