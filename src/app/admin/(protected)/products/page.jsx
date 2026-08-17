"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiPackage,
  FiFilter,
  FiX,
} from "react-icons/fi";

import api from "@/lib/api";

export default function ProductsPage() {
  /* =====================================================
     STATE
  ===================================================== */

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =====================================================
     FILTERS
  ===================================================== */

  const [search, setSearch] = useState("");
  const [active, setActive] = useState("");
  const [type, setType] = useState("");
  const [collection, setCollection] = useState("");
  const [sort, setSort] = useState("");

  /* =====================================================
     PAGINATION
  ===================================================== */

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const limit = 10;

  /* =====================================================
     LOAD PRODUCTS
  ===================================================== */

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page,
        limit,
      };

      if (search.trim()) {
        params.search = search.trim();
      }

      if (active !== "") {
        params.active = active;
      }

      if (type) {
        params.type = type;
      }

      if (collection) {
        params.collection = collection;
      }

      if (sort) {
        params.sort = sort;
      }

      const res = await api.get("/products", {
        params,
      });

      setProducts(res.data?.products || []);

      setTotalPages(
        Number(res.data?.totalPages) || 1
      );

      setTotalProducts(
        Number(res.data?.totalProducts) || 0
      );
    } catch (err) {
      console.error("Products Error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [
    page,
    active,
    type,
    collection,
    sort,
  ]);

  /* =====================================================
     SEARCH
  ===================================================== */

  const handleSearch = async (e) => {
    e.preventDefault();

    setPage(1);

    try {
      setLoading(true);
      setError("");

      const params = {
        page: 1,
        limit,
      };

      if (search.trim()) {
        params.search = search.trim();
      }

      if (active !== "") {
        params.active = active;
      }

      if (type) {
        params.type = type;
      }

      if (collection) {
        params.collection = collection;
      }

      if (sort) {
        params.sort = sort;
      }

      const res = await api.get("/products", {
        params,
      });

      setProducts(res.data?.products || []);

      setTotalPages(
        Number(res.data?.totalPages) || 1
      );

      setTotalProducts(
        Number(res.data?.totalProducts) || 0
      );
    } catch (err) {
      console.error("Search Error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to search products."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setSearch("");
    setActive("");
    setType("");
    setCollection("");
    setSort("");
    setPage(1);
  };

  /* =====================================================
     DELETE PRODUCT
  ===================================================== */

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(product._id);

      setError("");
      setSuccess("");

      await api.delete(
        `/products/${product._id}`
      );

      setSuccess(
        "Product deleted successfully."
      );

      await loadProducts();
    } catch (err) {
      console.error(
        "Delete Product Error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to delete product."
      );
    } finally {
      setActionLoading("");
    }
  };

  /* =====================================================
     TOGGLE STATUS
  ===================================================== */

  const handleToggleStatus = async (product) => {
    try {
      setActionLoading(product._id);

      setError("");
      setSuccess("");

      await api.patch(
        `/products/toggle-status/${product._id}`
      );

      setSuccess(
        `Product ${
          product.active
            ? "deactivated"
            : "activated"
        } successfully.`
      );

      await loadProducts();
    } catch (err) {
      console.error(
        "Toggle Product Error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to update product status."
      );
    } finally {
      setActionLoading("");
    }
  };

  /* =====================================================
     PRICE FORMAT
  ===================================================== */

  const formatPrice = (price) => {
    return `$${Number(
      price || 0
    ).toLocaleString("en-US", {
      minimumFractionDigits: 2,
    })}`;
  };

  /* =====================================================
     FILTER CHECK
  ===================================================== */

  const hasFilters =
    search.trim() ||
    active !== "" ||
    type !== "" ||
    collection !== "" ||
    sort !== "";

  /* =====================================================
     PAGINATION NUMBERS
  ===================================================== */

  const getPaginationNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (
        let i = 1;
        i <= totalPages;
        i++
      ) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (page > 3) {
      pages.push("left-dots");
    }

    const start = Math.max(2, page - 1);

    const end = Math.min(
      totalPages - 1,
      page + 1
    );

    for (
      let i = start;
      i <= end;
      i++
    ) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("right-dots");
    }

    pages.push(totalPages);

    return pages;
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="pg-products-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="pg-products-header">

        <div className="pg-products-heading">

          <p className="pg-products-eyebrow">
            PASSIONE GIOIELLI
          </p>

          <h1>
            Products
          </h1>

          <p className="pg-products-description">
            Manage your jewellery products,
            inventory and product status.
          </p>

        </div>

        <Link
          href="/admin/products/new"
          className="pg-products-add"
        >
          <FiPlus />

          <span>
            Add Product
          </span>
        </Link>

      </header>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="pg-products-message pg-products-error">

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={() => setError("")}
          >
            <FiX />
          </button>

        </div>
      )}


      {/* =================================================
          SUCCESS
      ================================================= */}

      {success && (
        <div className="pg-products-message pg-products-success">

          <span>
            {success}
          </span>

          <button
            type="button"
            onClick={() => setSuccess("")}
          >
            <FiX />
          </button>

        </div>
      )}


      {/* =================================================
          FILTER BOX
      ================================================= */}

      <section className="pg-products-filter">

        <div className="pg-filter-heading">

          <FiFilter />

          <span>
            Filters & Search
          </span>

        </div>


        <div className="pg-filter-controls">

          {/* SEARCH */}

          <form
            className="pg-search-form"
            onSubmit={handleSearch}
          >

            <div className="pg-search-input-wrap">

              <FiSearch />

              <input
                type="search"
                placeholder="Search product name or SKU..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              {search && (
                <button
                  type="button"
                  className="pg-search-clear"
                  onClick={() =>
                    setSearch("")
                  }
                >
                  <FiX />
                </button>
              )}

            </div>

            <button
              type="submit"
              className="pg-search-button"
            >
              Search
            </button>

          </form>


          {/* STATUS */}

          <div className="pg-select-wrap">

            <select
              value={active}
              onChange={(e) => {
                setActive(e.target.value);
                setPage(1);
              }}
            >

              <option value="">
                All Status
              </option>

              <option value="true">
                Active
              </option>

              <option value="false">
                Inactive
              </option>

            </select>

          </div>


          {/* SORT */}

          <div className="pg-select-wrap">

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
            >

              <option value="">
                Latest
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="oldest">
                Oldest
              </option>

              <option value="name">
                Name
              </option>

            </select>

          </div>


          {/* CLEAR */}

          <button
            type="button"
            className={`pg-clear-button ${
              hasFilters
                ? "pg-clear-active"
                : ""
            }`}
            onClick={clearFilters}
          >
            <FiX />

            <span>
              Clear
            </span>
          </button>

        </div>

      </section>


      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="pg-products-summary">

        <div>
          <strong>
            {totalProducts}
          </strong>

          <span>
            {totalProducts === 1
              ? " product"
              : " products"}
          </span>
        </div>

        {hasFilters && (
          <span className="pg-filter-applied">
            Filters applied
          </span>
        )}

      </div>


      {/* =================================================
          PRODUCTS TABLE
      ================================================= */}

      <section className="pg-products-table-wrapper">

        {loading ? (

          <div className="pg-products-loading">

            <div className="pg-loading-spinner" />

            <p>
              Loading products...
            </p>

          </div>

        ) : products.length === 0 ? (

          <div className="pg-products-empty">

            <div className="pg-empty-icon">
              <FiPackage />
            </div>

            <h3>
              No products found
            </h3>

            <p>
              Try changing your search
              or filters.
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}

          </div>

        ) : (

          <div className="pg-table-scroll">

            <table className="pg-products-table">

              <thead>

                <tr>

                  <th>
                    Product
                  </th>

                  <th>
                    SKU
                  </th>

                  <th>
                    Type
                  </th>

                  <th>
                    Collection
                  </th>

                  <th>
                    Price
                  </th>

                  <th>
                    Stock
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {products.map((product) => {

                  const image =
                    product.images?.find(
                      (img) =>
                        img.isPrimary
                    )?.url ||
                    product.images?.[0]?.url ||
                    null;

                  const busy =
                    actionLoading ===
                    product._id;

                  return (

                    <tr
                      key={product._id}
                    >

                      {/* PRODUCT */}

                      <td>

                        <div className="pg-product-cell">

                          <div className="pg-product-image">

                            {image ? (

                              <img
                                src={image}
                                alt={
                                  product.name ||
                                  "Product"
                                }
                              />

                            ) : (

                              <FiPackage />

                            )}

                          </div>


                          <div className="pg-product-info">

                            <strong>
                              {product.name}
                            </strong>

                            <span>
                              {product.slug}
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* SKU */}

                      <td>

                        <span className="pg-table-muted">
                          {product.sku || "—"}
                        </span>

                      </td>


                      {/* TYPE */}

                      <td>

                        <span className="pg-category-text">
                          {product.type?.name ||
                            "—"}
                        </span>

                      </td>


                      {/* COLLECTION */}

                      <td>

                        <span className="pg-category-text">
                          {product.collection?.name ||
                            "—"}
                        </span>

                      </td>


                      {/* PRICE */}

                      <td>

                        <div className="pg-price-cell">

                          {product.salePrice &&
                          Number(
                            product.salePrice
                          ) > 0 ? (

                            <>
                              <strong>
                                {formatPrice(
                                  product.salePrice
                                )}
                              </strong>

                              <del>
                                {formatPrice(
                                  product.price
                                )}
                              </del>
                            </>

                          ) : (

                            <strong>
                              {formatPrice(
                                product.price
                              )}
                            </strong>

                          )}

                        </div>

                      </td>


                      {/* STOCK */}

                      <td>

                        <span
                          className={
                            Number(
                              product.stock
                            ) > 0
                              ? "pg-stock pg-stock-in"
                              : "pg-stock pg-stock-out"
                          }
                        >
                          {product.stock}
                        </span>

                      </td>


                      {/* STATUS */}

                      <td>

                        <button
                          type="button"
                          className={
                            product.active
                              ? "pg-status pg-status-active"
                              : "pg-status pg-status-inactive"
                          }
                          disabled={busy}
                          onClick={() =>
                            handleToggleStatus(
                              product
                            )
                          }
                        >

                          <span className="pg-status-dot" />

                          {product.active
                            ? "Active"
                            : "Inactive"}

                        </button>

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div className="pg-actions">

                          <Link
                            href={`/admin/products/${product._id}/edit`}
                            className="pg-edit-button"
                          >
                            <FiEdit2 />

                            <span>
                              Edit
                            </span>
                          </Link>


                          <button
                            type="button"
                            className="pg-delete-button"
                            disabled={busy}
                            onClick={() =>
                              handleDelete(
                                product
                              )
                            }
                          >
                            <FiTrash2 />

                            <span>
                              Delete
                            </span>
                          </button>

                        </div>

                      </td>

                    </tr>

                  );
                })}

              </tbody>

            </table>

          </div>

        )}

      </section>


      {/* =================================================
          PAGINATION
      ================================================= */}

      {!loading &&
        products.length > 0 &&
        totalPages > 1 && (

          <div className="pg-pagination">

            {/* PREVIOUS */}

            <button
              type="button"
              className="pg-pagination-arrow"
              disabled={page === 1}
              onClick={() =>
                setPage((current) =>
                  Math.max(
                    1,
                    current - 1
                  )
                )
              }
            >

              <FiChevronLeft />

              <span>
                Previous
              </span>

            </button>


            {/* PAGE NUMBERS */}

            <div className="pg-pagination-numbers">

              {getPaginationNumbers().map(
                (item, index) => {

                  if (
                    item ===
                      "left-dots" ||
                    item ===
                      "right-dots"
                  ) {
                    return (
                      <span
                        key={`${item}-${index}`}
                        className="pg-pagination-dots"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={item}
                      type="button"
                      className={
                        page === item
                          ? "pg-page-button pg-page-active"
                          : "pg-page-button"
                      }
                      onClick={() =>
                        setPage(item)
                      }
                    >
                      {item}
                    </button>
                  );
                }
              )}

            </div>


            {/* NEXT */}

            <button
              type="button"
              className="pg-pagination-arrow"
              disabled={
                page === totalPages
              }
              onClick={() =>
                setPage((current) =>
                  Math.min(
                    totalPages,
                    current + 1
                  )
                )
              }
            >

              <span>
                Next
              </span>

              <FiChevronRight />

            </button>

          </div>

        )}


      {/* =================================================
          CUSTOM GLOBAL CSS
      ================================================= */}

      <style jsx global>{`

        /* =====================================================
           MAIN PAGE
        ===================================================== */

        .pg-products-page {
          width: 100%;
          max-width: 1500px;

          margin: 0 auto;
          padding: 0;

          box-sizing: border-box;

          color: #171717;

          font-family:
            Georgia,
            "Times New Roman",
            serif;
        }


        /* =====================================================
           HEADER
        ===================================================== */

        .pg-products-header {
          width: 100%;

          display: flex;
          align-items: flex-end;
          justify-content: space-between;

          gap: 30px;

          margin-bottom: 28px;

          box-sizing: border-box;
        }


        .pg-products-heading {
          min-width: 0;
        }


        .pg-products-eyebrow {
          margin: 0 0 9px;

          color: #9b8d68;

          font-family:
            Arial,
            sans-serif;

          font-size: 10px;

          line-height: 1;

          font-weight: 600;

          letter-spacing: 0.22em;

          text-transform: uppercase;
        }


        .pg-products-heading h1 {
          margin: 0;

          color: #171717;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 40px;

          line-height: 1.05;

          font-weight: 400;

          letter-spacing: -0.02em;
        }


        .pg-products-description {
          margin: 10px 0 0;

          color: #777;

          font-family:
            Arial,
            sans-serif;

          font-size: 13px;

          line-height: 1.5;
        }


        /* =====================================================
           ADD PRODUCT
        ===================================================== */

        .pg-products-add {
          min-height: 45px;

          display: inline-flex;

          align-items: center;
          justify-content: center;

          gap: 8px;

          padding: 0 20px;

          background: #1b807f;

          border: 1px solid #1b807f;

          color: #fff;

          text-decoration: none;

          font-family:
            Arial,
            sans-serif;

          font-size: 12px;

          font-weight: 500;

          white-space: nowrap;

          box-sizing: border-box;

          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }


        .pg-products-add svg {
          width: 16px;
          height: 16px;

          stroke-width: 1.7;
        }


        .pg-products-add:hover {
          background: #176d6c;

          transform: translateY(-1px);
        }


        /* =====================================================
           MESSAGES
        ===================================================== */

        .pg-products-message {
          width: 100%;

          min-height: 44px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 15px;

          padding: 10px 14px;

          margin-bottom: 18px;

          box-sizing: border-box;

          font-family:
            Arial,
            sans-serif;

          font-size: 12px;
        }


        .pg-products-message button {
          width: 28px;
          height: 28px;

          display: flex;

          align-items: center;
          justify-content: center;

          border: none;

          background: transparent;

          color: inherit;

          cursor: pointer;
        }


        .pg-products-message button svg {
          width: 15px;
          height: 15px;
        }


        .pg-products-error {
          background: #fff4f3;

          border: 1px solid #efcfcb;

          color: #a32920;
        }


        .pg-products-success {
          background: #eff9f6;

          border: 1px solid #c4e1da;

          color: #17665f;
        }


        /* =====================================================
           FILTER BOX
        ===================================================== */

        .pg-products-filter {
          width: 100%;

          padding: 18px;

          background: #fff;

          border: 1px solid #e2ddd3;

          box-sizing: border-box;

          margin-bottom: 13px;
        }


        .pg-filter-heading {
          display: flex;

          align-items: center;

          gap: 7px;

          margin-bottom: 13px;

          color: #777;

          font-family:
            Arial,
            sans-serif;

          font-size: 10px;

          font-weight: 600;

          letter-spacing: 0.13em;

          text-transform: uppercase;
        }


        .pg-filter-heading svg {
          width: 14px;
          height: 14px;

          color: #9b8d68;
        }


        .pg-filter-controls {
          width: 100%;

          display: grid;

          grid-template-columns:
            minmax(280px, 1fr)
            160px
            180px
            90px;

          gap: 9px;

          align-items: stretch;
        }


        /* =====================================================
           SEARCH
        ===================================================== */

        .pg-search-form {
          min-width: 0;

          display: flex;

          height: 43px;
        }


        .pg-search-input-wrap {
          min-width: 0;

          flex: 1;

          position: relative;

          display: flex;

          align-items: center;
        }


        .pg-search-input-wrap > svg {
          position: absolute;

          left: 13px;

          width: 16px;
          height: 16px;

          color: #999;

          pointer-events: none;

          z-index: 2;
        }


        .pg-search-input-wrap input {
          width: 100%;

          height: 43px;

          padding:
            0 38px
            0 39px;

          border: 1px solid #d8d4ca;

          outline: none;

          background: #fff;

          color: #222;

          font-family:
            Arial,
            sans-serif;

          font-size: 12px;

          box-sizing: border-box;
        }


        .pg-search-input-wrap input::placeholder {
          color: #aaa;
        }


        .pg-search-input-wrap input:focus {
          border-color: #1b807f;

          box-shadow:
            0 0 0 2px
            rgba(
              27,
              128,
              127,
              0.07
            );
        }


        .pg-search-clear {
          position: absolute;

          right: 7px;

          top: 50%;

          width: 28px;
          height: 28px;

          transform:
            translateY(-50%);

          display: flex;

          align-items: center;
          justify-content: center;

          border: none;

          background: transparent;

          color: #999;

          cursor: pointer;
        }


        .pg-search-clear svg {
          width: 14px;
          height: 14px;
        }


        .pg-search-clear:hover {
          color: #222;
        }


        .pg-search-button {
          width: 90px;

          height: 43px;

          flex-shrink: 0;

          border: 1px solid #1b807f;

          background: #1b807f;

          color: #fff;

          cursor: pointer;

          font-family:
            Arial,
            sans-serif;

          font-size: 12px;

          transition:
            background 0.2s ease;
        }


        .pg-search-button:hover {
          background: #176d6c;
        }


        /* =====================================================
           SELECTS
        ===================================================== */

        .pg-select-wrap {
          position: relative;

          min-width: 0;
        }


        .pg-select-wrap::after {
          content: "";

          position: absolute;

          right: 13px;

          top: 50%;

          width: 6px;
          height: 6px;

          border-right:
            1px solid #555;

          border-bottom:
            1px solid #555;

          transform:
            translateY(-65%)
            rotate(45deg);

          pointer-events: none;
        }


        .pg-select-wrap select {
          width: 100%;

          height: 43px;

          padding:
            0 34px
            0 12px;

          border: 1px solid #d8d4ca;

          outline: none;

          background: #fff;

          color: #333;

          font-family:
            Arial,
            sans-serif;

          font-size: 12px;

          appearance: none;

          cursor: pointer;

          box-sizing: border-box;
        }


        .pg-select-wrap select:focus {
          border-color: #1b807f;
        }


        /* =====================================================
           CLEAR
        ===================================================== */

        .pg-clear-button {
          height: 43px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 6px;

          padding: 0 10px;

          border: 1px solid #d8d4ca;

          background: #fff;

          color: #777;

          cursor: pointer;

          font-family:
            Arial,
            sans-serif;

          font-size: 11px;

          transition:
            border-color 0.2s ease,
            color 0.2s ease,
            background 0.2s ease;
        }


        .pg-clear-button svg {
          width: 13px;
          height: 13px;
        }


        .pg-clear-button:hover,
        .pg-clear-active {
          color: #1b807f;

          border-color: #1b807f;

          background: #fbfdfc;
        }


        /* =====================================================
           SUMMARY
        ===================================================== */

        .pg-products-summary {
          min-height: 30px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 15px;

          margin-bottom: 9px;

          color: #777;

          font-family:
            Arial,
            sans-serif;

          font-size: 11px;
        }


        .pg-products-summary strong {
          color: #333;

          font-weight: 600;
        }


        .pg-filter-applied {
          color: #1b807f;

          font-size: 10px;

          letter-spacing: 0.04em;
        }


        /* =====================================================
           TABLE WRAPPER
        ===================================================== */

        .pg-products-table-wrapper {
          width: 100%;

          background: #fff;

          border: 1px solid #e2ddd3;

          box-sizing: border-box;

          overflow: hidden;
        }


        .pg-table-scroll {
          width: 100%;

          overflow-x: auto;

          overflow-y: hidden;

          scrollbar-width: thin;

          scrollbar-color:
            #c9c3b7
            #f6f4ef;
        }


        .pg-table-scroll::-webkit-scrollbar {
          height: 7px;
        }


        .pg-table-scroll::-webkit-scrollbar-track {
          background: #f6f4ef;
        }


        .pg-table-scroll::-webkit-scrollbar-thumb {
          background: #c9c3b7;
        }


        /* =====================================================
           TABLE
        ===================================================== */

        .pg-products-table {
          width: 100%;

          min-width: 1100px;

          border-collapse: collapse;

          table-layout: auto;
        }


        .pg-products-table thead tr {
          background: #faf9f6;
        }


        .pg-products-table th {
          height: 48px;

          padding: 0 15px;

          border-bottom:
            1px solid #e2ddd3;

          color: #777;

          font-family:
            Arial,
            sans-serif;

          font-size: 10px;

          line-height: 1;

          font-weight: 600;

          letter-spacing: 0.09em;

          text-align: left;

          text-transform: uppercase;

          white-space: nowrap;
        }


        .pg-products-table td {
          height: 76px;

          padding: 9px 15px;

          border-bottom:
            1px solid #eeeae1;

          color: #333;

          font-family:
            Arial,
            sans-serif;

          font-size: 12px;

          line-height: 1.3;

          vertical-align: middle;

          white-space: nowrap;

          box-sizing: border-box;
        }


        .pg-products-table tbody tr:last-child td {
          border-bottom: none;
        }


        .pg-products-table tbody tr {
          transition:
            background 0.15s ease;
        }


        .pg-products-table tbody tr:hover {
          background: #fdfcf9;
        }


        /* =====================================================
           PRODUCT
        ===================================================== */

        .pg-product-cell {
          min-width: 245px;

          display: flex;

          align-items: center;

          gap: 13px;
        }


        .pg-product-image {
          width: 55px;
          height: 55px;

          min-width: 55px;

          display: flex;

          align-items: center;
          justify-content: center;

          overflow: hidden;

          background: #f5f3ed;

          border: 1px solid #eee9df;

          color: #aaa;

          box-sizing: border-box;
        }


        .pg-product-image img {
          width: 100%;
          height: 100%;

          display: block;

          object-fit: cover;
        }


        .pg-product-image svg {
          width: 20px;
          height: 20px;

          stroke-width: 1.3;
        }


        .pg-product-info {
          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 5px;
        }


        .pg-product-info strong {
          max-width: 210px;

          overflow: hidden;

          color: #222;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 13px;

          font-weight: 600;

          white-space: nowrap;

          text-overflow: ellipsis;
        }


        .pg-product-info span {
          max-width: 210px;

          overflow: hidden;

          color: #999;

          font-family:
            Arial,
            sans-serif;

          font-size: 10px;

          white-space: nowrap;

          text-overflow: ellipsis;
        }


        /* =====================================================
           TABLE TEXT
        ===================================================== */

        .pg-table-muted {
          color: #888;

          font-family:
            Arial,
            sans-serif;

          font-size: 11px;
        }


        .pg-category-text {
          color: #444;

          font-family:
            Arial,
            sans-serif;

          font-size: 12px;
        }


        /* =====================================================
           PRICE
        ===================================================== */

        .pg-price-cell {
          display: flex;

          flex-direction: column;

          gap: 4px;
        }


        .pg-price-cell strong {
          color: #171717;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 13px;

          font-weight: 600;
        }


        .pg-price-cell del {
          color: #999;

          font-family:
            Arial,
            sans-serif;

          font-size: 10px;
        }


        /* =====================================================
           STOCK
        ===================================================== */

        .pg-stock {
          display: inline-flex;

          align-items: center;

          justify-content: center;

          min-width: 34px;

          height: 26px;

          padding: 0 7px;

          font-family:
            Arial,
            sans-serif;

          font-size: 11px;

          box-sizing: border-box;
        }


        .pg-stock-in {
          background: #edf8f5;

          color: #17665f;
        }


        .pg-stock-out {
          background: #fff1f1;

          color: #b42318;
        }


        /* =====================================================
           STATUS
        ===================================================== */

        .pg-status {
          height: 29px;

          display: inline-flex;

          align-items: center;

          gap: 6px;

          padding: 0 9px;

          border: none;

          cursor: pointer;

          font-family:
            Arial,
            sans-serif;

          font-size: 10px;

          font-weight: 500;

          box-sizing: border-box;
        }


        .pg-status-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: currentColor;
        }


        .pg-status-active {
          background: #edf8f5;

          color: #17665f;
        }


        .pg-status-inactive {
          background: #fff1f1;

          color: #b42318;
        }


        .pg-status:disabled {
          opacity: 0.45;

          cursor: not-allowed;
        }


        /* =====================================================
           ACTIONS
        ===================================================== */

        .pg-actions {
          display: flex;

          align-items: center;

          gap: 7px;
        }


        .pg-edit-button,
        .pg-delete-button {
          height: 31px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 6px;

          padding: 0 10px;

          background: #fff;

          font-family:
            Arial,
            sans-serif;

          font-size: 10px;

          text-decoration: none;

          cursor: pointer;

          box-sizing: border-box;

          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            color 0.2s ease;
        }


        .pg-edit-button {
          border:
            1px solid #d8d4ca;

          color: #333;
        }


        .pg-edit-button:hover {
          border-color: #1b807f;

          color: #1b807f;

          background: #fbfdfc;
        }


        .pg-delete-button {
          border:
            1px solid #e2c9c5;

          color: #b42318;
        }


        .pg-delete-button:hover {
          border-color: #b42318;

          background: #fff5f4;
        }


        .pg-edit-button svg,
        .pg-delete-button svg {
          width: 13px;
          height: 13px;

          stroke-width: 1.5;
        }


        .pg-delete-button:disabled {
          opacity: 0.45;

          cursor: not-allowed;
        }


        /* =====================================================
           LOADING
        ===================================================== */

        .pg-products-loading {
          min-height: 300px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          gap: 14px;

          color: #777;

          font-family:
            Arial,
            sans-serif;

          font-size: 12px;
        }


        .pg-products-loading p {
          margin: 0;
        }


        .pg-loading-spinner {
          width: 25px;
          height: 25px;

          border:
            2px solid #e9e5dc;

          border-top-color:
            #1b807f;

          border-radius: 50%;

          animation:
            pg-spin
            0.8s
            linear
            infinite;
        }


        @keyframes pg-spin {
          to {
            transform:
              rotate(360deg);
          }
        }


        /* =====================================================
           EMPTY
        ===================================================== */

        .pg-products-empty {
          min-height: 330px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          padding: 40px 20px;

          text-align: center;

          box-sizing: border-box;
        }


        .pg-empty-icon {
          width: 54px;
          height: 54px;

          display: flex;

          align-items: center;
          justify-content: center;

          margin-bottom: 15px;

          background: #f7f4ed;

          color: #9b8d68;

          border:
            1px solid #e8e1d5;
        }


        .pg-empty-icon svg {
          width: 22px;
          height: 22px;

          stroke-width: 1.3;
        }


        .pg-products-empty h3 {
          margin: 0 0 7px;

          color: #222;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 17px;

          font-weight: 500;
        }


        .pg-products-empty p {
          margin: 0;

          color: #888;

          font-family:
            Arial,
            sans-serif;

          font-size: 12px;
        }


        .pg-products-empty button {
          height: 36px;

          margin-top: 18px;

          padding: 0 15px;

          border:
            1px solid #d8d4ca;

          background: #fff;

          color: #555;

          cursor: pointer;

          font-family:
            Arial,
            sans-serif;

          font-size: 11px;
        }


        .pg-products-empty button:hover {
          border-color: #1b807f;

          color: #1b807f;
        }


        /* =====================================================
           PAGINATION
        ===================================================== */

        .pg-pagination {
          width: 100%;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 18px;

          padding: 24px 0 8px;

          box-sizing: border-box;
        }


        /* PREVIOUS / NEXT */

        .pg-pagination-arrow {
          height: 38px;

          min-width: 92px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 7px;

          padding: 0 13px;

          border:
            1px solid #ddd8ce;

          background: #fff;

          color: #444;

          cursor: pointer;

          font-family:
            Arial,
            sans-serif;

          font-size: 11px;

          transition:
            color 0.2s ease,
            border-color 0.2s ease,
            background 0.2s ease;
        }


        .pg-pagination-arrow svg {
          width: 14px;
          height: 14px;

          stroke-width: 1.5;
        }


        .pg-pagination-arrow:hover:not(:disabled) {
          color: #1b807f;

          border-color: #1b807f;

          background: #fbfdfc;
        }


        .pg-pagination-arrow:disabled {
          opacity: 0.35;

          cursor: not-allowed;

          background: #fafafa;
        }


        /* PAGE NUMBERS */

        .pg-pagination-numbers {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 5px;
        }


        .pg-page-button {
          width: 36px;
          height: 36px;

          display: inline-flex;

          align-items: center;
          justify-content: center;

          border:
            1px solid transparent;

          background: transparent;

          color: #777;

          cursor: pointer;

          font-family:
            Arial,
            sans-serif;

          font-size: 11px;

          transition:
            color 0.2s ease,
            background 0.2s ease,
            border-color 0.2s ease;
        }


        .pg-page-button:hover {
          color: #1b807f;

          border-color: #d8d4ca;

          background: #fff;
        }


        /* ACTIVE */

        .pg-page-active {
          background: #1b807f;

          border-color: #1b807f;

          color: #fff;

          font-weight: 600;
        }


        .pg-page-active:hover {
          background: #176d6c;

          border-color: #176d6c;

          color: #fff;
        }


        /* DOTS */

        .pg-pagination-dots {
          width: 26px;

          height: 36px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          color: #aaa;

          font-size: 12px;

          user-select: none;
        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 1100px) {

          .pg-filter-controls {
            grid-template-columns:
              minmax(250px, 1fr)
              150px
              165px
              85px;
          }


          .pg-products-table {
            min-width: 1050px;
          }

        }


        /* =====================================================
           SMALL TABLET
        ===================================================== */

        @media (max-width: 850px) {

          .pg-products-header {
            align-items: flex-start;

            flex-direction: column;

            gap: 18px;
          }


          .pg-products-add {
            width: 100%;
          }


          .pg-filter-controls {
            grid-template-columns:
              1fr 1fr;
          }


          .pg-search-form {
            grid-column: 1 / -1;
          }


          .pg-clear-button {
            width: 100%;
          }


          .pg-products-heading h1 {
            font-size: 36px;
          }

        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 600px) {

          .pg-products-heading h1 {
            font-size: 32px;
          }


          .pg-products-eyebrow {
            font-size: 9px;
          }


          .pg-products-description {
            font-size: 12px;
          }


          .pg-products-filter {
            padding: 13px;
          }


          .pg-filter-controls {
            grid-template-columns: 1fr;
          }


          .pg-search-form {
            width: 100%;

            grid-column: auto;
          }


          .pg-search-button {
            width: 82px;
          }


          .pg-select-wrap,
          .pg-select-wrap select,
          .pg-clear-button {
            width: 100%;
          }


          .pg-products-summary {
            margin-top: 4px;
          }


          .pg-products-table-wrapper {
            border-left:
              1px solid #e2ddd3;

            border-right:
              1px solid #e2ddd3;
          }


          .pg-products-table {
            min-width: 1000px;
          }


          .pg-products-table th {
            height: 45px;

            padding: 0 12px;
          }


          .pg-products-table td {
            padding: 8px 12px;
          }


          .pg-product-image {
            width: 50px;
            height: 50px;

            min-width: 50px;
          }


          .pg-product-info strong {
            font-size: 12px;
          }


          /* MOBILE PAGINATION */

          .pg-pagination {
            gap: 8px;

            padding-top: 20px;

            padding-bottom: 5px;
          }


          .pg-pagination-arrow {
            min-width: 38px;

            width: 38px;

            height: 36px;

            padding: 0;
          }


          .pg-pagination-arrow span {
            display: none;
          }


          .pg-pagination-numbers {
            gap: 3px;
          }


          .pg-page-button {
            width: 32px;

            height: 32px;

            font-size: 10px;
          }


          .pg-pagination-dots {
            width: 17px;

            height: 32px;

            font-size: 10px;
          }

        }


        /* =====================================================
           VERY SMALL MOBILE
        ===================================================== */

        @media (max-width: 420px) {

          .pg-products-heading h1 {
            font-size: 29px;
          }


          .pg-products-add {
            min-height: 42px;
          }


          .pg-products-message {
            font-size: 11px;
          }


          .pg-products-summary {
            font-size: 10px;
          }


          .pg-pagination {
            gap: 5px;
          }


          .pg-pagination-arrow {
            width: 32px;

            min-width: 32px;

            height: 32px;
          }


          .pg-page-button {
            width: 29px;

            height: 29px;
          }


          .pg-pagination-dots {
            width: 12px;

            height: 29px;
          }

        }

      `}</style>

    </div>
  );
}