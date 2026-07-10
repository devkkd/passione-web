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
  return `$${amount.toFixed(2)}`;
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
                <div>
                  <h2 className="item-name">{CART_ITEM.name}</h2>
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

                <p className="item-price">{formatUSD(CART_ITEM.price)}</p>
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

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");
      `}</style>

      <style jsx>{`
        .cart-page {
          min-height: 100vh;
          background: #ffffff;
          font-family: "Montserrat", sans-serif;
          color: #111111;
        }
        .wrap {
          max-width: 1400px;
          margin: 0 auto;
          padding: 120px 32px;
        }
        .cart-title {
          font-family: "Times New Roman", Times, serif;
          font-size: 22px;
          text-align: center;
          margin-bottom: 32px;
        }
        .cart-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        .item-col {
          border-top: 1px solid #e5e5e5;
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
          gap: 8px;
          justify-content: space-between;
        }
        .item-name {
          font-family: "Times New Roman", Times, serif;
          font-size: 17px;
          margin-bottom: 4px;
        }
        .item-desc {
          font-size: 13px;
          color: #6b6b6b;
          max-width: 320px;
        }
        .item-controls {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 16px;
        }
        .qty-box {
          display: flex;
          align-items: center;
          border: 1px solid #ccc;
        }
        .qty-btn {
          width: 32px;
          height: 32px;
          background: none;
          border: none;
          cursor: pointer;
          color: #555;
          font-size: 15px;
        }
        .qty-btn:hover {
          background: #f7f7f7;
        }
        .qty-value {
          width: 32px;
          text-align: center;
          font-size: 13px;
        }
        .save-later {
          font-size: 11px;
          letter-spacing: 0.05em;
          text-decoration: underline;
          text-underline-offset: 2px;
          background: none;
          border: none;
          cursor: pointer;
          color: #444;
        }
        .item-price {
          font-weight: 600;
          font-size: 15px;
          white-space: nowrap;
        }
        .v-divider {
          display: none;
        }
        .summary-col {
          border-top: 1px solid #e5e5e5;
          padding-top: 24px;
        }
        .summary-lines {
          display: flex;
          flex-direction: column;
          gap: 12px;
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
          font-weight: 600;
        }
        .h-divider {
          border-top: 1px solid #e5e5e5;
          margin: 16px 0;
        }
        .total-row {
          font-weight: 600;
          font-size: 14px;
        }
        .fine-print {
          font-size: 11px;
          color: #8a8a8a;
          margin-top: 4px;
        }
        .btn-primary {
          width: 100%;
          padding: 13px;
          color: #fff;
          font-size: 13px;
          letter-spacing: 0.05em;
          border: none;
          cursor: pointer;
          background: #276152;
          transition: background 0.2s ease;
        }
        .btn-primary:hover {
          background: #1e4c40;
        }
        .checkout-btn {
          margin-top: 24px;
        }

        @media (min-width: 1024px) {
          .cart-grid {
            grid-template-columns: 1fr auto 360px;
          }
          .v-divider {
            display: block;
            width: 1px;
            background: #e5e5e5;
          }
        }
      `}</style>
    </main>
  );
}