"use client";

import React from "react";

const reviews = [
  {
    rating: 5,
    text: `"I was nervous buying fine jewelry online but the GIA certification gave me complete confidence. The sapphire ring is beyond gorgeous the blue is so deep and alive. Worth every single baht."`,
    name: "YUKI T.",
    location: "Tokyo, Japan,",
    product: "River Stone Sapphire Bangle",
    verified: true,
  },
  {
    rating: 5,
    text: `"I was nervous buying fine jewelry online but the GIA certification gave me complete confidence. The sapphire ring is beyond gorgeous the blue is so deep and alive. Worth every single baht."`,
    name: "YUKI T.",
    location: "Tokyo, Japan,",
    product: "River Stone Sapphire Bangle",
    verified: true,
  },
  {
    rating: 5,
    text: `"I was nervous buying fine jewelry online but the GIA certification gave me complete confidence. The sapphire ring is beyond gorgeous the blue is so deep and alive. Worth every single baht."`,
    name: "YUKI T.",
    location: "Tokyo, Japan,",
    product: "River Stone Sapphire Bangle",
    verified: true,
  },
  {
    rating: 5,
    text: `"I was nervous buying fine jewelry online but the GIA certification gave me complete confidence. The sapphire ring is beyond gorgeous the blue is so deep and alive. Worth every single baht."`,
    name: "YUKI T.",
    location: "Tokyo, Japan,",
    product: "River Stone Sapphire Bangle",
    verified: true,
  },
  {
    rating: 5,
    text: `"I was nervous buying fine jewelry online but the GIA certification gave me complete confidence. The sapphire ring is beyond gorgeous the blue is so deep and alive. Worth every single baht."`,
    name: "YUKI T.",
    location: "Tokyo, Japan,",
    product: "River Stone Sapphire Bangle",
    verified: true,
  },
  {
    rating: 5,
    text: `"I was nervous buying fine jewelry online but the GIA certification gave me complete confidence. The sapphire ring is beyond gorgeous the blue is so deep and alive. Worth every single baht."`,
    name: "YUKI T.",
    location: "Tokyo, Japan,",
    product: "River Stone Sapphire Bangle",
    verified: true,
  },
  {
    rating: 5,
    text: `"I was nervous buying fine jewelry online but the GIA certification gave me complete confidence. The sapphire ring is beyond gorgeous the blue is so deep and alive. Worth every single baht."`,
    name: "YUKI T.",
    location: "Tokyo, Japan,",
    product: "River Stone Sapphire Bangle",
    verified: true,
  },
];

function Stars({ count = 5 }) {
  return <span className="rs-stars">{"★".repeat(count)}</span>;
}

function ReviewCard({ review }) {
  return (
    <div className="rs-reviewCard">
      <div className="rs-reviewStars">
        <Stars count={review.rating} />
      </div>

      <p className="rs-reviewText">{review.text}</p>

      <p className="rs-reviewMeta">
        <span className="rs-bold">{review.name}</span>
        {" — "}
        <span className="rs-bold">{review.location}</span> {review.product}
        {review.verified && (
          <>
            {" "}
            | <span className="rs-check">✓</span> Verified Purchase
          </>
        )}
      </p>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="rs-reviews">
      <div className="rs-wrapper">
        {/* ---------- Left column ---------- */}
        <div className="rs-left">
          <div className="rs-ratingRow">
            <span className="rs-ratingNumber">4.9</span>
            <span className="rs-ratingStars">
              <Stars count={5} />
            </span>
          </div>

          <h3 className="rs-verifiedCount">2,847 Verified Reviews</h3>

          <h1 className="rs-heading">
            Customers Reviews,<br/> Timeless Experiences
          </h1>

          <p className="rs-body">
            Thousands of jewelry lovers trust Passione Jewelry for pieces
            that blend elegance with individuality. Each handcrafted design
            is created to inspire confidence, celebrate personal style, and
            deliver a lasting impression.
          </p>

          <p className="rs-body">
            From first purchase to lifelong favorites, our customers keep
            coming back for quality they can feel and beauty that never
            fades.
          </p>
        </div>

        {/* ---------- Right column ---------- */}
        <div className="rs-right">
          {reviews.map((review, idx) => (
            <ReviewCard key={idx} review={review} />
          ))}
        </div>
      </div>

      {/* Plain <style> tag (not styled-jsx) — works in any React/Next.js setup
          without needing a special compiler. Classes are prefixed with
          "rs-" so they won't collide with or get overridden by other
          component styles on the page. */}
      <style>{`
       .rs-reviews {
  font-family: "Times New Roman", Times, serif;
  color: #1a1a1a;
  background-color: #ffffff;
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 32px 80px;
}

        .rs-wrapper {
          display: flex;
          align-items: flex-start;
          gap: 48px;
        }

        .rs-left {
          flex: 1;
          position: sticky;
          top: 40px;
        }

        .rs-right {
          flex: 1.5;
        }

        .rs-ratingRow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .rs-ratingNumber {
          font-size: 38px;
          font-weight: 700;
          color: #1B807F;
        }

        .rs-ratingStars {
          font-size: 36px;
        }

        .rs-verifiedCount {
          font-size: 30px;
          font-weight: 700;
          color: #1B807F;
          margin: 0 0 30px;
        }

        .rs-heading {
          font-size: 34px;
          font-weight: 700;
          line-height: 1.25;
          margin: 0 0 24px;
        }

        .rs-body {
          font-size: 14px;
          line-height: 1.7;
          margin: 0 0 16px;
        }

        .rs-body:last-child {
          margin-bottom: 0;
        }

        .rs-stars {
          color: #1B807F;
          letter-spacing: 2px;
        }

        .rs-check {
          color: #1B807F;
        }

        .rs-bold {
          font-weight: 700;
        }

        .rs-reviewCard {
          border: 1px solid #d9d9d9;
          border-radius: 4px;
          padding: 20px 24px;
          margin-bottom: 20px;
          background-color: #ffffff;
        }

        .rs-reviewCard:last-child {
          margin-bottom: 0;
        }

        .rs-reviewStars {
          font-size: 16px;
          margin-bottom: 10px;
        }

        .rs-reviewText {
          font-size: 15px;
          line-height: 1.6;
          margin: 0 0 14px;
        }

        .rs-reviewMeta {
          font-size: 14px;
          margin: 0;
        }

        /* ---------- Tablet ---------- */
        @media (max-width: 900px) {
          .rs-reviews {
            padding: 56px 28px 56px;
          }

          .rs-wrapper {
            gap: 32px;
          }

          .rs-heading {
            font-size: 28px;
          }
        }

        /* ---------- Mobile ---------- */
       @media (max-width: 768px) {
  .rs-reviews {
    padding: 80px 20px 64px;
  }

  .rs-wrapper {
    flex-direction: column;
    gap: 32px;
  }

  .rs-left {
    position: static;
  }

  .rs-ratingNumber {
    font-size: 28px;
  }

  .rs-ratingStars {
    font-size: 22px;
  }

  .rs-verifiedCount {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .rs-heading {
    font-size: 22px;
    margin-bottom: 18px;
  }

  .rs-body {
    font-size: 14px;
  }

  .rs-reviewCard {
    padding: 16px 18px;
  }

  .rs-reviewText {
    font-size: 14px;
  }

  .rs-reviewMeta {
    font-size: 13px;
  }
}
      `}</style>
    </section>
  );
}