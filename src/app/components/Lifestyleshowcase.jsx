"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * LifestyleShowcase.jsx
 * -----------------------------------------------------------------
 * Split "lifestyle photo + product grid" section.
 *
 * - Desktop: left half (50%) is the lifestyle image, right half (50%)
 *   is a 2x2 product grid, with a visible gap between the two halves.
 * - Mobile: image stacks on top (full width), 2x2 product grid
 *   (2 cards, then 2 cards) stacks below it.
 * - Left image: /public/home/27.png
 * - Product images: /public/home/1.png ... /public/home/4.png
 *   (same 4 products as the New Arrivals section).
 * - Wishlist heart buttons are functional (toggle liked state).
 * - Font: Montserrat throughout.
 * - The round grey "T" comment bubble on the image in the screenshot
 *   is a Figma comment, not part of the design -- intentionally left
 *   out here.
 *
 * Usage (Next.js, app or pages router):
 *   import LifestyleShowcase from "@/components/LifestyleShowcase";
 *   ...
 *   <LifestyleShowcase />
 *
 * You can also pass your own products:
 *   <LifestyleShowcase products={myProducts} />
 * where each product is: { id, image, title, subtitle }
 * -----------------------------------------------------------------
 */

const FONT_FAMILY = '"Montserrat", "Helvetica Neue", Arial, sans-serif';

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    image: "/home/1.png",
    title: "Opal & Iolite Blue Topaz Earrings",
    subtitle: "Opal & Iolite Drop Earrings - Blue Topaz & Silver Statement Earrings",
  },
  {
    id: 2,
    image: "/home/2.png",
    title: "Rustile Malachite Earrings",
    subtitle: "Rutilated Quartz  - Strength Meets Transformation",
  },
  {
    id: 3,
    image: "/home/3.png",
    title: "Pink Tourmaline Rhodolite opal",
    subtitle:
      "Pink Tourmaline & Opal Statement Earrings – Rhodolite Garnet & Rose Gold Floral Dangle Earrings",
  },
  {
    id: 4,
    image: "/home/4.png",
    title: "Rusite & Garnet Earrings",
    subtitle: "Golden Rutilated Quartz Earrings - A Touch of Nature's Magic",
  },
];

export default function LifestyleShowcase({
  image = "/home/35.png",
  imageAlt = "Passione ring worn on hand",
  products = DEFAULT_PRODUCTS,
}) {
  const [liked, setLiked] = useState({});

  function toggleLike(id) {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section className="lifestyle-showcase" style={{ fontFamily: FONT_FAMILY }}>
      <div className="ls-image-wrap">
        <Image src={image} alt={imageAlt} fill sizes="(max-width: 860px) 100vw, 50vw" className="ls-image" />
      </div>

      <div className="ls-grid">
        {products.map((p) => (
          <div className="ls-card" key={p.id}>
            <div className="ls-card-top">
              <button
                type="button"
                className={`ls-heart ${liked[p.id] ? "is-liked" : ""}`}
                aria-label={liked[p.id] ? "Remove from wishlist" : "Add to wishlist"}
                onClick={() => toggleLike(p.id)}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={liked[p.id] ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 20.5s-7.5-4.7-9.8-9.1C.6 7.8 2.4 4.5 5.7 4c2-.3 3.7.7 6.3 3 2.6-2.3 4.3-3.3 6.3-3 3.3.5 5.1 3.8 3.5 7.4C19.5 15.8 12 20.5 12 20.5z" />
                </svg>
              </button>
            </div>

            <div className="ls-image-inner-wrap">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 860px) 40vw, 20vw"
                className="ls-product-image"
              />
            </div>

            <h3 className="ls-title">{p.title}</h3>
            <p className="ls-subtitle">{p.subtitle}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
    .lifestyle-showcase {
  width: 100%;
  display: flex;
  align-items: stretch;
  gap: 64px;
  background: #ffffff;
  padding: 70px;
  box-sizing: border-box;
}

     .ls-image-wrap {
  position: relative;
  width: 50%;
  min-height: 420px;
}

        .ls-image {
          object-fit: cover;
        }

     .ls-grid {
  width: 50%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
    gap: 24px 24px;
  padding: 0;
  align-content: start;
}

        .ls-card {
          display: flex;
          flex-direction: column;
        }

        .ls-card-top {
          display: flex;
          justify-content: flex-end;
        margin-bottom: 6px;
        }

        .ls-heart {
          background: transparent;
          border: none;
          cursor: pointer;
          color: #1a1a1a;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .ls-heart:hover {
          transform: scale(1.1);
        }
        .ls-heart.is-liked {
          color: #c0392b;
        }

       .ls-image-inner-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 0.78;
  margin-bottom: 12px;
}

        .ls-product-image {
          object-fit: contain;
        }

        .ls-title {
          font-family: ${FONT_FAMILY};
          font-weight: 600;
          font-size: 15px;
          text-align: center;
          color: #1a1a1a;
          margin: 0 0 6px;
        }

        .ls-subtitle {
          font-family: ${FONT_FAMILY};
          font-weight: 400;
          font-size: 12.5px;
          line-height: 1.55;
          text-align: center;
          color: #6f6f6f;
          margin: 0;
        }

        /* ------------------------- Responsive ------------------------- */
      @media (max-width: 860px) {
  .lifestyle-showcase {
    flex-direction: column;
    gap: 24px;

    /* Same spacing as website */
     padding: 10px 20px 50px;
    box-sizing: border-box;
  }

  .ls-image-wrap {
    width: 100%;
    min-height: 320px;
  }

  .ls-grid {
    width: 100%;
    padding: 0;
    gap: 28px 16px;
  }

  .ls-title {
    font-size: 13px;
  }

  .ls-subtitle {
    font-size: 11.5px;
  }
}
      `}</style>
    </section>
  );
}