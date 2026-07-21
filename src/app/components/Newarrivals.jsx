"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

/**
 * NewArrivals.jsx
 * -----------------------------------------------------------------
 * "NEW ARRIVALS" product carousel section.
 *
 * - Desktop: 4 cards visible at once, 32px left/right side margin.
 * - Mobile (<=768px): 2 cards visible at once, 20px left/right side margin.
 * - Autoplay: slides forward automatically every few seconds, on every
 *   screen size.
 * - Hover (desktop) / touch (mobile) on the carousel pauses autoplay
 *   ("hold" ho jaata hai), user can then tap/click the arrows (or
 *   swipe with a finger) to move slide-by-slide, right to left.
 *   Autoplay resumes automatically a couple seconds after the user
 *   stops interacting.
 * - Bottom progress line is a real scrollbar-style thumb that slides
 *   and resizes live in sync with the current slide position, both
 *   during autoplay and manual navigation.
 * - Heart / wishlist buttons are functional (toggle liked state).
 * - Images are pulled from /public/home/1.png ... 4.png.
 *
 * Usage (Next.js, app or pages router):
 *   import NewArrivals from "@/components/NewArrivals";
 *   ...
 *   <NewArrivals />
 *
 * You can also pass your own product list:
 *   <NewArrivals products={myProducts} />
 * where each product is: { id, image, title, subtitle }
 *
 * NOTE: with only 4 products and 4 cards visible on desktop, there is
 * nothing left to slide into view on desktop (all 4 already fit) --
 * that's expected, not a bug. As soon as you add a 5th+ product (or
 * pass a longer `products` array), the desktop carousel will start
 * sliding automatically too. Mobile already slides today since only
 * 2 of the 4 cards fit on screen at a time.
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

const AUTOPLAY_DELAY = 3500; // ms between automatic slides
const RESUME_DELAY = 2500; // ms of inactivity before autoplay resumes
const SWIPE_THRESHOLD = 40; // px finger movement needed to count as a swipe

export default function NewArrivals({ products = DEFAULT_PRODUCTS, title = "NEW ARRIVALS" }) {
  const [itemsPerView, setItemsPerView] = useState(4);
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState({});
  const [isPaused, setIsPaused] = useState(false);

  const autoplayTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const touchStartXRef = useRef(null);

  const maxIndex = Math.max(products.length - itemsPerView, 0);

  // Decide cards-per-view based on screen width.
  useEffect(() => {
    function updateItemsPerView() {
      setItemsPerView(window.innerWidth <= 768 ? 2 : 4);
    }
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Keep the current index valid if itemsPerView / product count changes.
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const goNext = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  // Autoplay loop.
  useEffect(() => {
    if (isPaused || maxIndex === 0) return undefined;
    autoplayTimerRef.current = setInterval(goNext, AUTOPLAY_DELAY);
    return () => clearInterval(autoplayTimerRef.current);
  }, [isPaused, maxIndex, goNext]);

  const pauseAutoplay = useCallback(() => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const scheduleResume = useCallback((delay = RESUME_DELAY) => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), delay);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  function toggleLike(id) {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleArrowClick(direction) {
    pauseAutoplay();
    if (direction === "next") goNext();
    else goPrev();
    scheduleResume();
  }

  // Touch swipe support (mobile: finger down on a card holds/pauses
  // autoplay, dragging left/right manually moves the slide).
  function handleTouchStart(e) {
    touchStartXRef.current = e.touches[0].clientX;
    pauseAutoplay();
  }

  function handleTouchEnd(e) {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (deltaX <= -SWIPE_THRESHOLD) {
      goNext();
    } else if (deltaX >= SWIPE_THRESHOLD) {
      goPrev();
    }
    touchStartXRef.current = null;
    scheduleResume();
  }

  // Progress-bar thumb: width = share of products currently visible,
  // left offset = how far we've scrolled through the full list.
  const progressWidthPct = products.length ? (itemsPerView / products.length) * 100 : 100;
  const progressLeftPct = products.length ? (index / products.length) * 100 : 0;

  return (
    <section
      className="new-arrivals"
      style={{ fontFamily: FONT_FAMILY }}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="na-inner">
        <h2 className="na-title">{title}</h2>

        <div
          className="na-viewport"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="na-track"
            style={{
              width: `${(products.length / itemsPerView) * 100}%`,
              transform: `translateX(-${(index * 100) / products.length}%)`,
            }}
          >
            {products.map((p) => (
              <div className="na-card" key={p.id} style={{ width: `${100 / products.length}%` }}>
                <div className="na-card-top">
                  <button
                    type="button"
                    className={`na-heart ${liked[p.id] ? "is-liked" : ""}`}
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

                <div className="na-image-wrap">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 45vw, 22vw"
                    className="na-image"
                  />
                </div>

                <h3 className="na-card-title">{p.title}</h3>
                <p className="na-card-subtitle">{p.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="na-controls">
          <button
            type="button"
            className="na-arrow"
            aria-label="Previous"
            onClick={() => handleArrowClick("prev")}
            disabled={maxIndex === 0}
          >
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M7.5 1.5 1.5 7.5l6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="na-progress-track">
            <div
              className="na-progress-fill"
              style={{ width: `${progressWidthPct}%`, left: `${progressLeftPct}%` }}
            />
          </div>

          <button
            type="button"
            className="na-arrow"
            aria-label="Next"
            onClick={() => handleArrowClick("next")}
            disabled={maxIndex === 0}
          >
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M1.5 1.5l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .new-arrivals {
          width: 100%;
          background: #ffffff;
          padding: 56px 0 48px;
        }

        .na-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
        }

       .na-title {
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  font-size: 24px;
  letter-spacing: 0.06em;
  color: #1a1a1a;
  margin: 0 0 40px;
}

        .na-viewport {
          width: 100%;
          overflow: hidden;
          touch-action: pan-y;
        }

        .na-track {
          display: flex;
          transition: transform 0.5s ease;
        }

        .na-card {
          flex-shrink: 0;
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .na-card-top {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          margin-bottom: 12px;
        }

        .na-heart {
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
        .na-heart:hover {
          transform: scale(1.1);
        }
        .na-heart.is-liked {
          color: #c0392b;
        }

        .na-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          margin-bottom: 22px;
        }

        .na-image {
          object-fit: contain;
        }

        .na-card-title {
            font-family: "Montserrat", sans-serif;
          font-weight: 600;
          font-size: 15px;
          color: #1a1a1a;
          margin: 0 0 10px;
        }

        .na-card-subtitle {
           font-family: "Montserrat", sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 1.55;
          color: #6f6f6f;
          margin: 0;
          max-width: 260px;
        }

        .na-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin-top: 40px;
        }

        .na-arrow {
          background: transparent;
          border: none;
          cursor: pointer;
          color: #1a1a1a;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s ease;
        }
        .na-arrow:hover {
          opacity: 0.6;
        }
        .na-arrow:disabled {
          opacity: 0.25;
          cursor: default;
        }

        .na-progress-track {
          position: relative;
          width: 220px;
          height: 2px;
          background: #B4AA8F;
          border-radius: 2px;
          overflow: hidden;
        }

        .na-progress-fill {
          position: absolute;
          top: 0;
          height: 100%;
          background: #1a1a1a;
          border-radius: 2px;
          transition: left 0.5s ease, width 0.3s ease;
        }

        /* ------------------------- Responsive ------------------------- */
        @media (max-width: 768px) {
          .na-inner {
            padding: 0 20px;
          }

          .new-arrivals {
            padding: 40px 0 36px;
          }

          .na-title {
            font-size: 18px;
            margin-bottom: 28px;
          }

          .na-card {
            padding: 0 8px;
          }

          .na-image-wrap {
            margin-bottom: 16px;
          }

          .na-card-title {
            font-size: 13px;
          }

          .na-card-subtitle {
            font-size: 11.5px;
          }

          .na-controls {
            margin-top: 28px;
            gap: 12px;
          }

          .na-progress-track {
            width: 160px;
          }
        }
      `}</style>
    </section>
  );
}