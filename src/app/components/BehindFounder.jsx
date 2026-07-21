// components/BehindFounder.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { Ephesis } from "next/font/google";

const ephesis = Ephesis({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function BehindFounder() {
  return (
    <section className="bf-root">
      <div className="bf-container">
        {/* ---------------- LEFT COLUMN ---------------- */}
        <div className="bf-left">
          <p className="bf-label">BEHIND PASSIONE GIOIELLI</p>

          <h2 className="bf-heading">
            Designed with emotion,
            <br />
            Crafted with intention
          </h2>

          <p className="bf-desc">
            From everyday sophistication to unforgettable celebrations,
            explore refined jewellery that embodies grace, brilliance, and
            impeccable craftsmanship.
          </p>

         <Link
  href="/about"
  style={{
    display: "inline-block",
    fontSize: "14px",
    color: "#1a1a1a",
    textDecoration: "none",
    borderBottom: "1px solid #1a1a1a",
    paddingBottom: "4px",
    width: "fit-content",
    marginBottom: "48px",
    transition: "all 0.3s ease",
  }}
>
  See About us <span style={{ marginLeft: "2px" }}>→</span>
</Link>

          <div className="bf-sketch-wrap">
            <Image
              src="/home/34.png"
              alt="Jewellery sketches"
              width={400}
              height={340}
              className="bf-sketch-img"
            />
          </div>
        </div>

        {/* ---------------- RIGHT COLUMN ---------------- */}
        <div className="bf-right">
          <div className="bf-photo-wrap">
            <Image
              src="/home/32.png"
              alt="Mukesh Khanchandani crafting jewellery"
              fill
              className="bf-photo-main"
              priority
            />

            <div className="bf-caption-box">
              <p className="bf-caption-line">Designer &amp; Founder</p>
              <p className="bf-caption-line">Passione Gioielli</p>
            </div>

            {/* <div className="bf-photo-small-wrap">
              <Image
                src="/home/33.png"
                alt="Passione Gioielli craftsmanship detail"
                fill
                className="bf-photo-small"
              />
            </div> */}
          </div>

          <p className={`bf-signature ${ephesis.className}`}>
            Mukesh Khanchandani
          </p>
        </div>
      </div>

      <style jsx>{`
        .bf-root {
          background: #ffffff;
          font-family: "Times New Roman", Times, serif;
          padding: 60px 72px;
        }
      .bf-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

        /* ---------- LEFT ---------- */
        .bf-left {
          display: flex;
          flex-direction: column;
        }
        .bf-label {
          font-size: 22px;
          letter-spacing: 2px;
          font-weight: 500;
          margin-bottom: 20px;
          color: #1a1a1a;
        }
        .bf-heading {
          font-size: 34px;
          font-weight: 700;
          line-height: 1.3;
          color: #1a1a1a;
          margin-bottom: 24px;
        }
        .bf-desc {
          font-size: 15px;
          line-height: 1.7;
          color: #3a3a3a;
          max-width: 560px;
          margin-bottom: 28px;
        }
        
        .bf-sketch-wrap {
          width: 390px;
          max-width: 100%;
          border: 1px solid #e5e0d8;
        }
        .bf-sketch-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        /* ---------- RIGHT ---------- */
       .bf-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
}
        .bf-photo-wrap {
  position: relative;
  width: 100%;
  max-width: 560px;
  aspect-ratio: 1 / 1;
}
        .bf-photo-main {
          object-fit: cover;
        }
        .bf-caption-box {
          position: absolute;
          left: -120px;
          top: 61%;
          background: #ffffff;
          padding: 14px 34px;
          font-size: 12px;
          line-height: 1.6;
          color: #1a1a1a;
          box-shadow: 0 6px 4px rgba(0, 0, 0, 0.08);
        }
        .bf-caption-line {
          margin: 0;
        }
        .bf-photo-small-wrap {
          position: absolute;
          right: 24px;
          bottom: -6%;
          width: 110px;
          height: 0px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }
        .bf-photo-small {
          object-fit: cover;
        }
        .bf-signature {
          font-size: 35px;
          margin-top: 10px;
          color: #1a1a1a;
        }

        /* ---------- RESPONSIVE ---------- */
        @media (max-width: 1024px) {
          .bf-container {
            grid-template-columns: 1fr;
          }
          .bf-right {
            align-items: center;
            margin-top: 40px;
          }
          .bf-caption-box {
            left: 0;
          }
        }

       @media (max-width: 600px) {
  .bf-root {
    padding: 50px 20px;
  }

  .bf-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  /* ---------- LEFT ---------- */

  .bf-left {
    order: 1;
    align-items: flex-start;
  }

  .bf-label {
    font-size: 15px;
    letter-spacing: 1.8px;
    margin-bottom: 14px;
  }

  .bf-heading {
    font-size: 22px;
    line-height: 1.28;
    margin-bottom: 18px;
  }

  .bf-desc {
    font-size: 15px;
    line-height: 1.7;
    max-width: 100%;
    margin-bottom: 24px;
  }

  .bf-sketch-wrap {
    width: 100%;
  
  }

  /* ---------- RIGHT ---------- */

  .bf-right {
    order: 2;
    align-items: center;
    width: 100%;
  }

  .bf-photo-wrap {
    width: 100%;
    max-width: 100%;
    aspect-ratio: 1 / 1;
  }

  .bf-photo-main {
    object-fit: cover;
  }

  .bf-caption-box {
    position: absolute;
    left: 50%;
    bottom: 18px;
    top: auto;
    transform: translateX(-50%);
    width: calc(100% - 36px);
    padding: 12px 18px;
    text-align: center;
    font-size: 11px;
    line-height: 1.5;
    box-shadow: 0 8px 24px rgba(0,0,0,.12);
  }

  .bf-signature {
    font-size: 32px;
    margin-top: 16px;
    text-align: center;
  }

  /* CTA */

  .bf-left a {
    font-size: 14px !important;
    margin-bottom: 28px !important;
  }
}
      `}</style>
    </section>
  );
}