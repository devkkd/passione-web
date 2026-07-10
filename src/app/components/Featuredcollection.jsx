"use client";

import Image from "next/image";

/**
 * FeaturedCollection.jsx
 * -----------------------------------------------------------------
 * "FEATURED COLLECTION" category grid section.
 *
 * - Desktop: 4 cards in a single row.
 * - Mobile (<=768px): 2 cards per row (2x2 grid).
 * - Images come from /public/home/22.png ... /public/home/25.png,
 *   mapped 1:1 to the screenshot (Rings, Pendants, Bangles, Earrings).
 * - Font: Montserrat throughout.
 * - The round grey "T" circle in the screenshot is a Figma comment
 *   bubble, not part of the design -- intentionally left out here.
 *
 * Usage (Next.js, app or pages router):
 *   import FeaturedCollection from "@/components/FeaturedCollection";
 *   ...
 *   <FeaturedCollection />
 *
 * You can also pass your own list:
 *   <FeaturedCollection categories={myCategories} />
 * where each category is: { id, image, label, href }
 * -----------------------------------------------------------------
 */

const FONT_FAMILY = '"Montserrat", "Helvetica Neue", Arial, sans-serif';

const DEFAULT_CATEGORIES = [
  { id: 1, image: "/home/28.png", label: "Rings", href: "/rings" },
  { id: 2, image: "/home/29.png", label: "Pendants", href: "/pendants" },
  { id: 3, image: "/home/30.png", label: "Bangles", href: "/bangles" },
  { id: 4, image: "/home/31.png", label: "Earrings", href: "/earrings" },
];

export default function FeaturedCollection({
  categories = DEFAULT_CATEGORIES,
  title = "FEATURED COLLECTION",
}) {
  return (
    <section className="featured-collection" style={{ fontFamily: FONT_FAMILY }}>
      <div className="fc-inner">
        <h2 className="fc-title">{title}</h2>

        <div className="fc-grid">
          {categories.map((cat) => (
            <a href={cat.href} className="fc-card" key={cat.id}>
              <div className="fc-image-wrap">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 768px) 45vw, 22vw"
                  className="fc-image"
                />
              </div>
              <p className="fc-label">{cat.label}</p>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .featured-collection {
          width: 100%;
          background: #ffffff;
          padding: 56px 0 48px;
        }

        .fc-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .fc-title {
          text-align: center;
          font-family: ${FONT_FAMILY};
          font-weight: 400;
          font-size: 22px;
          letter-spacing: 0.06em;
          color: #1a1a1a;
          margin: 0 0 40px;
        }

        .fc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .fc-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
        }

        .fc-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 18px;
          background: #f2f2f2;
        }

        .fc-image {
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .fc-card:hover .fc-image {
          transform: scale(1.04);
        }

        .fc-label {
          font-family: ${FONT_FAMILY};
          font-weight: 400;
          font-size: 16px;
          letter-spacing: 0.02em;
          color: #1a1a1a;
          margin: 0;
        }

        /* ------------------------- Responsive ------------------------- */
        @media (max-width: 768px) {
          .fc-inner {
            padding: 0 20px;
          }

          .featured-collection {
            padding: 40px 0 36px;
          }

          .fc-title {
            font-size: 18px;
            margin-bottom: 28px;
          }

          .fc-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px 14px;
          }

          .fc-image-wrap {
            margin-bottom: 12px;
          }

          .fc-label {
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}