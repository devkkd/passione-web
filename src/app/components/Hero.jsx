"use client";

import { useEffect, useState } from "react";

/**
 * Hero.jsx
 * -----------------------------------------------------------------
 * DESKTOP:
 *  - 5 separate images
 *  - 1774 x 887
 *  - Full desktop hero
 *
 * MOBILE:
 *  - 5 separate images
 *  - 1080 x 1920
 *  - Width: 100%
 *  - Height: 70% of mobile viewport
 *  - Full screen width
 *  - object-fit: cover
 *
 *  - Auto slide
 *  - No arrows
 *  - No dots
 *  - Existing design preserved
 * -----------------------------------------------------------------
 */

export default function Hero() {
  const desktopImages = [
    "/home/desktop/1.png",
    "/home/desktop/2.png",
    "/home/desktop/3.png",
    "/home/desktop/4.png",
    "/home/desktop/5.png",
  ];

  const mobileImages = [
    "/home/mobile/1.png",
    "/home/mobile/2.png",
    "/home/mobile/3.png",
    "/home/mobile/4.png",
    "/home/mobile/5.png",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % desktopImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">

      {/* =====================================================
          DESKTOP SLIDER
          ===================================================== */}

      <div className="hero-desktop-slides">
        {desktopImages.map((image, index) => (
          <img
            key={`desktop-${index}`}
            src={image}
            alt={`Passione Jewelry Hero ${index + 1}`}
            className={`hero-image ${
              currentSlide === index ? "active" : ""
            }`}
          />
        ))}
      </div>


      {/* =====================================================
          MOBILE SLIDER
          ===================================================== */}

      <div className="hero-mobile-slides">
        {mobileImages.map((image, index) => (
          <img
            key={`mobile-${index}`}
            src={image}
            alt={`Passione Jewelry Mobile Hero ${index + 1}`}
            className={`hero-mobile-image ${
              currentSlide === index ? "active" : ""
            }`}
          />
        ))}
      </div>


      {/* =====================================================
          OVERLAY
          ===================================================== */}

      <div className="hero-overlay" />


      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="hero-content">

        <h1 className="hero-heading">
          Crafted by Nature & Refined by Hand
        </h1>

        <p className="hero-text">
          Rooted in Thailand’s storied gemstone heritage, each creation begins
          with a stone of distinctive light, colour and character. Guided by
          the hands of skilled artisans, each stone is transformed into a
          distinctive jewel where timeless craftsmanship meets modern
          elegance.
        </p>

        <a
          href="/shop-by/new-arrivals"
          className="hero-cta"
        >
          View Collections ↓
        </a>

      </div>


      <style jsx>{`

        /* =====================================================
           DESKTOP HERO
           ===================================================== */

        .hero {
          position: relative;

          width: 100%;
          height: 100vh;

          min-height: 520px;

          overflow: hidden;

          background-color: #000000;
        }


        /* =====================================================
           DESKTOP SLIDER
           ===================================================== */

        .hero-desktop-slides {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          overflow: hidden;
        }

        .hero-image {
          position: absolute;

          top: 0;
          left: 0;

          width: 100%;
          height: 100%;

          object-fit: cover;
          object-position: center;

          opacity: 0;
          visibility: hidden;

          transition:
            opacity 1.2s ease-in-out,
            visibility 1.2s ease-in-out;
        }

        .hero-image.active {
          opacity: 1;
          visibility: visible;
        }


        /* =====================================================
           MOBILE SLIDER
           ===================================================== */

        .hero-mobile-slides {
          display: none;
        }


        /* =====================================================
           OVERLAY
           ===================================================== */

        .hero-overlay {
          position: absolute;

          inset: 0;

          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.15) 0%,
            rgba(0, 0, 0, 0.05) 45%,
            rgba(0, 0, 0, 0.55) 100%
          );

          z-index: 2;

          pointer-events: none;
        }


        /* =====================================================
           CONTENT
           ===================================================== */

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

          z-index: 3;
        }


        .hero-heading {
          font-family: "Times New Roman", Times, serif;

          font-weight: 300;

          font-size: 30px;

          line-height: 1.3;

          margin: 0 0 16px;

          color: #ffffff;
        }


        .hero-text {
          font-family:
            "Montserrat",
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;

          font-weight: 300;

          font-size: 13px;

          line-height: 1.7;

          letter-spacing: 0.01em;

          margin: 0 0 26px;

          color: #ffffff;
        }


        .hero-cta {
          font-family: "Times New Roman", Times, serif;

          font-size: 15px;

          color: #ffffff;

          text-decoration: none;

          border-bottom: 1px solid #ffffff;

          padding-bottom: 4px;

          display: inline-block;

          transition: opacity 0.3s ease;
        }

        .hero-cta:hover {
          opacity: 0.7;
        }


        /* =====================================================
           MOBILE
           ===================================================== */

        @media (max-width: 768px) {

          .hero {
            width: 100%;

            height: 85svh;

            min-height: 460px;

            overflow: hidden;

            background-color: #000000;
          }


          /* -------------------------------------------------
             Hide desktop
             ------------------------------------------------- */

          .hero-desktop-slides {
            display: none;
          }


          /* -------------------------------------------------
             MOBILE IMAGE CONTAINER
             
             EXACT:
             width  = 100%
             height = 70% viewport
             ------------------------------------------------- */

          .hero-mobile-slides {
            display: block;

            position: absolute;

            top: 0;
            left: 0;

            width: 100%;

            height: 100svh;

            min-height: 0;

            overflow: hidden;

            background-color: #000000;

            z-index: 1;
          }


          /* -------------------------------------------------
             MOBILE IMAGE

             Width FULL screen
             Height FULL 70svh container
             Cover = no black sides
             ------------------------------------------------- */

          .hero-mobile-image {
            position: absolute;

            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            display: block;

            object-fit: cover;

            object-position: center center;

            background-color: #000000;

            opacity: 0;
            visibility: hidden;

            transition:
              opacity 1.2s ease-in-out,
              visibility 1.2s ease-in-out;
          }


          .hero-mobile-image.active {
            opacity: 1;
            visibility: visible;
          }


          /* -------------------------------------------------
             MOBILE CONTENT
             ------------------------------------------------- */

          .hero-content {
            position: absolute;

            left: 50%;

            bottom: 12%;

            transform: translateX(-50%);

            width: 100%;

            max-width: 92%;

            padding: 0 18px;

            text-align: center;
          }


          .hero-heading {
            font-size: 22px;

            line-height: 1.3;

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


          /* -------------------------------------------------
             MOBILE OVERLAY
             ------------------------------------------------- */

          .hero-overlay {
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.05) 0%,
              rgba(0, 0, 0, 0.02) 40%,
              rgba(0, 0, 0, 0.55) 100%
            );

            z-index: 2;
          }
        }


        /* =====================================================
           SMALL MOBILE
           ===================================================== */

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