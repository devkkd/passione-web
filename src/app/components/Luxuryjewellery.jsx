"use client";

/**
 * LuxuryJewellery.jsx
 * -----------------------------------------------------------------
 * "Luxury Jewellery Designed for Every Occasion" hero banner section.
 *
 * - Full viewport width background image: /public/home/26.png
 * - A left-to-right dark gradient sits on top of the image so the
 *   left-aligned text always stays readable, exactly like the
 *   reference screenshot.
 * - Font: Times New Roman throughout (heading, description, link).
 * - "Explore the Collection" is a real working link (pass your own
 *   href via the `href` prop).
 * - Side margins match the rest of the site exactly:
 *     Desktop: 32px left/right
 *     Mobile:  20px left/right
 * - The little grey "T" + profile-photo bubble in the screenshot is
 *   a Figma comment, not part of the design -- intentionally left
 *   out here.
 *
 * Usage (Next.js, app or pages router):
 *   import LuxuryJewellery from "@/components/LuxuryJewellery";
 *   ...
 *   <LuxuryJewellery href="/collections" />
 * -----------------------------------------------------------------
 */

const SERIF_FONT = '"Times New Roman", Times, serif';

export default function LuxuryJewellery({
  heading = "Luxury Jewellery Designed for Every Occasion",
  description = "Description: From everyday sophistication to unforgettable celebrations, explore refined jewellery that embodies grace, brilliance, and impeccable craftsmanship.",
  ctaLabel = "Explore the Collection",
  href = "/collections",
}) {
  return (
    <section className="luxury-jewellery" style={{ fontFamily: SERIF_FONT }}>
      <div className="lj-inner">
        <h2 className="lj-heading">{heading}</h2>
        <p className="lj-desc">{description}</p>
        <a href={href} className="lj-cta">
          {ctaLabel} <span aria-hidden="true">→</span>
        </a>
      </div>

      <style jsx>{`
        .luxury-jewellery {
          position: relative;
          width: 100%;
          min-height: 480px;
          background-image: url("/home/26.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          isolation: isolate;
        }

        .luxury-jewellery::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.55) 0%,
            rgba(0, 0, 0, 0.4) 30%,
            rgba(0, 0, 0, 0.1) 55%,
            rgba(0, 0, 0, 0) 70%
          );
          z-index: 0;
        }

        .lj-inner {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          padding: 0 32px;
        }

        .lj-heading {
          font-family: ${SERIF_FONT};
          font-weight: 700;
          font-size: 32px;
          line-height: 1.65;
          color: #ffffff;
          max-width: 340px;
          margin: 0 0 20px;
        }

        .lj-desc {
          font-family: ${SERIF_FONT};
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          max-width: 360px;
          margin: 0 0 26px;
        }

        .lj-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: ${SERIF_FONT};
          font-size: 13px;
          color: #ffffff;
          text-decoration: none;
          padding-bottom: 5px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.85);
          transition: opacity 0.3s ease;
        }

        .lj-cta:hover {
          opacity: 0.7;
        }

        /* ------------------------- Responsive ------------------------- */
        @media (max-width: 860px) {
          .luxury-jewellery {
            min-height: 420px;
          }

          .lj-inner {
            padding: 0 20px;
          }

          .lj-heading {
            font-size: 26px;
            max-width: 320px;
          }

          .lj-desc {
            font-size: 12.5px;
            max-width: 300px;
          }
        }

        @media (max-width: 480px) {
          .luxury-jewellery {
            min-height: 380px;
          }

          .lj-heading {
            font-size: 21px;
            max-width: 260px;
            margin-bottom: 14px;
          }

          .lj-desc {
            font-size: 12px;
            max-width: 240px;
            margin-bottom: 18px;
          }

          .lj-cta {
            font-size: 12px;
          }

          .luxury-jewellery::before {
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.15) 0%,
              rgba(0, 0, 0, 0.55) 55%,
              rgba(0, 0, 0, 0.7) 100%
            );
          }
        }
      `}</style>
    </section>
  );
}