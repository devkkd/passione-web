"use client";

import Image from "next/image";

/**
 * SignatureGem.jsx
 * -----------------------------------------------------------------
 * "YOUR SIGNATURE POWER GEM" grid section.
 *
 * - Desktop: 8 columns (2 rows of 8, matches the screenshot exactly).
 * - Mobile (<=768px): 4 columns (4 rows of 4).
 * - Images come from /public/home/5.png ... /public/home/20.png
 *   (16 gems total, mapped 1:1 to the screenshot).
 * - Font: Montserrat throughout.
 * - The round grey "T" circle in the screenshot is a Figma comment
 *   bubble, not part of the design -- intentionally left out here.
 *
 * Usage (Next.js, app or pages router):
 *   import SignatureGem from "@/components/SignatureGem";
 *   ...
 *   <SignatureGem />
 *
 * You can also pass your own list:
 *   <SignatureGem gems={myGems} />
 * where each gem is: { id, image, name, trait }
 * -----------------------------------------------------------------
 */

const FONT_FAMILY = '"Montserrat", "Helvetica Neue", Arial, sans-serif';

const DEFAULT_GEMS = [
  { id: 1, image: "/gem/1.png", name: "Citrine", },
  { id: 2, image: "/gem/2.png", name: "Smoky", },
  { id: 3, image: "/gem/3.png", name: "Blue Topaz", },
  { id: 4, image: "/gem/4.png", name: "Tourmaline", },
  { id: 5, image: "/gem/5.png", name: "Opal", },
  { id: 6, image: "/gem/6.png", name: "Garnet", },
  { id: 7, image: "/gem/7.png", name: "Green Amethyst", },

  { id: 8, image: "/gem/8.png", name: "Peridot", },
  { id: 9, image: "/gem/9.png", name: "Tsavorite", },
  { id: 10, image: "/gem/10.png", name: "Pearl", },
  { id: 11, image: "/gem/11.png", name: "Lemon Quartz", },
  { id: 12, image: "/gem/12.png", name: "Rhodolite", },
  { id: 13, image: "/gem/13.png", name: "Iolite", },
  { id: 14, image: "/gem/14.png", name: "Sapphire", },
];

export default function SignatureGem({ gems = DEFAULT_GEMS, title = "YOUR SIGNATURE POWER GEM" }) {
  return (
    <section className="signature-gem" style={{ fontFamily: FONT_FAMILY }}>
      <div className="sg-inner">
        <h2 className="sg-title">{title}</h2>

        <div className="sg-grid">
          {gems.map((gem) => (
            <div className="sg-item" key={gem.id}>
              <div className="sg-image-wrap">
                <Image
                  src={gem.image}
                  alt={gem.name}
                  fill
                  sizes="(max-width: 768px) 22vw, 11vw"
                  className="sg-image"
                />
              </div>
              <h3 className="sg-name">{gem.name}</h3>
              <p className="sg-trait">{gem.trait}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .signature-gem {
          width: 100%;
          background: #ffffff;
          padding: 56px 0 48px;
        }

        .sg-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .sg-title {
          text-align: center;
            font-family: "Montserrat", sans-serif;
          font-weight: 300;
          font-size: 22px;
          letter-spacing: 0.06em;
          color: #1a1a1a;
          margin: 0 0 44px;
        }

        .sg-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          row-gap: 40px;
          column-gap: 16px;
        }

        .sg-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .sg-image-wrap {
          position: relative;
          width: 68px;
          aspect-ratio: 1 / 1;
          margin-bottom: 14px;
        }

      .sg-image {
  object-fit: contain;
  transition: transform 0.4s ease;
}

      .sg-name {
  font-family: "Times New Roman", Times, serif;
  font-weight: 600;
  font-size: 13.5px;
  color: #1a1a1a;
  margin: 0 0 4px;
  white-space: nowrap;
  transition: color 0.35s ease;
}

        .sg-trait {
  font-family: ${FONT_FAMILY};
  font-weight: 400;
  font-size: 11.5px;
  color: #6f6f6f;
  margin: 0;
  transition: color 0.35s ease;
}
.sg-item:hover .sg-image {
  transform: scale(1.5);
}

.sg-item:hover .sg-name {
  color: #8B6A3E;
}

.sg-item:hover .sg-trait {
  color: #444;
}

@media (hover: hover) {
  .sg-item:hover {
    transform: translateY(-4px);
  }
}
        /* ------------------------- Responsive ------------------------- */
        @media (max-width: 768px) {
          .sg-inner {
            padding: 0 20px;
          }

          .signature-gem {
            padding: 40px 0 36px;
          }

          .sg-title {
            font-size: 18px;
            margin-bottom: 30px;
          }

          .sg-grid {
            grid-template-columns: repeat(4, 1fr);
            row-gap: 28px;
            column-gap: 10px;
          }

          .sg-image-wrap {
            width: 56px;
          }

          .sg-name {
            font-size: 12px;
            white-space: normal;
          }

          .sg-trait {
            font-size: 10.5px;
          }
        }

        @media (max-width: 380px) {
          .sg-image-wrap {
            width: 48px;
          }

          .sg-name {
            font-size: 11px;
          }

          .sg-trait {
            font-size: 10px;
          }
        }
      `}</style>
    </section>
  );
}