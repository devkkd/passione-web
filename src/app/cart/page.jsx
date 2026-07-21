"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CART_ITEM = {
  name: "Opal & Iolite Blue Topaz Earrings",
  description: "Opal & Iolite Drop Earrings - Blue Topaz & Silver Statement Earrings",
  price: 1500.0,
  image: "/images/opal-iolite-earrings.jpg",
};

function formatUSD(amount) {
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function CartPage() {
  const router = useRouter();
  const [qty, setQty] = useState(1);

  const total = CART_ITEM.price * qty;

  return (
    <main className="cart-page">
      <div className="wrap">
        <h1 className="cart-title">Shopping Cart ({qty})</h1>

        <div className="cart-grid">
          {/* Cart item */}
          <div className="item-col">
            <div className="item-row">
              <img src={CART_ITEM.image} alt={CART_ITEM.name} className="item-img" />

              <div className="item-body">
                <div className="item-top">
                  <h2 className="item-name">{CART_ITEM.name}</h2>
                  <p className="item-price">{formatUSD(CART_ITEM.price)}</p>
                </div>

                <p className="item-desc">{CART_ITEM.description}</p>

                <div className="item-controls">
                  <div className="qty-box">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="qty-btn"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-value">{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="qty-btn"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button className="save-later">SAVE FOR LATER</button>
                </div>
              </div>
            </div>
          </div>

          {/* Divider (desktop only) */}
          <div className="v-divider" />

          {/* Order summary */}
          <div className="summary-col">
            <div className="summary-lines">
              <div className="summary-row">
                <span className="muted">Estimated Total</span>
                <span className="bold">{formatUSD(total)}</span>
              </div>
              <div className="summary-row">
                <span className="muted">Complimentary Express Delivery</span>
                <span className="bold">$0.00</span>
              </div>
              <div className="summary-row">
                <span className="muted">Estimated Tax</span>
                <span className="bold">$0.00</span>
              </div>
            </div>

            <div className="h-divider" />

            <div className="summary-row total-row">
              <span>Estimated Total</span>
              <span>{formatUSD(total)}</span>
            </div>
            <p className="fine-print">Complimentary Delivery with Effortless Returns</p>

            <button onClick={() => router.push("/checkout")} className="btn-primary checkout-btn">
              CHECKOUT
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cart-page {
          min-height: 100vh;
          background: #ffffff;
          font-family: "Times New Roman", Times, serif;
          color: #111111;
        }
        .wrap {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 32px 100px;
        }
        .cart-title {
          font-size: 20px;
          font-weight: 400;
          text-align: center;
          margin-bottom: 28px;
           margin-top: 28px;
        }
        .cart-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        .item-col {
          border-top: 1px solid #b4aa8f;
          padding-top: 24px;
        }
        .item-row {
          display: flex;
          gap: 24px;
        }
        .item-img {
          width: 96px;
          height: 96px;
          object-fit: cover;
          background: #f3f3f3;
          flex-shrink: 0;
        }
        .item-body {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .item-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
        }
        .item-name {
          font-size: 16px;
          font-weight: 400;
          margin: 0;
        }
        .item-price {
          font-size: 15px;
          font-weight: 700;
          white-space: nowrap;
          margin: 0;
        }
        .item-desc {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 12.5px;
          color: #6b6b6b;
          max-width: 320px;
          margin: 8px 0 0;
          line-height: 1.5;
        }
        .item-controls {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 20px;
        }
        .qty-box {
          display: flex;
          align-items: center;
          border: 1px solid #cfc7ae;
        }
        .qty-btn {
          width: 30px;
          height: 30px;
          background: none;
          border: none;
          cursor: pointer;
          color: #555;
          font-size: 15px;
          font-family: Arial, Helvetica, sans-serif;
        }
        .qty-btn:hover {
          background: #f7f7f2;
        }
        .qty-value {
          width: 28px;
          text-align: center;
          font-size: 13px;
          font-family: Arial, Helvetica, sans-serif;
        }
        .save-later {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 11px;
          letter-spacing: 0.05em;
          text-decoration: underline;
          text-underline-offset: 2px;
          background: none;
          border: none;
          cursor: pointer;
          color: #444;
        }
        .v-divider {
          display: none;
        }
        .summary-col {
          border-top: 1px solid #b4aa8f;
          padding-top: 24px;
        }
        .summary-lines {
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
        }
        .muted {
          color: #6b6b6b;
        }
        .bold {
          font-weight: 700;
        }
        .h-divider {
          border-top: 1px solid #b4aa8f;
          margin: 16px 0;
        }
        .total-row {
          font-family: Arial, Helvetica, sans-serif;
          font-weight: 700;
          font-size: 14px;
        }
        .fine-print {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 11px;
          color: #8a8a8a;
          margin-top: 4px;
        }
        .btn-primary {
          width: 100%;
          padding: 14px;
          color: #fff;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          border: none;
          cursor: pointer;
          background: #1b807f;
          transition: background 0.2s ease;
        }
        .btn-primary:hover {
          background: #156665;
        }
        .checkout-btn {
          margin-top: 24px;
        }

        /* ---------- DESKTOP ---------- */
        @media (min-width: 900px) {
          .wrap {
            padding: 60px 32px 140px;
          }
          .cart-grid {
            grid-template-columns: 1fr auto 340px;
            gap: 40px;
          }
          .v-divider {
            display: block;
            width: 1px;
            background: #b4aa8f;
          }
        }

        /* ---------- MOBILE ---------- */
        @media (max-width: 520px) {
          .wrap {
            padding: 28px 16px 60px;
          }
          .cart-title {
            font-size: 16px;
            margin-bottom: 20px;
          }
          .item-row {
            gap: 14px;
          }
          .item-img {
            width: 72px;
            height: 72px;
          }
          .item-name {
            font-size: 14px;
          }
          .item-price {
            font-size: 13px;
          }
          .item-desc {
            font-size: 11.5px;
            max-width: 100%;
          }
          .item-top {
            flex-direction: column;
            gap: 4px;
          }
          .item-controls {
            gap: 14px;
            margin-top: 14px;
            flex-wrap: wrap;
          }
          .qty-btn {
            width: 26px;
            height: 26px;
            font-size: 13px;
          }
          .qty-value {
            font-size: 12px;
          }
          .save-later {
            font-size: 10px;
          }
          .summary-lines {
            font-size: 12px;
          }
          .total-row {
            font-size: 13px;
          }
          .fine-print {
            font-size: 10px;
          }
          .btn-primary {
            padding: 12px;
            font-size: 12px;
          }
        }
      `}</style>
    </main>
  );
}