"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer2";
const MONT = "'Montserrat', sans-serif";

function formatPrice(n) {
    return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

const SECTIONS = [
    {
        key: "description",
        label: "Description",
        content: (p) => (
            <>
                <p>{p.subtitle}. Crafted in premium 18k gold vermeil over sterling silver, this piece features a refined silhouette with a lightweight, comfortable feel.</p>
                <br />
                <p>Perfect worn alone or layered with your favorite pieces, it brings a touch of luxury to every occasion.</p>
            </>
        ),
    },
    {
        key: "key-details",
        label: "Key Details",
        content: () => (
            <ul>
                <li>18k gold vermeil over sterling silver</li>
                <li>Lightweight and comfortable design</li>
                <li>Secure hinge closure</li>
                <li>Hand-finished for a premium look</li>
                <li>Suitable for everyday wear</li>
            </ul>
        ),
    },
    {
        key: "shipping",
        label: "Shipping",
        content: () => (
            <>
                <p className="pd-sub-heading">Domestic Shipping</p>
                <ul>
                    <li>Free shipping on orders over $150</li>
                    <li>$6.95 flat-rate shipping under $150</li>
                </ul>
                <p className="pd-sub-heading">International Shipping</p>
                <ul>
                    <li>Worldwide shipping available</li>
                    <li>Duties and taxes may apply</li>
                </ul>
            </>
        ),
    },
    {
        key: "delivery",
        label: "Delivery",
        content: () => (
            <ul>
                <li><strong>Ready-to-Ship Items</strong> - 5-8 business days</li>
                <li><strong>Made-to-Order Pieces</strong> - 1-2 weeks production time plus shipping</li>
                <li><strong>Bespoke Jewelry</strong> - 3-6 weeks depending on design requirements</li>
            </ul>
        ),
    },
];

export default function ProductDetailPage({ product, related = [] }) {
    const images = product.images?.length ? product.images : [product.img, product.img, product.img, product.img];

    const router = useRouter();
    const [activeImage, setActiveImage] = useState(0);
    const [openSection, setOpenSection] = useState("description");
    const [cartOpen, setCartOpen] = useState(false);
    const [qty, setQty] = useState(1);
    const rowRef = useRef(null);

    function scrollRelated(dir) {
        rowRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
    }

    function handleBuyNow() {
        setQty(1);
        setCartOpen(true);
    }

    function handleCheckout() {
        router.push("/checkout");
    }

    const lineTotal = product.price * qty;

    return (
  <>
            <main className="pd-page" style={{ fontFamily: MONT }}>
                <section className="pd-top">
                    <div className="pd-gallery">
                        <div className="pd-thumbs">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    className={`pd-thumb ${activeImage === i ? "pd-thumb-active" : ""}`}
                                    onClick={() => setActiveImage(i)}
                                    aria-label={`View image ${i + 1}`}
                                >
                                    <Image src={img} alt={`${product.title} ${i + 1}`} fill sizes="120px" className="pd-thumb-img" />
                                </button>
                            ))}
                        </div>

                        <div className="pd-main-img-wrap">
                            <Image
                                src={images[activeImage]}
                                alt={product.title}
                                fill
                                priority
                                sizes="(max-width: 900px) 100vw, 55vw"
                                className="pd-main-img"
                            />
                        </div>
                    </div>

                    <div className="pd-info">
                        <h1 className="pd-title">
                            {product.title}
                        </h1>
                        <p className="pd-price">{formatPrice(product.price)}</p>
                        <p className="pd-shipping-note">Shipping calculated at checkout.</p>

                        <div className="pd-actions">
                            <button type="button" className="pd-btn pd-btn-cart">+ Add to Cart</button>
                            <button type="button" className="pd-btn pd-btn-buy" onClick={handleBuyNow}>Buy Now</button>
                        </div>

                        <div className="pd-accordions">
                            {SECTIONS.map((section) => {
                                const isOpen = openSection === section.key;
                                return (
                                    <div key={section.key} className="pd-accordion">
                                        <button
                                            type="button"
                                            className="pd-accordion-head"
                                            onClick={() => setOpenSection(isOpen ? null : section.key)}
                                            aria-expanded={isOpen}
                                        >
                                            {section.label}
                                            <span className={`pd-accordion-icon ${isOpen ? "pd-accordion-icon-open" : ""}`}>+</span>
                                        </button>
                                        {isOpen && (
                                            <div className="pd-accordion-body">
                                                {section.content(product)}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {related.length > 0 && (
                    <section className="pd-related">
                        <h2 className="pd-related-heading">You May Also Like</h2>

                        <div className="pd-related-row-wrap">
                            <button type="button" className="pd-arrow pd-arrow-left" onClick={() => scrollRelated(-1)} aria-label="Previous">‹</button>

                            <div className="pd-related-row" ref={rowRef}>
                                {related.map((p) => (
                                    <Link key={p.id} href={`/product/${p.slug}`} className="pd-related-card">
                                        <div className="pd-related-img-wrap">
                                            <Image src={p.img} alt={p.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="pd-related-img" />
                                        </div>
                                        <h3 className="pd-related-title">
                                            {p.title}
                                        </h3>
                                        <p className="pd-related-subtitle">{p.subtitle}</p>
                                    </Link>
                                ))}
                            </div>

                            <button type="button" className="pd-arrow pd-arrow-right" onClick={() => scrollRelated(1)} aria-label="Next">›</button>

                        </div>

                    </section>

                )}

                {/* ===== Buy Now cart drawer ===== */}
                {cartOpen && (
                    <div className="pdc-overlay" onClick={() => setCartOpen(false)}>
                        <aside className="pdc-drawer" onClick={(e) => e.stopPropagation()}>
                            <button type="button" className="pdc-close" onClick={() => setCartOpen(false)} aria-label="Close cart">
                                ×
                            </button>

                            <h2 className="pdc-heading">Shopping Cart (1)</h2>
                            {/* <div className="pdc-divider" /> */}

                          

                            <div className="pdc-item-row">
                                <div className="pdc-item">
                                    <div className="pdc-item-img-wrap">
                                        <Image src={images[0]} alt={product.title} fill sizes="70px" className="pdc-item-img" />
                                    </div>
                                    <div className="pdc-item-body">
                                        <h3 className="pdc-item-title">{product.title}</h3>
                                        <p className="pdc-item-subtitle">{product.subtitle}</p>
                              <div className="pdc-price-row">
  <p className="pdc-item-price">{formatPrice(product.price)}</p>

  <div className="pdc-qty">
    <button
      type="button"
      className="pdc-qty-btn"
      onClick={() => setQty((q) => Math.max(1, q - 1))}
      aria-label="Decrease quantity"
    >
      −
    </button>

    <span className="pdc-qty-val">{qty}</span>

    <button
      type="button"
      className="pdc-qty-btn"
      onClick={() => setQty((q) => q + 1)}
      aria-label="Increase quantity"
    >
      +
    </button>
  </div>
</div>
                                    </div>
                                </div>

                                
                            </div>

                            {/* spacer pushes the block below to the bottom of the drawer */}
                            <div className="pdc-spacer" />

                            <div className="pdc-bottom">
                                <div className="pdc-divider" />
                                <p className="pdc-note">Complimentary Delivery with Effortless Returns</p>
                                <div className="pdc-divider" />

                                <div className="pdc-total-row">
                                    <span className="pdc-total-label">Estimated Total</span>
                                    <span className="pdc-total-value">{formatPrice(lineTotal)}</span>
                                </div>

                                <div className="pdc-actions">
                                    <button type="button" className="pdc-btn pdc-btn-checkout" onClick={handleCheckout}>
                                        Checkout
                                    </button>
                                    <button type="button" className="pdc-btn pdc-btn-bag" onClick={() => setCartOpen(false)}>
                                        View Shopping Bag
                                    </button>
                                </div>

                                <button type="button" className="pdc-continue" onClick={() => setCartOpen(false)}>
                                    Continue Shopping
                                </button>
                            </div>
                        </aside>
                    </div>
                )}

                <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

.pd-page {
  font-family: "Montserrat", sans-serif;
  color: #141414;
  background: #fff;
}

       .pd-top {
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 32px 60px;
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 48px;
  align-items: start;
}

        .pd-gallery { display: grid; grid-template-columns: 90px 1fr; gap: 16px; }
        .pd-thumbs { display: flex; flex-direction: column; gap: 12px; }
        .pd-thumb {
          position: relative;
          width: 90px;
          aspect-ratio: 1 / 1;
          border: 1px solid #e2e2e2;
          background: #f5f5f5;
          padding: 0;
          cursor: pointer;
          overflow: hidden;
          flex-shrink: 0;
        }
        .pd-thumb-active { border-color: #141414; }
        .pd-thumb-img { object-fit: cover; }

        .pd-main-img-wrap { position: relative; width: 100%; aspect-ratio: 4 / 4; background: #f5f5f5; overflow: hidden; }
        .pd-main-img { object-fit: cover; }

        .pd-info { position: static; top: 24px; }
        .pd-title { font-size: 20px; font-weight: 400; margin: 0 0 12px; letter-spacing: 0.01em; }
        .pd-price { font-size: 18px; font-weight: 700; margin: 0 0 4px; }
        .pd-shipping-note { font-size: 12.5px; color: #6b6b6b; margin: 0 0 24px; }

        .pd-actions { display: flex; gap: 14px; margin-bottom: 32px; }
        .pd-btn {
          flex: 1;
          height: 48px;
          border: none;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: opacity 0.25s ease;
        }
        .pd-btn-cart { background: #1B807F; color: #fff; }
        .pd-btn-buy { background: #141414; color: #fff; }
        .pd-btn:hover { opacity: 0.85; }

        .pd-accordions { border-top: 1px solid #B4AA8F; }
        .pd-accordion { border-bottom: 1px solid #B4AA8F; }
        .pd-accordion-head {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: transparent;
          border: none;
          padding: 16px 0;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Montserrat', sans-serif;
          cursor: pointer;
          color: #141414;
        }
        .pd-accordion-icon { font-size: 18px; transition: transform 0.2s ease; }
        .pd-accordion-icon-open { transform: rotate(45deg); }
        .pd-accordion-body { padding: 0 0 20px; font-size: 13.5px; line-height: 1.8; color: #4a4a4a; }
        .pd-accordion-body ul { margin: 8px 0; padding-left: 18px; }
        .pd-sub-heading { font-weight: 700; margin: 12px 0 4px; font-family: 'Montserrat', sans-serif; font-size: 13px; }

        .pd-related { max-width: 1400px; margin: 0 auto; padding: 40px 32px 80px;  }
        .pd-related-heading { text-align: center; font-size: 24px; margin: 0 0 32px; }
        .pd-related-row-wrap { position: relative; display: flex; align-items: center; gap: 12px; }
        .pd-related-row {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scrollbar-width: none;
          flex: 1;
        }
        .pd-related-row::-webkit-scrollbar { display: none; }
        .pd-related-card { flex: 0 0 240px; text-decoration: none; color: inherit; }
        .pd-related-img-wrap { position: relative; width: 100%; aspect-ratio: 1 / 1; background: #f5f5f5; overflow: hidden; }
        .pd-related-img { object-fit: cover; transition: transform 0.4s ease; }
        .pd-related-card:hover .pd-related-img { transform: scale(1.04); }
     .pd-related-title {
  font-family: "Times New Roman", Times, serif;
  font-size: 13.5px;
  font-weight: 600;
  text-align: center;
  margin: 14px 0 4px;
}
        .pd-related-subtitle { font-size: 11px; color: #6b6b6b; text-align: center; margin: 0; line-height: 1.5; }

        .pd-arrow {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #d8d8d8;
          background: #fff;
          font-size: 20px;
          cursor: pointer;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pd-arrow:hover { border-color: #141414; }

        @media (max-width: 900px) {
          .pd-top { grid-template-columns: 1fr; padding: 28px 20px 40px; gap: 28px; }
          .pd-info { position: static; }
        }

        @media (max-width: 768px) {
          .pd-gallery { grid-template-columns: 1fr; }
          .pd-thumbs { order: 2; flex-direction: row; overflow-x: auto; }
          .pd-thumb { width: 64px; }
          .pd-main-img-wrap { order: 1; }
          .pd-title { font-size: 20px; }
          .pd-price { font-size: 16px; }
          .pd-actions { flex-direction: column; }
          .pd-btn { height: 52px; }
          .pd-related { padding: 32px 20px 56px; }
          .pd-related-card { flex: 0 0 180px; }
          .pd-related-heading { font-size: 18px; }
        }

        /* ===== Buy Now cart drawer ===== */
        .pdc-overlay {
          position: fixed;
          inset: 0;
          background: rgba(120, 120, 120, 0.45);
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
          animation: pdc-fade-in 0.2s ease;
        }
        @keyframes pdc-fade-in { from { opacity: 0; } to { opacity: 1; } }

        .pdc-drawer {
          position: relative;
          width: 420px;
          max-width: 92vw;
          height: 100%;
          background: #f2f2f0;
          box-shadow: -6px 0 24px rgba(0,0,0,0.12);
          padding: 28px 26px 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          animation: pdc-slide-in 0.28s ease;
          font-family: 'Montserrat', sans-serif;
        }
        @keyframes pdc-slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .pdc-close {
          position: absolute;
          top: 20px;
          left: 24px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid #d8d8d4;
          background: #fff;
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #141414;
        }
        .pdc-close:hover { border-color: #141414; }

        .pdc-heading {
          font-family: "Times New Roman", Times, serif;
          font-size: 18px;
          font-weight: 400;
          margin: 44px 0 30px;
        }

        .pdc-divider {  height: 1px; background: #B4AA8F; margin: 18px 0; flex-shrink: 0; }

        .pdc-col-headers {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #8a8a86;
          flex-shrink: 0;
        }

        .pdc-item-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-top: 18px;
          flex-shrink: 0;
        }

        .pdc-item { display: flex; gap: 16px; align-items: flex-start; }
        .pdc-item-img-wrap {
          position: relative;
          width: 100px;
          height: 70px;
          flex-shrink: 0;
          background: #e9e9e6;
          overflow: hidden;
        }
        .pdc-item-img { object-fit: cover; }
        .pdc-item-body { flex: 1; }
        .pdc-item-title {
          font-family: "Times New Roman", Times, serif;
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 6px;
        }
        .pdc-item-subtitle { font-size: 11.5px; color: #6b6b6b; margin: 0 0 8px; line-height: 1.5; }
        .pdc-item-price {
          font-family: "Times New Roman", Times, serif;
          font-size: 13px;
          font-weight: 600;
          margin: 30px 0 0;
          color: #141414;
        }   
          .pdc-price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
}

        .pdc-qty {
          display: flex;
          align-items: center;
          gap: 0;
          border: 1px solid #B4AA8F;
          width: fit-content;
          flex-shrink: 0;
          margin: 30px 0 0;
        }
        .pdc-qty-btn {
          width: 32px;
          height: 32px;
          border: none;
          background: #fff;
          font-size: 15px;
          cursor: pointer;
          color: #141414;
        }
        .pdc-qty-btn:hover { background: #ececea; }
        .pdc-qty-val {
          width: 34px;
          text-align: center;
          font-size: 13px;
        }

        .pdc-spacer { flex: 1 1 auto; min-height: 12px; }

        .pdc-bottom { flex-shrink: 0; }

        .pdc-note { font-size: 12px; color: #6b6b6b; text-align: center; margin: 0; }

        .pdc-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 18px 0 22px;
        }
        .pdc-total-label { font-size: 13.5px; color: #141414; }
        .pdc-total-value {
          font-family: "Times New Roman", Times, serif;
          font-size: 15px;
          font-weight: 700;
        }

        .pdc-actions { display: flex; flex-direction: row; gap: 12px; }
        .pdc-btn {
          flex: 1;
          height: 46px;
          border: none;
          font-family: 'Montserrat', sans-serif;
          font-size: 12.5px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity 0.25s ease;
        }
        .pdc-btn-checkout { background: #1B807F; color: #fff; }
        .pdc-btn-bag { background: #fff; color: #141414; border: 1px solid #B4AA8F; }
        .pdc-btn:hover { opacity: 0.85; }

  .pdc-continue {
  display: block;
  width: fit-content;
  margin: 20px auto 0;
  background: transparent;
  border: none;
  padding: 0;
  font-size: 12px;
  font-family: "Montserrat", sans-serif;
  text-decoration: underline;
  color: #141414;
  cursor: pointer;
  text-align: center;
}
        @media (max-width: 480px) {
          .pdc-actions { flex-direction: column; }
        }

        @media (max-width: 768px) {
          .pdc-drawer { width: 100%; max-width: 100%; padding: 24px 18px 20px; }
        }
      `}</style>
</main>

<Footer />

</>
);
}