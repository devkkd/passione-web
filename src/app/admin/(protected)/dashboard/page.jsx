"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  FiArrowRight,
  FiBox,
  FiFolder,
  FiPlus,
  FiShoppingBag,
  FiTrendingUp,
} from "react-icons/fi";

import api from "@/lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    activeProducts: 0,
    inactiveProducts: 0,
    categories: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [productsRes, categoriesRes] = await Promise.all([
        api.get("/products?limit=1000"),
        api.get("/categories"),
      ]);

      const productsData = productsRes?.data || {};
      const categoriesData = categoriesRes?.data || {};

      const products = productsData.products || [];

      const activeProducts = products.filter(
        (product) => product.active === true
      );

      const inactiveProducts = products.filter(
        (product) => product.active === false
      );

      setStats({
        products:
          productsData.totalProducts ??
          products.length,

        activeProducts: activeProducts.length,

        inactiveProducts: inactiveProducts.length,

        categories:
          categoriesData.categories?.length || 0,
      });
    } catch (error) {
      console.error("Dashboard Error:", error);

      setStats({
        products: 0,
        activeProducts: 0,
        inactiveProducts: 0,
        categories: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pg-dashboard">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="pg-dashboard-header">

        <div className="pg-dashboard-heading">

          <p className="pg-eyebrow">
            PASSIONE GIOIELLI
          </p>

          <h1>
            Dashboard
          </h1>

          <p className="pg-description">
            Manage your jewellery store from one place.
          </p>

        </div>

        <Link
          href="/admin/products/new"
          className="pg-add-product"
        >
          <FiPlus />

          <span>
            Add Product
          </span>
        </Link>

      </header>


      {/* =====================================================
          DIVIDER
      ===================================================== */}

      <div className="pg-divider" />


      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <section className="pg-stats">

        <StatCard
          icon={FiShoppingBag}
          title="Total Products"
          value={stats.products}
          loading={loading}
        />

        <StatCard
          icon={FiTrendingUp}
          title="Active Products"
          value={stats.activeProducts}
          loading={loading}
          accent="green"
        />

        <StatCard
          icon={FiBox}
          title="Inactive Products"
          value={stats.inactiveProducts}
          loading={loading}
          accent="muted"
        />

        <StatCard
          icon={FiFolder}
          title="Categories"
          value={stats.categories}
          loading={loading}
        />

      </section>


      {/* =====================================================
          LOWER CONTENT
      ===================================================== */}

      <section className="pg-content-grid">

        {/* ================= WELCOME ================= */}

        <div className="pg-welcome-card">

          <div>

            <p className="pg-card-eyebrow">
              ADMINISTRATION
            </p>

            <h2>
              Welcome to Passione Gioielli
            </h2>

            <p className="pg-welcome-description">
              From here you can manage products,
              categories, collections, gemstones
              and your jewellery catalogue.
            </p>

          </div>

          <Link
            href="/admin/products"
            className="pg-manage-link"
          >
            <span>
              Manage Products
            </span>

            <FiArrowRight />

          </Link>

        </div>


        {/* ================= QUICK ACTIONS ================= */}

        <div className="pg-quick-card">

          <p className="pg-card-eyebrow">
            QUICK ACTIONS
          </p>

          <div className="pg-quick-actions">

            <Link
              href="/admin/products/new"
              className="pg-quick-action"
            >
              <span className="pg-quick-icon">
                <FiPlus />
              </span>

              <span className="pg-quick-label">
                Add Product
              </span>

              <FiArrowRight className="pg-quick-arrow" />
            </Link>


            <Link
              href="/admin/products"
              className="pg-quick-action"
            >
              <span className="pg-quick-icon">
                <FiShoppingBag />
              </span>

              <span className="pg-quick-label">
                View Products
              </span>

              <FiArrowRight className="pg-quick-arrow" />
            </Link>


            <Link
              href="/admin/categories"
              className="pg-quick-action"
            >
              <span className="pg-quick-icon">
                <FiFolder />
              </span>

              <span className="pg-quick-label">
                Categories
              </span>

              <FiArrowRight className="pg-quick-arrow" />
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          CUSTOM DASHBOARD CSS
      ===================================================== */}

      <style jsx global>{`

        /* =====================================================
           MAIN
        ===================================================== */

        .pg-dashboard {
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

        .pg-dashboard-header {
          width: 100%;

          display: flex;

          align-items: flex-end;

          justify-content: space-between;

          gap: 30px;

          box-sizing: border-box;
        }


        .pg-dashboard-heading {
          min-width: 0;
        }


        .pg-eyebrow {
          margin: 0 0 9px;

          color: #9b8d68;

          font-size: 10px;

          line-height: 1;

          font-weight: 600;

          letter-spacing: 0.22em;

          text-transform: uppercase;
        }


        .pg-dashboard-heading h1 {
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


        .pg-description {
          margin: 11px 0 0;

          color: #777;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 13px;

          line-height: 1.5;
        }


        /* =====================================================
           ADD PRODUCT BUTTON
        ===================================================== */

        .pg-add-product {
          min-height: 45px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 8px;

          padding: 0 19px;

          background: #1b807f;

          border: 1px solid #1b807f;

          color: #ffffff;

          text-decoration: none;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 13px;

          line-height: 1;

          white-space: nowrap;

          box-sizing: border-box;

          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            transform 0.2s ease;
        }


        .pg-add-product svg {
          width: 15px;
          height: 15px;

          stroke-width: 1.7;
        }


        .pg-add-product:hover {
          background: #176d6c;

          border-color: #176d6c;

          transform: translateY(-1px);
        }


        /* =====================================================
           DIVIDER
        ===================================================== */

        .pg-divider {
          width: 100%;

          height: 1px;

          margin: 28px 0 30px;

          background: #ddd8cb;
        }


        /* =====================================================
           STATS GRID
        ===================================================== */

        .pg-stats {
          width: 100%;

          display: grid;

          grid-template-columns:
            repeat(4, minmax(0, 1fr));

          gap: 18px;

          box-sizing: border-box;
        }


        /* =====================================================
           STAT CARD
        ===================================================== */

        .pg-stat-card {
          min-width: 0;

          min-height: 145px;

          padding: 24px;

          background: #ffffff;

          border: 1px solid #e2ddd3;

          box-sizing: border-box;

          transition:
            border-color 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }


        .pg-stat-card:hover {
          border-color: #cfc7b8;

          transform: translateY(-2px);

          box-shadow:
            0 8px 20px rgba(23, 23, 23, 0.035);
        }


        .pg-stat-top {
          display: flex;

          align-items: center;

          gap: 12px;

          min-width: 0;
        }


        .pg-stat-icon {
          width: 34px;
          height: 34px;

          min-width: 34px;

          display: flex;

          align-items: center;

          justify-content: center;

          background: #f7f4ed;

          color: #9b8d68;

          box-sizing: border-box;
        }


        .pg-stat-icon svg {
          width: 17px;
          height: 17px;

          stroke-width: 1.5;
        }


        .pg-stat-title {
          min-width: 0;

          overflow: hidden;

          color: #777;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 10px;

          line-height: 1.3;

          font-weight: 500;

          letter-spacing: 0.11em;

          text-transform: uppercase;

          white-space: nowrap;

          text-overflow: ellipsis;
        }


        .pg-stat-value {
          margin-top: 20px;

          color: #171717;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 36px;

          line-height: 1;

          font-weight: 400;
        }


        .pg-stat-green .pg-stat-icon {
          background: #eef8f7;

          color: #1b807f;
        }


        .pg-stat-muted .pg-stat-icon {
          background: #f3f3f3;

          color: #858585;
        }


        /* =====================================================
           LOWER GRID
        ===================================================== */

        .pg-content-grid {
          width: 100%;

          display: grid;

          grid-template-columns:
            minmax(0, 1.55fr)
            minmax(320px, 1fr);

          gap: 18px;

          margin-top: 18px;

          box-sizing: border-box;
        }


        /* =====================================================
           WELCOME
        ===================================================== */

        .pg-welcome-card {
          min-height: 245px;

          padding: 31px 34px;

          background: #ffffff;

          border: 1px solid #e2ddd3;

          display: flex;

          flex-direction: column;

          justify-content: space-between;

          box-sizing: border-box;
        }


        .pg-card-eyebrow {
          margin: 0 0 14px;

          color: #9b8d68;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 10px;

          line-height: 1;

          font-weight: 600;

          letter-spacing: 0.19em;

          text-transform: uppercase;
        }


        .pg-welcome-card h2 {
          margin: 0;

          color: #171717;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 27px;

          line-height: 1.25;

          font-weight: 400;

          letter-spacing: -0.01em;
        }


        .pg-welcome-description {
          max-width: 650px;

          margin: 15px 0 0;

          color: #707070;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 13px;

          line-height: 1.8;
        }


        .pg-manage-link {
          width: fit-content;

          display: inline-flex;

          align-items: center;

          gap: 9px;

          margin-top: 25px;

          color: #1b807f;

          text-decoration: none;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 13px;

          line-height: 1;

          border-bottom: 1px solid transparent;

          transition:
            border-color 0.2s ease,
            gap 0.2s ease;
        }


        .pg-manage-link svg {
          width: 15px;
          height: 15px;

          stroke-width: 1.5;
        }


        .pg-manage-link:hover {
          gap: 12px;

          border-color: #1b807f;
        }


        /* =====================================================
           QUICK CARD
        ===================================================== */

        .pg-quick-card {
          min-height: 245px;

          padding: 31px;

          background: #ffffff;

          border: 1px solid #e2ddd3;

          box-sizing: border-box;
        }


        .pg-quick-actions {
          width: 100%;

          display: flex;

          flex-direction: column;

          gap: 8px;
        }


        .pg-quick-action {
          width: 100%;

          min-height: 50px;

          display: flex;

          align-items: center;

          gap: 12px;

          padding: 0 13px;

          background: #ffffff;

          border: 1px solid #e7e2d8;

          color: #333;

          text-decoration: none;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 13px;

          line-height: 1;

          box-sizing: border-box;

          transition:
            border-color 0.2s ease,
            background 0.2s ease,
            color 0.2s ease;
        }


        .pg-quick-action:hover {
          border-color: #1b807f;

          background: #fbfdfc;

          color: #1b807f;
        }


        .pg-quick-icon {
          width: 27px;
          height: 27px;

          min-width: 27px;

          display: flex;

          align-items: center;

          justify-content: center;

          color: #9b8d68;
        }


        .pg-quick-icon svg {
          width: 17px;
          height: 17px;

          stroke-width: 1.5;
        }


        .pg-quick-label {
          flex: 1;

          font-size: 13px;

          white-space: nowrap;
        }


        .pg-quick-arrow {
          width: 15px;
          height: 15px;

          color: #aaa;

          stroke-width: 1.5;

          transition:
            color 0.2s ease,
            transform 0.2s ease;
        }


        .pg-quick-action:hover .pg-quick-arrow {
          color: #1b807f;

          transform: translateX(3px);
        }


        /* =====================================================
           LARGE TABLET
        ===================================================== */

        @media (max-width: 1200px) {

          .pg-stats {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .pg-content-grid {
            grid-template-columns: 1fr;
          }

        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 800px) {

          .pg-dashboard-header {
            align-items: flex-start;

            flex-direction: column;

            gap: 20px;
          }


          .pg-add-product {
            width: 100%;
          }


          .pg-dashboard-heading h1 {
            font-size: 35px;
          }


          .pg-content-grid {
            grid-template-columns: 1fr;
          }

        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 600px) {

          .pg-dashboard-heading h1 {
            font-size: 31px;
          }


          .pg-eyebrow {
            font-size: 9px;
          }


          .pg-description {
            font-size: 12px;
          }


          .pg-divider {
            margin: 23px 0;
          }


          .pg-stats {
            grid-template-columns: 1fr;

            gap: 12px;
          }


          .pg-stat-card {
            min-height: 125px;

            padding: 20px;
          }


          .pg-stat-value {
            font-size: 32px;
          }


          .pg-content-grid {
            gap: 12px;

            margin-top: 12px;
          }


          .pg-welcome-card,
          .pg-quick-card {
            padding: 23px;

            min-height: auto;
          }


          .pg-welcome-card h2 {
            font-size: 23px;
          }


          .pg-welcome-description {
            font-size: 12px;

            line-height: 1.7;
          }


          .pg-quick-action {
            min-height: 48px;
          }

        }


        /* =====================================================
           VERY SMALL MOBILE
        ===================================================== */

        @media (max-width: 420px) {

          .pg-dashboard-heading h1 {
            font-size: 28px;
          }


          .pg-add-product {
            min-height: 43px;

            font-size: 12px;
          }


          .pg-stat-card {
            padding: 18px;
          }


          .pg-stat-title {
            font-size: 9px;
          }


          .pg-welcome-card,
          .pg-quick-card {
            padding: 20px;
          }


          .pg-welcome-card h2 {
            font-size: 21px;
          }

        }

      `}</style>

    </div>
  );
}


/* ============================================================
   STAT CARD COMPONENT
============================================================ */

function StatCard({
  icon: Icon,
  title,
  value,
  loading,
  accent = "default",
}) {
  return (
    <div
      className={`pg-stat-card ${
        accent === "green"
          ? "pg-stat-green"
          : accent === "muted"
          ? "pg-stat-muted"
          : ""
      }`}
    >

      <div className="pg-stat-top">

        <div className="pg-stat-icon">
          <Icon />
        </div>

        <span className="pg-stat-title">
          {title}
        </span>

      </div>


      <div className="pg-stat-value">
        {loading ? "—" : value}
      </div>

    </div>
  );
}