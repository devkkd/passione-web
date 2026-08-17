"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  FiGrid,
  FiBox,
  FiLayers,
  FiLogOut,
} from "react-icons/fi";

import api from "@/lib/api";

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: FiGrid,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: FiBox,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: FiLayers,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  };

  return (
    <>
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,

          width: "250px",
          height: "100vh",

          backgroundColor: "#171717",
          color: "#ffffff",

          display: "flex",
          flexDirection: "column",

          zIndex: 1000,

          borderRight: "1px solid #2d2d2d",

          overflow: "hidden",
          boxSizing: "border-box",
        }}
        className="admin-sidebar"
      >
        {/* =====================================================
            BRAND
        ===================================================== */}

        <div
          style={{
            width: "100%",
            padding: "34px 20px 29px",

            textAlign: "center",

            borderBottom: "1px solid #303030",

            boxSizing: "border-box",
            flexShrink: 0,
          }}
        >
          {/* PASSIONE */}

          <div
            style={{
              fontFamily:
                'Georgia, "Times New Roman", serif',

              fontSize: "27px",
              lineHeight: "1.15",

              fontWeight: 500,

              letterSpacing: "0.17em",

              color: "#f3e8cf",

              whiteSpace: "nowrap",
            }}
          >
            PASSIONE
          </div>

          {/* GIOIELLI */}

          <div
            style={{
              marginTop: "7px",

              fontFamily:
                'Georgia, "Times New Roman", serif',

              fontSize: "11px",
              lineHeight: "1",

              letterSpacing: "0.34em",

              color: "#c8b17b",

              whiteSpace: "nowrap",
            }}
          >
            GIOIELLI
          </div>

          {/* LINE */}

          <div
            style={{
              width: "50px",
              height: "1px",

              backgroundColor: "#b4aa8f",

              margin: "21px auto 16px",
            }}
          />

          {/* ADMIN PANEL */}

          <div
            style={{
              fontFamily:
                'Georgia, "Times New Roman", serif',

              fontSize: "10px",
              lineHeight: "1",

              letterSpacing: "0.23em",

              color: "#858585",
            }}
          >
            ADMIN PANEL
          </div>
        </div>

        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <nav
          style={{
            width: "100%",

            padding: "25px 12px",

            display: "flex",
            flexDirection: "column",

            gap: "8px",

            boxSizing: "border-box",

            flex: 1,

            overflowY: "auto",
          }}
        >
          {menuItems.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  width: "100%",
                  minHeight: "48px",

                  display: "flex",
                  alignItems: "center",

                  gap: "14px",

                  padding: "0 14px",

                  boxSizing: "border-box",

                  borderRadius: "2px",

                  border: active
                    ? "1px solid #326f6e"
                    : "1px solid transparent",

                  backgroundColor: active
                    ? "#285f5e"
                    : "transparent",

                  color: active ? "#ffffff" : "#b5b5b5",

                  textDecoration: "none",

                  fontFamily:
                    'Georgia, "Times New Roman", serif',

                  fontSize: "18px",

                  fontWeight: 400,

                  lineHeight: "1",

                  letterSpacing: "0.01em",

                  transition:
                    "all 0.2s ease",
                }}
                className="admin-nav-link"
              >
                <Icon
                  style={{
                    width: "21px",
                    height: "21px",

                    minWidth: "21px",

                    strokeWidth: 1.7,

                    flexShrink: 0,
                  }}
                />

                <span
                  style={{
                    display: "block",

                    fontSize: "18px",

                    fontWeight: 400,

                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* =====================================================
            LOGOUT
        ===================================================== */}

        <div
          style={{
            width: "100%",

            padding: "17px 12px 20px",

            borderTop: "1px solid #303030",

            boxSizing: "border-box",

            flexShrink: 0,
          }}
        >
          <button
            type="button"
            onClick={handleLogout}
            style={{
              width: "100%",
              height: "54px",

              padding: "0 10px",

              border: "1px solid #383838",

              backgroundColor: "transparent",

              color: "#aaa",

              cursor: "pointer",

              display: "flex",
              alignItems: "center",

              gap: "13px",

              boxSizing: "border-box",

              transition:
                "all 0.2s ease",
            }}
            className="admin-logout-button"
          >
            {/* AVATAR */}

            <div
              style={{
                width: "40px",
                height: "40px",

                minWidth: "40px",

                borderRadius: "50%",

                border: "1px solid #383838",

                backgroundColor: "#050505",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                boxSizing: "border-box",
              }}
            >
              <span
                style={{
                  fontFamily:
                    "Arial, sans-serif",

                  fontSize: "18px",

                  fontWeight: 300,

                  color: "#f4f4f4",
                }}
              >
                N
              </span>
            </div>

            {/* LOGOUT CONTENT */}

            <div
              style={{
                display: "flex",
                alignItems: "center",

                gap: "9px",

                fontFamily:
                  'Georgia, "Times New Roman", serif',

                fontSize: "15px",

                color: "#aaa",

                whiteSpace: "nowrap",
              }}
            >
              <FiLogOut
                style={{
                  width: "17px",
                  height: "17px",

                  strokeWidth: 1.5,

                  flexShrink: 0,
                }}
              />

              <span
                style={{
                  fontSize: "15px",
                  lineHeight: "1",
                }}
              >
                Logout
              </span>
            </div>
          </button>
        </div>
      </aside>

      {/* =====================================================
          RESPONSIVE CSS ONLY
          Main styling above is inline.
      ===================================================== */}

      <style jsx global>{`
        .admin-nav-link:hover {
          background-color: #222222 !important;
          border-color: #303030 !important;
          color: #ffffff !important;
        }

        .admin-logout-button:hover {
          background-color: #202020 !important;
          border-color: #666666 !important;
          color: #ffffff !important;
        }

        .admin-logout-button:hover span {
          color: #ffffff;
        }

        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 1000px) {
          .admin-sidebar {
            width: 230px !important;
          }
        }

        /* =========================================
           SMALL TABLET
        ========================================= */

        @media (max-width: 800px) {
          .admin-sidebar {
            width: 215px !important;
          }

          .admin-sidebar > div:first-child {
            padding-top: 29px !important;
            padding-bottom: 25px !important;
          }

          .admin-sidebar > div:first-child
            > div:first-child {
            font-size: 24px !important;
          }

          .admin-nav-link {
            min-height: 46px !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
          }

          .admin-nav-link span {
            font-size: 16px !important;
          }
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 600px) {
          .admin-sidebar {
            width: 195px !important;
          }

          .admin-sidebar > div:first-child {
            padding: 25px 12px 22px !important;
          }

          .admin-sidebar > div:first-child
            > div:first-child {
            font-size: 21px !important;
            letter-spacing: 0.14em !important;
          }

          .admin-sidebar > div:first-child
            > div:nth-child(2) {
            font-size: 9px !important;
          }

          .admin-sidebar > div:first-child
            > div:nth-child(4) {
            font-size: 8px !important;
          }

          .admin-sidebar nav {
            padding: 20px 9px !important;
            gap: 6px !important;
          }

          .admin-nav-link {
            min-height: 43px !important;
            gap: 11px !important;
            padding-left: 11px !important;
            padding-right: 10px !important;
          }

          .admin-nav-link svg {
            width: 19px !important;
            height: 19px !important;
            min-width: 19px !important;
          }

          .admin-nav-link span {
            font-size: 15px !important;
          }

          .admin-sidebar > div:last-child {
            padding: 14px 9px 16px !important;
          }

          .admin-logout-button {
            height: 50px !important;
            gap: 9px !important;
          }

          .admin-logout-button > div:first-child {
            width: 36px !important;
            height: 36px !important;
            min-width: 36px !important;
          }

          .admin-logout-button
            > div:first-child
            span {
            font-size: 16px !important;
          }

          .admin-logout-button
            > div:last-child {
            font-size: 13px !important;
          }

          .admin-logout-button
            > div:last-child
            span {
            font-size: 13px !important;
          }
        }
      `}</style>
    </>
  );
}