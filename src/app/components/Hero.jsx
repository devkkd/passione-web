"use client";

/**
 * Hero.jsx
 * -----------------------------------------------------------------
 * Passione Jewelry jaisa hero section.
 *  - Background: ek video jo automatically play + loop hota rahega
 *    (muted + autoPlay + loop + playsInline, taaki mobile browsers
 *    par bhi bina tap kiye chal jaye).
 *  - Koi left/right arrow buttons NAHI.
 *  - Neeche wale dots/pagination bhi NAHI.
 *  - Heading + "View Collections" -> Times New Roman
 *  - Paragraph -> Montserrat
 *  - Text color: #FFFFFF
 *  - Video full width/height cover, desktop + mobile dono responsive
 *
 * Video file public folder mai daal dena, e.g.:
 *   frontend/public/hero-video.mp4
 * aur neeche src="/hero-video.mp4" already set hai.
 *
 * Usage:
 *   import Hero from "@/components/Hero";
 *   <Hero />
 * -----------------------------------------------------------------
 */

export default function Hero() {
  return (
    <section className="hero">
      <video
  className="hero-video"
  // src="/1.mp4"
  poster="/home/th.png"
  autoPlay
  loop
  muted
  playsInline
  preload="metadata"
>
  Your browser does not support the video tag.
</video>

      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-heading">Handcrafted in Thailand&apos;s Ancient Gem Capital</h1>

        <p className="hero-text">
          From The River-smoothed Sapphires Of Chanthaburi To The Amber-hued Topazes Of Mae Sai
          Each Gemstone Tells The Story Of A Land Alive With Colour.
        </p>

        <a href="/shop-by/new-arrivals" className="hero-cta">
          View Collections ↓
        </a>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 520px;
          overflow: hidden;
          background-color: #000000;
        }

        .hero-video {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: translate(-50%, -50%);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.15) 0%,
            rgba(0, 0, 0, 0.05) 45%,
            rgba(0, 0, 0, 0.55) 100%
          );
        }

        .hero-content {
          position: absolute;
          left: 50%;
          bottom: 9%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 720px;
          padding: 0 24px;
          text-align: center;
          color: #020202;
        }

        .hero-heading {
          font-family: "Times New Roman", Times, serif;
          font-weight: 300;
          font-size: 30px;
          line-height: 1.3;
          margin: 0 0 16px;
          color: #020202;
        }

        .hero-text {
          font-family: "Montserrat", -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 300;
          font-size: 13px;
          line-height: 1.7;
          letter-spacing: 0.01em;
          margin: 0 0 26px;
          color: #020202;
        }

        .hero-cta {
          font-family: "Times New Roman", Times, serif;
          font-size: 15px;
          
          color: #020202;
          text-decoration: none;
          border-bottom: 1px solid #020202;
          padding-bottom: 4px;
          display: inline-block;
          transition: opacity 0.3s ease;
        }
        .hero-cta:hover {
          opacity: 0.7;
        }

        /* ------------------------- Responsive ------------------------- */
        @media (max-width: 768px) {
          .hero {
            height: 100svh;
            min-height: 460px;
          }
          .hero-content {
            bottom: 12%;
            max-width: 92%;
            padding: 0 18px;
          }
          .hero-heading {
            font-size: 22px;
            margin-bottom: 12px;
          }
          .hero-text {
            font-size: 11.5px;
            line-height: 1.6;
            margin-bottom: 20px;
          }
          .hero-cta {
            font-size: 13px;
          }
        }

        @media (max-width: 380px) {
          .hero-heading {
            font-size: 19px;
          }
          .hero-text {
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  );
}