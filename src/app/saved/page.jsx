"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MONT = "'Montserrat', sans-serif";

// ============================================================
// Dummy saved-items data — replace image paths with your real ones
// ============================================================
const SAVED_ITEMS = [
  {
    id: 1,
    slug: "opal-iolite-blue-topaz-earrings",
    title: "Opal & Iolite Blue Topaz Earrings",
    subtitle: "Opal & Iolite Drop Earrings - Blue Topaz & Silver Statement Earrings",
    img: "/home/1.png",
  },
  {
    id: 2,
    slug: "rustile-malachite-earrings",
    title: "Rustile Malachite Earrings",
    subtitle: "Rutilated Quartz  - Strength Meets Transformation",
   img: "/home/2.png",
  },
  {
    id: 3,
    slug: "pink-tourmaline-rhodolite-opal",
    title: "Pink Tourmaline Rhodolite opal",
    subtitle: "Pink Tourmaline & Opal Statement Earrings – Rhodolite Garnet & Rose Gold Floral Dangle Earrings",
   img: "/home/3.png",
  },
  {
    id: 4,
    slug: "rusite-garnet-earrings",
    title: "Rusite & Garnet Earrings",
    subtitle: "Golden Rutilated Quartz Earrings - A Touch of Nature's Magic",
   img: "/home/4.png",
  },
  {
    id: 5,
    slug: "opal-iolite-blue-topaz-earrings-2",
    title: "Opal & Iolite Blue Topaz Earrings",
    subtitle: "Opal & Iolite Drop Earrings - Blue Topaz & Silver Statement Earrings",
    img: "/home/1.png",
  },
  {
    id: 6,
    slug: "rustile-malachite-earrings-2",
    title: "Rustile Malachite Earrings",
    subtitle: "Rutilated Quartz  - Strength Meets Transformation",
    img: "/home/2.png",
  },
  {
    id: 7,
    slug: "pink-tourmaline-rhodolite-opal-2",
    title: "Pink Tourmaline Rhodolite opal",
    subtitle: "Pink Tourmaline & Opal Statement Earrings – Rhodolite Garnet & Rose Gold Floral Dangle Earrings",
   img: "/home/3.png",
  },
  {
    id: 8,
    slug: "rusite-garnet-earrings-2",
    title: "Rusite & Garnet Earrings",
    subtitle: "Golden Rutilated Quartz Earrings - A Touch of Nature's Magic",
   img: "/home/4.png",
  },
];

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path
        d="M12 20.5s-7.5-4.6-10-9.2C0.5 8 1.8 4.5 5.2 3.6c2.1-0.55 4.2 0.3 5.4 2.1a1 1 0 0 0 1.6 0c1.2-1.8 3.3-2.65 5.4-2.1 3.4 0.9 4.7 4.4 3.2 7.7-2.5 4.6-10 9.2-10 9.2Z"
        fill={filled ? "#1B807F" : "none"}
        stroke="#1B807F"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export default function SavedPage() {
  const [saved, setSaved] = useState(
    SAVED_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
  );

  function toggleSave(id) {
    setSaved((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const visibleItems = SAVED_ITEMS.filter((item) => saved[item.id]);

  return (
    <main className="sv-page" style={{ fontFamily: MONT }}>
      <h1 className="sv-heading">SAVED</h1>

      {visibleItems.length === 0 ? (
        <p className="sv-empty">No saved items yet.</p>
      ) : (
        <div className="sv-grid">
          {visibleItems.map((item) => (
            <div key={item.id} className="sv-card">
              <button
                type="button"
                className="sv-heart"
                onClick={() => toggleSave(item.id)}
                aria-label="Remove from saved"
              >
                <HeartIcon filled={saved[item.id]} />
              </button>

              <Link href={`/product/${item.slug}`} className="sv-link">
                <div className="sv-img-wrap">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="sv-img"
                  />
                </div>
                <h3 className="sv-title">{item.title}</h3>
                <p className="sv-subtitle">{item.subtitle}</p>
              </Link>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

        .sv-page {
          background: #ffffff;
          color: #141414;
          min-height: 100vh;
          padding: 40px 32px 100px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .sv-heading {
          text-align: center;
          font-family: "Montserrat", sans-serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.08em;
          margin: 0 0 40px;
          margin-top: 60px;
        }
        .sv-empty {
          text-align: center;
          color: #6b6b6b;
          font-size: 14px;
          padding: 60px 0;
        }
        .sv-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px 24px;
        }
        .sv-card {
          position: relative;
        }
        .sv-heart {
          position: absolute;
          top: 8px;
          right: 8px;
          z-index: 2;
          width: 32px;
          height: 32px;
          border: none;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sv-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .sv-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          background: #f5f5f5;
          overflow: hidden;
        }
        .sv-img {
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .sv-card:hover .sv-img {
          transform: scale(1.04);
        }
        .sv-title {
          font-family: "Times New Roman", Times, serif;
          font-size: 14.5px;
          font-weight: 700;
          text-align: center;
          margin: 16px 0 6px;
        }
        .sv-subtitle {
          font-size: 12px;
          color: #6b6b6b;
          text-align: center;
          line-height: 1.5;
          margin: 0;
          max-width: 220px;
          margin-left: auto;
          margin-right: auto;
        }

        /* ---------- TABLET ---------- */
        @media (max-width: 1024px) {
          .sv-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* ---------- MOBILE ---------- */
        @media (max-width: 640px) {
          .sv-page {
            padding: 28px 16px 60px;
          }
          .sv-heading {
            font-size: 16px;
            margin-bottom: 24px;
          }
          .sv-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px 14px;
          }
          .sv-title {
            font-size: 12.5px;
            margin: 10px 0 4px;
          }
          .sv-subtitle {
            font-size: 10.5px;
          }
          .sv-heart {
            width: 26px;
            height: 26px;
          }
        }
      `}</style>
    </main>
  );
}