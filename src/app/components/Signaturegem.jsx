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
  { id: 1, image: "/home/5.png", name: "Sapphire", trait: "Audacity" },
  { id: 2, image: "/home/6.png", name: "Ruby", trait: "Magnetism" },
  { id: 3, image: "/home/7.png", name: "Topaz", trait: "Purpose" },
  { id: 4, image: "/home/8.png", name: "White Zircon", trait: "Connection" },
  { id: 5, image: "/home/9.png", name: "Peridot", trait: "Sincerity" },
  { id: 6, image: "/home/10.png", name: "Tsavorite", trait: "Sensuality" },
  { id: 7, image: "/home/11.png", name: "Amethyst", trait: "Awareness" },
  { id: 8, image: "/home/12.png", name: "Pearl", trait: "Inner Glow" },
  { id: 9, image: "/home/13.png", name: "Chrome Diopside", trait: "Bliss" },
  { id: 10, image: "/home/14.png", name: "Diamond", trait: "Laser-focus" },
  { id: 11, image: "/home/15.png", name: "Spessartine", trait: "Inspiration" },
  { id: 12, image: "/home/16.png", name: "Citrine", trait: "Opportunity" },
  { id: 13, image: "/home/17.png", name: "Lemon Quartz", trait: "Individuality" },
  { id: 14, image: "/home/18.png", name: "Smoky Quartz", trait: "Presence" },
  { id: 15, image: "/home/19.png", name: "Green Amethyst", trait: "Spontaneity" },
  { id: 16, image: "/home/20.png", name: "Garnet", trait: "Drive" },
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
          font-family: ${FONT_FAMILY};
          font-weight: 400;
          font-size: 24px;
          letter-spacing: 0.06em;
          color: #1a1a1a;
          margin: 0 0 44px;
        }

        .sg-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
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
        }

       .sg-name {
  font-family: "Times New Roman", Times, serif;
  font-weight: 600;
  font-size: 13.5px;
  color: #1a1a1a;
  margin: 0 0 4px;
  white-space: nowrap;
}

        .sg-trait {
          font-family: ${FONT_FAMILY};
          font-weight: 400;
          font-size: 11.5px;
          color: #6f6f6f;
          margin: 0;
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