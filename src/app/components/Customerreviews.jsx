"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * CustomerReviews.jsx
 * -----------------------------------------------------------------
 * "What Our Customers Say" review carousel section.
 *
 * - Full width section (background spans the entire viewport width,
 *   content is capped the same way as the rest of the site).
 * - Desktop: ~4 full cards visible + a sliver of the next one peeking
 *   on the right, exactly like the screenshot.
 * - Mobile (<=768px): 2 full cards visible + a sliver of the 3rd
 *   peeking, so it's obvious you can keep scrolling.
 * - Autoplay: slides forward on its own, on every screen size.
 * - Hovering (desktop) or touching (mobile) the carousel pauses
 *   autoplay; you can then use the arrows or swipe/drag with your
 *   finger/mouse to move manually (real native horizontal scroll
 *   under the hood, so swipe works out of the box). Autoplay resumes
 *   automatically a couple seconds after you stop interacting.
 * - The bottom progress line is a real scrollbar-style thumb that
 *   tracks the actual scroll position live -- during autoplay,
 *   arrow clicks, and manual swiping/dragging.
 * - Font: Montserrat everywhere, EXCEPT the "4.9 ★★★★★ 2,847 verified
 *   reviews" line, which uses Times New Roman as requested.
 * - Heading color: #276152
 *
 * Usage (Next.js, app or pages router):
 *   import CustomerReviews from "@/components/CustomerReviews";
 *   ...
 *   <CustomerReviews />
 *
 * You can also pass your own reviews:
 *   <CustomerReviews reviews={myReviews} />
 * where each review is: { id, stars, text, name, product }
 * -----------------------------------------------------------------
 */

const SANS_FONT = '"Montserrat", "Helvetica Neue", Arial, sans-serif';
const SERIF_FONT = '"Times New Roman", Times, serif';

const REVIEW_TEXT =
  "I was nervous buying fine jewelry online but the GIA certification gave me complete confidence. The sapphire ring is beyond gorgeous the blue is so deep and alive. Worth every single baht.";

const DEFAULT_REVIEWS = [
  { id: 1, stars: 5, text: REVIEW_TEXT, name: "YUKI T. — Tokyo, Japan", product: "River Stone Sapphire Bangle" },
  { id: 2, stars: 5, text: REVIEW_TEXT, name: "YUKI T. — Tokyo, Japan", product: "River Stone Sapphire Bangle" },
  { id: 3, stars: 5, text: REVIEW_TEXT, name: "YUKI T. — Tokyo, Japan", product: "River Stone Sapphire Bangle" },
  { id: 4, stars: 5, text: REVIEW_TEXT, name: "YUKI T. — Tokyo, Japan", product: "River Stone Sapphire Bangle" },
  { id: 5, stars: 5, text: REVIEW_TEXT, name: "YUKI T. — Tokyo, Japan", product: "River Stone Sapphire Bangle" },
  { id: 6, stars: 5, text: REVIEW_TEXT, name: "YUKI T. — Tokyo, Japan", product: "River Stone Sapphire Bangle" },
  { id: 7, stars: 5, text: REVIEW_TEXT, name: "YUKI T. — Tokyo, Japan", product: "River Stone Sapphire Bangle" },
  { id: 8, stars: 5, text: REVIEW_TEXT, name: "YUKI T. — Tokyo, Japan", product: "River Stone Sapphire Bangle" },
];

const AUTOPLAY_DELAY = 2200; // ms between automatic slides
const RESUME_DELAY = 2500; // ms of inactivity before autoplay resumes

function Stars({ count }) {
  return (
    <div className="cr-stars" aria-label={`${count} out of 5 stars`}>
      {"★".repeat(count)}
      {"☆".repeat(Math.max(5 - count, 0))}
    </div>
  );
}

export default function CustomerReviews({
  reviews = DEFAULT_REVIEWS,
  eyebrow = "CUSTOMER REVIEWS",
  heading = "What Our Customers Say",
  ratingLine = "4.9   ★★★★★   2,847 verified reviews",
}) {
  const trackRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);

  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState({ widthPct: 30, leftPct: 0 });
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const widthPct = Math.min((el.clientWidth / el.scrollWidth) * 100, 100);
    const scrollRatio = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
    const leftPct = (100 - widthPct) * scrollRatio;
    setProgress({ widthPct, leftPct });
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= maxScroll - 2);
  }, []);

  function cardStep() {
    const el = trackRef.current;
    if (!el) return 0;
    const firstCard = el.querySelector(".cr-card");
    if (!firstCard) return el.clientWidth;
    const style = window.getComputedStyle(firstCard);
    const gap = parseFloat(window.getComputedStyle(el).columnGap || "0") || 0;
    return firstCard.getBoundingClientRect().width + gap;
  }

  const scrollByCards = useCallback((direction) => {
    const el = trackRef.current;
    if (!el) return;
    const step = cardStep();
    const maxScroll = el.scrollWidth - el.clientWidth;

    let target = el.scrollLeft + direction * step;

    if (target >= maxScroll - 2) {
      target = direction > 0 ? 0 : maxScroll; // loop back to start / jump to end
    }
    if (target < 0) {
      target = maxScroll;
    }

    el.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  const pauseAutoplay = useCallback(() => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const scheduleResume = useCallback((delay = RESUME_DELAY) => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), delay);
  }, []);

  // Autoplay loop.
  useEffect(() => {
    if (isPaused) return undefined;
    autoplayTimerRef.current = setInterval(() => scrollByCards(1), AUTOPLAY_DELAY);
    return () => clearInterval(autoplayTimerRef.current);
  }, [isPaused, scrollByCards]);

  // Keep progress bar in sync with any scroll (autoplay, arrows, or a
  // manual swipe/drag), and clean up timers on unmount.
  useEffect(() => {
    const el = trackRef.current;
    updateProgress();
    if (!el) return undefined;
    el.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      el.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [updateProgress]);

  function handleArrowClick(direction) {
    pauseAutoplay();
    scrollByCards(direction);
    scheduleResume();
  }

  return (
    <section
      className="customer-reviews"
      style={{ fontFamily: SANS_FONT }}
    onMouseEnter={() => {
  if (window.innerWidth <= 768) return;
  pauseAutoplay();
}}

onMouseLeave={() => {
  if (window.innerWidth <= 768) return;
  setIsPaused(false);
}}
      onTouchStart={pauseAutoplay}
      onTouchEnd={() => scheduleResume()}
    >
      <div className="cr-inner">
        <p className="cr-eyebrow">{eyebrow}</p>
        <h2 className="cr-heading">{heading}</h2>
        <p className="cr-rating">{ratingLine}</p>

     <div className="cr-viewport" ref={trackRef}>
         <div className="cr-track">
            {reviews.map((r) => (
              <div className="cr-card" key={r.id}>
                <Stars count={r.stars} />
                <p className="cr-text">&quot;{r.text}&quot;</p>
                <p className="cr-name">{r.name}</p>
                <p className="cr-product">{r.product}</p>
                <p className="cr-verified">✓ Verified Purchase</p>
              </div>
            ))}
          </div>
        </div>

        <div className="cr-controls">
          <button
            type="button"
            className="cr-arrow"
            aria-label="Previous"
            onClick={() => handleArrowClick(-1)}
            disabled={atStart && atEnd}
          >
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M7.5 1.5 1.5 7.5l6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="cr-progress-track">
            <div
              className="cr-progress-fill"
              style={{ width: `${progress.widthPct}%`, left: `${progress.leftPct}%` }}
            />
          </div>

          <button
            type="button"
            className="cr-arrow"
            aria-label="Next"
            onClick={() => handleArrowClick(1)}
            disabled={atStart && atEnd}
          >
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M1.5 1.5l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .customer-reviews {
          width: 100%;
          background: #ffffff;
          padding: 56px 0 48px;
        }

        .cr-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .cr-eyebrow {
          text-align: center;
          font-family: ${SANS_FONT};
          font-weight: 500;
          font-size: 13px;
          letter-spacing: 0.14em;
          color: #1a1a1a;
          margin: 0 0 14px;
        }

        .cr-heading {
          text-align: center;
          font-family: ${SANS_FONT};
          font-weight: 700;
          font-size: 34px;
          color: #276152;
          margin: 0 0 14px;
        }

        .cr-rating {
          text-align: center;
          font-family: ${SERIF_FONT};
          font-size: 14px;
          color: #3a3a3a;
          letter-spacing: 0.02em;
          margin: 0 0 40px;
        }

        .cr-viewport {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .cr-viewport::-webkit-scrollbar {
          display: none;
        }

        .cr-track {
          display: flex;
          gap: 24px;
          width: 100%;
        }

        .cr-card {
          flex: 0 0 auto;
          width: calc(25% - 18px);
          min-width: 220px;
          box-sizing: border-box;
          border: 1px solid #e6e6e6;
          border-radius: 4px;
          padding: 24px 22px;
          display: flex;
          flex-direction: column;
        }

        .cr-stars {
          color: #1a1a1a;
          font-size: 13px;
          letter-spacing: 2px;
          margin-bottom: 14px;
        }

        .cr-text {
          font-family: ${SANS_FONT};
          font-size: 13px;
          line-height: 1.6;
          color: #2a2a2a;
          margin: 0 0 20px;
          flex-grow: 1;
        }

        .cr-name {
          font-family: ${SANS_FONT};
          font-weight: 700;
          font-size: 12.5px;
          color: #1a1a1a;
          margin: 0 0 4px;
        }

        .cr-product {
          font-family: ${SANS_FONT};
          font-size: 12.5px;
          color: #3a3a3a;
          margin: 0 0 4px;
        }

        .cr-verified {
          font-family: ${SANS_FONT};
          font-size: 12px;
          color: #3a3a3a;
          margin: 0;
        }

        .cr-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin-top: 36px;
        }

        .cr-arrow {
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
        .cr-arrow:hover {
          opacity: 0.6;
        }
        .cr-arrow:disabled {
          opacity: 0.25;
          cursor: default;
        }

        .cr-progress-track {
          position: relative;
          width: 220px;
          height: 2px;
          background: #e2e2e2;
          border-radius: 2px;
          overflow: hidden;
        }

        .cr-progress-fill {
          position: absolute;
          top: 0;
          height: 100%;
          background: #1a1a1a;
          border-radius: 2px;
          transition: left 0.15s linear;
        }

        /* ------------------------- Responsive ------------------------- */
        @media (max-width: 768px) {
          .cr-inner {
            padding: 0 20px;
          }

          .customer-reviews {
            padding: 40px 0 36px;
          }

          .cr-heading {
            font-size: 24px;
          }

          .cr-rating {
            font-size: 12.5px;
            margin-bottom: 28px;
          }

          .cr-track {
            gap: 14px;
          }

          .cr-card {
            width: calc(50% - 20px);
            min-width: 160px;
            padding: 18px 16px;
          }

          .cr-text {
            font-size: 12px;
            margin-bottom: 16px;
          }

          .cr-controls {
            margin-top: 26px;
            gap: 12px;
          }

          .cr-progress-track {
            width: 160px;
          }
        }
      `}</style>
    </section>
  );
}