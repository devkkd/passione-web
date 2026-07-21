"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer2";
/**
 * ProductListingPage.jsx
 * -----------------------------------------------------------------
 * ONE reusable component that renders EVERY "/shop-by/[slug]" and
 * "/gemstones/[slug]" page. The [slug]/page.jsx route just looks up
 * the right data object and passes it in here — no duplicate pages.
 *
 * Props:
 *  - data:     the page object from shopByData.js / gemstonesData.js
 *              { pageTitle, heroImage, description, categories, products }
 *  - basePath: "/shop-by" or "/gemstones" — used to build category
 *              card links (e.g. basePath + "/" + category.slug).
 *
 * Fonts: Times New Roman for page heading / description / product
 * title. Montserrat for everything else (labels, section heading,
 * subtitle, price, sort control).
 * -----------------------------------------------------------------
 */

const TIMES = '"Times New Roman", Times, serif';
const MONT = "'Montserrat', sans-serif";

const SORT_OPTIONS = [
  { key: "recommended", label: "Recommended" },
  { key: "price-asc", label: "Price Ascending" },
  { key: "price-desc", label: "Price Descending" },
  { key: "newest", label: "Newest" },
];

const PAGE_SIZE = 30;

function formatPrice(n) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

// Builds a compact page-number list with ellipses for large sets,
// e.g. [1, 2, 3, "...", 33].
function buildPageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, 2, total - 1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push("...");
    result.push(p);
    prev = p;
  }
  return result;
}

export default function ProductListingPage({ data, basePath }) {
const {
  pageTitle,
  heroImage,
  description,
  categories = [],
  products = [],
  totalProducts,
} = data;
  const hideCategories = [
  "rings",
  "pendants",
  "bangles",
  "earrings",
].includes(data.slug);

  const [sortKey, setSortKey] = useState("recommended");
  const [sortOpen, setSortOpen] = useState(false);
  const [liked, setLiked] = useState(new Set());
  const [page, setPage] = useState(1);

  const sortRef = useRef(null);
  const sortBtnRef = useRef(null);

  // Reset to page 1 whenever the underlying page data changes
  // (i.e. the user navigated to a different slug).
  useEffect(() => {
    setPage(1);
    setSortKey("recommended");
  }, [data]);

  useEffect(() => {
    function handleOutside(e) {
      if (
        sortOpen &&
        sortRef.current &&
        !sortRef.current.contains(e.target) &&
        sortBtnRef.current &&
        !sortBtnRef.current.contains(e.target)
      ) {
        setSortOpen(false);
      }
    }
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [sortOpen]);

  const sortedProducts = useMemo(() => {
    const list = [...products];
    switch (sortKey) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "newest":
        return list.sort((a, b) => b.id - a.id);
      case "recommended":
      default:
        return list;
    }
  }, [products, sortKey]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = sortedProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const pageList = buildPageList(currentPage, totalPages);

  function toggleLike(id) {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function goToPage(p) {
    setPage(p);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

 return (
  <>

    <main className="page" style={{ fontFamily: MONT }}>
      {/* ---------------- Hero (full width) ---------------- */}
      <section className="hero">
        <Image src={heroImage} alt={pageTitle} fill priority className="hero-img" sizes="100vw" />
      </section>

      {/* ---------------- Heading + description ---------------- */}
      <section className="intro">
        <h1 className="intro-heading" style={{ fontFamily: TIMES }}>
          {pageTitle}
        </h1>
        {description && (
          <p className="intro-desc" style={{ fontFamily: TIMES }}>
            {description}
          </p>
        )}
      </section>

      {/* ---------------- Category cards ---------------- */}
     {!hideCategories && categories.length > 0 && (
        <section className="categories">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`${basePath}/${cat.slug}`} className="category-card">
              <div className="category-img-wrap">
                <Image
                  src={cat.img}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="category-img"
                />
              </div>
              <span className="category-label">{cat.label}</span>
            </Link>
          ))}
        </section>
      )}

      {/* ---------------- Section header: heading + sort ---------------- */}
      <section className="grid-header">
        <h2 className="grid-heading">{pageTitle?.toUpperCase()}</h2>

        <div className="grid-header-right">
         <span className="product-count">
  {totalProducts} Products
</span>

          <div className="sort-wrap">
            <button
              type="button"
              className="sort-btn"
              ref={sortBtnRef}
              aria-expanded={sortOpen}
              onClick={() => setSortOpen((v) => !v)}
            >
              SORT BY
              <svg
                className={`sort-chevron ${sortOpen ? "sort-chevron-open" : ""}`}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {sortOpen && (
              <div className="sort-dropdown" ref={sortRef}>
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    className={`sort-option ${sortKey === opt.key ? "sort-option-active" : ""}`}
                    onClick={() => {
                      setSortKey(opt.key);
                      setPage(1);
                      setSortOpen(false);
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- Product grid ---------------- */}
      <section className="product-grid">
        {pageItems.map((p) => {
          const isLiked = liked.has(p.id);
          return (
            <div key={p.id} className="product-card">
              <button
                type="button"
                className={`wishlist-btn ${isLiked ? "wishlist-active" : ""}`}
                aria-label="Add to wishlist"
                onClick={() => toggleLike(p.id)}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 20.5s-7.5-4.7-9.8-9.1C.6 7.8 2.4 4.5 5.7 4c2-.3 3.7.7 6.3 3 2.6-2.3 4.3-3.3 6.3-3 3.3.5 5.1 3.8 3.5 7.4C19.5 15.8 12 20.5 12 20.5z" />
                </svg>
              </button>

            <Link href={`/product/${p.slug}`} className="product-link">
  <div className="product-img-wrap">
    <Image
      src={p.img}
      alt={p.title}
      fill
      sizes="(max-width: 768px) 50vw, 25vw"
      className="product-img"
    />
  </div>

  <h3 className="product-title" style={{ fontFamily: TIMES }}>
    {p.title}
  </h3>
  <p className="product-subtitle">{p.subtitle}</p>
  <p className="product-price">{formatPrice(p.price)}</p>
</Link>
            </div>
          );
        })}
      </section>

<section className="listing-footer">
  <p className="listing-count">
    Showing {(currentPage - 1) * PAGE_SIZE + 1} -
    {Math.min(currentPage * PAGE_SIZE, totalProducts)}
    {" "}of {totalProducts}
  </p>

 <button
  className="see-more-btn"
  disabled={currentPage === totalPages}
  onClick={() => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  }}
>
  {currentPage === totalPages ? "NO MORE PRODUCTS" : "SEE MORE"}
</button>

  <button
    className="back-top-btn"
    onClick={() =>
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  >
    ↑ BACK TO TOP
  </button>
</section>
     

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");
      `}</style>

      <style jsx>{`
        .page {
          color: #141414;
          background: #ffffff;
        }

        /* ---------------- Hero ---------------- */
        .hero {
          position: relative;
          width: 100%;
          height: 60vh;
          min-height: 340px;
          max-height: 620px;
        }
        .hero-img {
          object-fit: cover;
        }

        /* ---------------- Intro ---------------- */
        .intro {
          max-width: 900px;
          margin: 0 auto;
          padding: 56px 24px 40px;
          text-align: center;
        }
       .intro-heading {
  font-family: "Times New Roman", Times, serif;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 0.02em;
  margin: 0 0 18px;
  color: #141414;
}
        .intro-desc {
          font-size: 14.5px;
          line-height: 1.9;
          color: #4a4a4a;
          margin: 0;
        }

        /* ---------------- Categories ---------------- */
        .categories {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 28px 56px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .category-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        .category-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #f2f2f2;
          transition: opacity 0.3s ease;
        }
        .category-card:hover .category-img-wrap {
          opacity: 0.85;
        }
        .category-img {
          object-fit: cover;
        }
    .category-label {
  display: block;
  width: 100%;
  margin-top: 14px;

  text-align: center;

  font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #141414;
}

        /* ---------------- Grid header ---------------- */
        .grid-header {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 28px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        
        }
        .grid-heading {
  font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.04em;
  margin: 0;
}
        .grid-header-right {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .product-count {
          font-size: 14px;
           font-family: "Times New Roman", Times, serif;
          font-weight: 500;
          color: #0d0c0c;
        }

        .sort-wrap {
          position: relative;
        }
        .sort-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid #d8d8d8;
          padding: 9px 16px;
          font-size: 12px;
          font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif;
          letter-spacing: 0.06em;
          font-family: inherit;
          color: #141414;
          cursor: pointer;
          transition: border-color 0.25s ease;
        }
        .sort-btn:hover {
          border-color: #b3b3b3;
        }
        .sort-chevron {
          transition: transform 0.25s ease;
        }
        .sort-chevron-open {
          transform: rotate(180deg);
        }

        .sort-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          min-width: 200px;
          background: #ffffff;
          border: 1px solid #e2e2e2;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
          z-index: 20;
          display: flex;
          flex-direction: column;
          animation: dropIn 0.15s ease;
        }
        @keyframes dropIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .sort-option {
          text-align: left;
          background: transparent;
          border: none;
          padding: 13px 18px;
          font-size: 13px;
          letter-spacing: 0.02em;
          font-family: inherit;
          color: #141414;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .sort-option:hover {
          background: #f4f4f4;
        }
        .sort-option-active {
          background: #1B807F;
          color: #ffffff;
        }
        .sort-option-active:hover {
          background: #1B807F;
        }

        /* ---------------- Product grid ---------------- */
        .product-grid {
          max-width: 1400px;
          margin: 0 auto;
          padding: 36px 28px 20px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px 28px;
        }

        .product-card {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .wishlist-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 2;
          background: rgba(255, 255, 255, 0.85);
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #141414;
          transition: color 0.25s ease, transform 0.2s ease;
        }
        .wishlist-btn:hover {
          transform: scale(1.08);
        }
        .wishlist-active {
          color: #b0433e;
        }

        .product-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          background: #f5f5f5;
          overflow: hidden;
        }
        .product-img {
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .product-card:hover .product-img {
          transform: scale(1.04);
        }

        .product-title {
          margin: 16px 0 6px;
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-align: center;
        }
        .product-subtitle {
          margin: 0 0 8px;
          font-size: 11.5px;
          color: #0b0a0a;
          text-align: center;
          line-height: 1.5;
        }
        .product-price {
          margin: 0;
          font-size: 13px;
          font-weight: 400;
          text-align: center;
        }
          .product-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

        /* ---------------- Pagination ---------------- */
        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 24px 28px 72px;
          flex-wrap: wrap;
        }
        .page-arrow,
        .page-number {
          min-width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border: 1px solid #e2e2e2;
          font-size: 13px;
          font-family: inherit;
          cursor: pointer;
          color: #141414;
          transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .page-arrow:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .page-number:hover,
        .page-arrow:not(:disabled):hover {
          border-color: #141414;
        }
        .page-number-active {
          background: #141414;
          border-color: #141414;
          color: #ffffff;
        }
        .page-ellipsis {
          padding: 0 4px;
          color: #9a9a9a;
          font-size: 13px;
        }
          .listing-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  padding: 70px 0;
}

.listing-count {
  font-family: "Times New Roman", Times, serif;
  font-size: 18px;
  margin: 0;
}

.see-more-btn {
  width: 220px;
  height: 84px;
  border: 1px solid #d7d7d7;
  background: #fff;
  font-family: "Times New Roman", Times, serif;
  font-size: 14px;
  cursor: pointer;
  transition: all .3s ease;
}

.see-more-btn:hover:not(:disabled) {
  background: #000;
  color: #fff;
}

.see-more-btn:disabled {
  opacity: .45;
  cursor: not-allowed;
}

.back-top-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
}

        /* ================================================================
           Mobile: 4 -> 2 columns (both category row and product grid)
           ================================================================ */
        @media (max-width: 768px) {
          .hero {
            height: 42vh;
            min-height: 240px;
          }
          .intro {
            padding: 40px 20px 30px;
          }
          .intro-heading {
            font-size: 22px;
          }
          .intro-desc {
            font-size: 13px;
            line-height: 1.8;
          }

          .categories {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            padding: 0 16px 40px;
          }
          .category-label {
            font-size: 12.5px;
          }

          .grid-header {
            padding: 0 16px 18px;
          }
          .grid-heading {
            font-size: 15px;
          }
          .grid-header-right {
            gap: 14px;
          }

          .product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px 14px;
            padding: 24px 16px 10px;
          }
          .product-title {
            font-size: 12.5px;
            margin: 12px 0 5px;
          }
          .product-subtitle {
            font-size: 10.5px;
          }
          .product-price {
            font-size: 12px;
          }

          .sort-dropdown {
            min-width: 170px;
          }

          .pagination {
            padding: 20px 16px 56px;
          }
            /* ---------- Footer (Mobile) ---------- */
.listing-footer {
  padding: 50px 20px 70px;
  gap: 24px;
}

.listing-count {
  font-size: 16px;
  text-align: center;
  line-height: 1.5;
}

.see-more-btn {
  width: 100%;
  max-width: 300px;
  height: 58px;
  font-size: 18px;
}

.back-top-btn {
  font-size: 16px;
  padding: 0;
}

.back-top-btn:hover {
  color: #000;
}
        }
@media (max-width: 480px) {
  .listing-footer {
    padding: 40px 16px 60px;
    gap: 20px;
  }

  .listing-count {
    font-size: 15px;
  }

  .see-more-btn {
    width: 100%;
    height: 52px;
    font-size: 16px;
  }

  .back-top-btn {
    font-size: 15px;
  }
}
      `}</style>
</main>

<Footer />

</>
);
}