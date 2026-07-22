"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { shopByPages } from "@/data/shopByData";
import { gemstonesPages } from "@/data/gemstonesData";

/**
 * Header.jsx
 * -----------------------------------------------------------------
 * Passione Jewelry jaisa transparent -> white scroll header, with a
 * click-to-open mega menu for SHOP BY / GEMSTONES.
 *
 * IMPORTANT: the mega-menu content is NOT hardcoded here anymore.
 * It's derived from src/data/shopByData.js and src/data/gemstonesData.js
 * — the exact same files that power the /shop-by/[slug] and
 * /gemstones/[slug] pages. Add a new item there and it shows up in
 * the menu (and has a working page) automatically.
 *
 * Desktop:
 *  - "SHOP BY" / "GEMSTONES" click par uska full-width card header
 *    ke neeche khulta hai. Dono ek sath open nahi ho sakte.
 *  - Active item ke niche underline aata hai.
 *  - Card ka horizontal padding header ke horizontal padding jitna
 *    hi hai (same max-width container + same side padding).
 *  - Card open hote hi header force-solid (white bg) ho jata hai.
 *
 * Mobile (<=960px):
 *  - Hamburger ke andar "SHOP BY"/"GEMSTONES" accordion ki tarah
 *    expand hoke sare items dikhate hain.
 *  - "ABOUT" simple link hi rehta hai.
 *
 * Route change:
 *  - usePathname() se track hota hai. Kisi bhi page par jaate hi
 *    header turant solid white ho jata hai aur khule menus band.
 * -----------------------------------------------------------------
 */

const FONT_FAMILY = '"Times New Roman", Times, serif';

// ---- Build mega-menu columns straight from the data files --------

// Groups items by `navGroup` (used for SHOP BY: FEATURED / TYPE /
// COLLECTION / STYLE), preserving the order items first appear in.
function groupByNavGroup(pages) {
  const columns = [];
  const byHeading = new Map();

  pages.forEach((p) => {
    const heading = p.navGroup || null;
    if (!byHeading.has(heading)) {
      const col = { heading, items: [] };
      byHeading.set(heading, col);
      columns.push(col);
    }
    byHeading.get(heading).items.push({ label: p.navLabel, slug: p.slug });
  });

  return columns;
}

// Splits a flat list (no headings, e.g. GEMSTONES) into N even
// columns for the mega-menu layout.
function chunkFlat(pages, cols = 3) {
  const items = pages.map((p) => ({ label: p.navLabel, slug: p.slug }));
  const size = Math.ceil(items.length / cols);
  const columns = [];
  for (let i = 0; i < cols; i++) {
    columns.push({ heading: null, items: items.slice(i * size, i * size + size) });
  }
  return columns.filter((c) => c.items.length > 0);
}

const SHOP_BY_COLUMNS = groupByNavGroup(shopByPages);
const GEMSTONES_COLUMNS = chunkFlat(gemstonesPages, 3);

const NAV_LINKS = [
  { key: "shop-by", label: "SHOP BY", basePath: "/shop-by", columns: SHOP_BY_COLUMNS },
  { key: "gemstones", label: "GEMSTONES", basePath: "/gemstones", columns: GEMSTONES_COLUMNS },
  { key: "about", label: "ABOUT", href: "/about", columns: null },
];

export default function Header({ isHome = true }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const effectiveIsHome = isHome && isHomePage;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // "shop-by" | "gemstones" | null (desktop)
  const [mobileExpanded, setMobileExpanded] = useState(null); // "shop-by" | "gemstones" | null (mobile)

  const [logoWidth, setLogoWidth] = useState(250);

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);
  const searchRef = useRef(null);
  const searchBtnRef = useRef(null);
  const navRef = useRef(null);
  const dropdownPanelRef = useRef(null);

  useEffect(() => {
    if (!effectiveIsHome) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [effectiveIsHome]);

  // Route change hote hi sab open panels/menus band, header turant solid.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  useEffect(() => {
    function updateLogoWidth() {
      const w = window.innerWidth;
      if (w <= 360) {
        setLogoWidth(110);
      } else if (w <= 640) {
        setLogoWidth(130);
      } else if (w <= 960) {
        setLogoWidth(180);
      } else {
        setLogoWidth(250);
      }
    }

    updateLogoWidth();
    window.addEventListener("resize", updateLogoWidth);
    return () => window.removeEventListener("resize", updateLogoWidth);
  }, []);

  useEffect(() => {
    function handleOutside(e) {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
      if (
        searchOpen &&
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        searchBtnRef.current &&
        !searchBtnRef.current.contains(e.target)
      ) {
        setSearchOpen(false);
      }
      if (
        activeDropdown &&
        navRef.current &&
        !navRef.current.contains(e.target) &&
        dropdownPanelRef.current &&
        !dropdownPanelRef.current.contains(e.target)
      ) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [menuOpen, searchOpen, activeDropdown]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
        setActiveDropdown(null);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const isTransparent = effectiveIsHome && !scrolled && !activeDropdown;

  function toggleDropdown(key) {
    setSearchOpen(false);
    setActiveDropdown((prev) => (prev === key ? null : key));
  }

  function toggleMobileExpanded(key) {
    setMobileExpanded((prev) => (prev === key ? null : key));
  }

  const activeNavData = NAV_LINKS.find((l) => l.key === activeDropdown);

  return (
    <header
      ref={headerRef}
      className={`site-header ${isTransparent ? "is-transparent" : "is-solid"}`}
      style={{ fontFamily: FONT_FAMILY }}
    >
      <div className="header-inner">
        {/* Left: hamburger (mobile) + country selector + nav (desktop) */}
        <div className="header-left">
          <button
            type="button"
            className="hamburger-btn"
            aria-label="Menu"
            aria-expanded={menuOpen}
            ref={menuBtnRef}
            onClick={() => {
              setSearchOpen(false);
              setMenuOpen((v) => !v);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {menuOpen ? (
                <>
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
          <button
            type="button"
            className="mobile-search-btn"
            aria-label="Search"
            aria-expanded={searchOpen}
            ref={searchBtnRef}
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen((v) => !v);
            }}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <button type="button" className="country-btn" style={{ fontFamily: FONT_FAMILY }}>
            <svg
              className="pin-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            THAILAND
          </button>

          <nav className="main-nav" style={{ fontFamily: FONT_FAMILY }} ref={navRef}>
            {NAV_LINKS.map((link) => {
              const hasDropdown = !!link.columns;
              const isActive = hasDropdown
                ? activeDropdown === link.key || pathname.startsWith(link.basePath)
                : pathname.startsWith(link.href);

              if (hasDropdown) {
                return (
                  <button
                    key={link.key}
                    type="button"
                    className={`nav-link ${isActive ? "nav-active" : ""}`}
                    aria-expanded={activeDropdown === link.key}
                    onClick={() => toggleDropdown(link.key)}
                  >
                    {link.label}
                  </button>
                );
              }

              return (
                <Link key={link.key} href={link.href} className={`nav-link ${isActive ? "nav-active" : ""}`}>
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Center: logo */}
        <Link href="/" className="logo">
          <Image
            src={isTransparent ? "/logo10.png" : "/logo7.png"}
            alt="Passion Jewellery"
            width={260}
            height={25}
            priority
            className="logo-image"
            style={{ width: logoWidth, height: "auto" }}
          />
        </Link>

        {/* Right: search + account + wishlist + cart */}
        <div className="header-right">
          <div className="search-box">
            <svg
              className="search-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="SEARCH RINGS, PENDANTS..." style={{ fontFamily: FONT_FAMILY }} />
          </div>

        <Link href="/account">
  <button type="button" className="icon-btn" aria-label="Account">
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  </button>
</Link>
<Link href="/saved">
  <button type="button" className="icon-btn" aria-label="Wishlist">
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 20.5s-7.5-4.7-9.8-9.1C.6 7.8 2.4 4.5 5.7 4c2-.3 3.7.7 6.3 3 2.6-2.3 4.3-3.3 6.3-3 3.3.5 5.1 3.8 3.5 7.4C19.5 15.8 12 20.5 12 20.5z" />
    </svg>
  </button>
</Link>

          <Link href="/cart">
  <button type="button" className="icon-btn" aria-label="Cart">
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M6 8V6a6 6 0 0 1 12 0v2" />
      <rect x="3" y="8" width="18" height="13" rx="2" />
    </svg>
  </button>
</Link>
        </div>

        {/* Mobile search overlay: exactly header-inner ke width/height jitna */}
        {searchOpen && (
          <div className="mobile-search-overlay" ref={searchRef}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="SEARCH RINGS, PENDANTS..."
              autoFocus
              className="mobile-search-input"
              style={{ fontFamily: FONT_FAMILY }}
            />
            <button
              type="button"
              className="mobile-search-close"
              aria-label="Close search"
              onClick={() => setSearchOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Desktop mega-menu card (SHOP BY / GEMSTONES) */}
      {activeDropdown && activeNavData && (
        <div className="dropdown-panel" ref={dropdownPanelRef} style={{ fontFamily: FONT_FAMILY }}>
          <div className="dropdown-inner">
            {activeNavData.columns.map((col, i) => (
              <div className="dropdown-col" key={i}>
                {col.heading && <h4 className="dropdown-heading">{col.heading}</h4>}
                <ul>
                  {col.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`${activeNavData.basePath}/${item.slug}`}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item.label.toUpperCase()}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <div className="mobile-menu" ref={menuRef}>
          <button type="button" className="mobile-country-btn" style={{ fontFamily: FONT_FAMILY }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            THAILAND
          </button>

          {NAV_LINKS.map((link) => {
            const hasDropdown = !!link.columns;

            if (!hasDropdown) {
              return (
                <Link key={link.key} href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              );
            }

            const isExpanded = mobileExpanded === link.key;

            return (
              <div className="mobile-accordion" key={link.key}>
                <button
                  type="button"
                  className="mobile-accordion-trigger"
                  aria-expanded={isExpanded}
                  onClick={() => toggleMobileExpanded(link.key)}
                >
                  {link.label}
                  <svg
                    className={`chevron ${isExpanded ? "chevron-open" : ""}`}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="mobile-accordion-panel">
                    {link.columns.map((col, i) => (
                      <div className="mobile-accordion-group" key={i}>
                        {col.heading && <div className="mobile-accordion-heading">{col.heading}</div>}
                        {col.items.map((item) => (
                          <Link
                            key={item.slug}
                            href={`${link.basePath}/${item.slug}`}
                            className="mobile-accordion-item"
                            onClick={() => setMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <style jsx>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition:
            background-color 0.45s ease,
            backdrop-filter 0.45s ease,
            box-shadow 0.45s ease,
            border-color 0.45s ease;
        }

        /* ---- Transparent + blurred (home page, top of hero) ---- */
        .site-header.is-transparent {
          background-color: rgba(10, 10, 10, 0.18);
          backdrop-filter: blur(10px) saturate(140%);
          -webkit-backdrop-filter: blur(10px) saturate(140%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: none;
        }
        .site-header.is-transparent .main-nav :global(a),
        .site-header.is-transparent .nav-link,
        .site-header.is-transparent .country-btn,
        .site-header.is-transparent .icon-btn,
        .site-header.is-transparent .hamburger-btn,
        .site-header.is-transparent .mobile-search-btn,
        .site-header.is-transparent .search-box,
        .site-header.is-transparent .search-icon {
          color: #FFFBF1;
        }
        .site-header.is-transparent .country-btn {
          border-color: rgba(255, 255, 255, 0.5);
        }
        .site-header.is-transparent .search-box {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.4);
        }
        .site-header.is-transparent .search-box input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        /* ---- Solid white (scrolled, dropdown open, or non-home pages) ---- */
        .site-header.is-solid {
          background-color: #FFFBF1;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border-bottom: 1px solid #ececec;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
        }
        .site-header.is-solid .main-nav :global(a),
        .site-header.is-solid .nav-link,
        .site-header.is-solid .country-btn,
        .site-header.is-solid .icon-btn,
        .site-header.is-solid .hamburger-btn,
        .site-header.is-solid .mobile-search-btn,
        .site-header.is-solid .search-box,
        .site-header.is-solid .search-icon {
          color: #141414;
        }
        .site-header.is-solid .country-btn {
          border-color: #cfcfcf;
        }
        .site-header.is-solid .search-box {
          background: #FFFBF1;
          border-color: #e2e2e2;
        }
        .site-header.is-solid .search-box input::placeholder {
          color: #8a8a8a;
        }

        /* ------------------------- Layout (desktop) ------------------------- */
        .header-inner {
          position: relative;
          max-width: 1400px;
          margin: 0 auto;
          padding: 14px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 26px;
          flex: 1;
        }

        .hamburger-btn {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px;
          align-items: center;
          justify-content: center;
          transition: color 0.4s ease, opacity 0.3s ease;
        }
        .hamburger-btn:hover {
          opacity: 0.65;
        }

        .country-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid;
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 11px;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: color 0.4s ease, border-color 0.4s ease;
          white-space: nowrap;
        }
        .pin-icon {
          flex-shrink: 0;
        }

        .main-nav {
          display: flex;
          align-items: center;
          gap: 22px;
        }
        .main-nav :global(a),
        .nav-link {
          font-size: 12px;
          letter-spacing: 0.08em;
          text-decoration: none;
          color: inherit;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
          position: relative;
          white-space: nowrap;
          transition: color 0.4s ease, opacity 0.3s ease;
          padding-bottom: 4px;
        }
        .main-nav :global(a:hover),
        .nav-link:hover {
          opacity: 0.65;
        }
        .nav-active {
          opacity: 1 !important;
        }
        .nav-active::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: currentColor;
        }

        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .logo-image {
          width: 250px;
          height: auto;
          object-fit: contain;
          display: block;
          transition: opacity 0.35s ease;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
          justify-content: flex-end;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid;
          border-radius: 999px;
          padding: 7px 14px;
          transition: background-color 0.4s ease, border-color 0.4s ease;
        }
        .search-box input {
          background: transparent;
          border: none;
          outline: none;
          font-size: 11px;
          letter-spacing: 0.04em;
          width: 150px;
          color: inherit;
        }
        .search-icon {
          flex-shrink: 0;
          transition: color 0.4s ease;
        }

        .mobile-search-btn {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px;
          align-items: center;
          justify-content: center;
          transition: color 0.4s ease, opacity 0.3s ease;
        }
        .mobile-search-btn:hover {
          opacity: 0.65;
        }

       .icon-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.4s ease, opacity 0.3s ease;

  color: inherit;
  text-decoration: none;
}
        .icon-btn:hover {
          opacity: 0.65;
        }

        /* ------------------------- Desktop mega-menu card ------------------------- */
        .dropdown-panel {
          background: #FFFBF1;
          border-top: 1px solid #ececec;
          border-bottom: 1px solid #ececec;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
          width: 100%;
          animation: dropdownIn 0.2s ease;
        }
        .dropdown-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 32px 28px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 32px 40px;
          color: #141414;
        }
        .dropdown-col {
          display: flex;
          flex-direction: column;
        }
        .dropdown-heading {
          font-size: 12px;
          letter-spacing: 0.08em;
          font-weight: 700;
          margin: 0 0 1px 0;
        }
        .dropdown-col ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .dropdown-col :global(a) {
          font-size: 13px;
          letter-spacing: 0.02em;
          color: #333333;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }
        .dropdown-col :global(a:hover) {
          opacity: 0.6;
        }

        @keyframes dropdownIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ------------------------- Mobile overlays (hidden on desktop) ------------------------- */
        .mobile-search-overlay {
          display: none;
        }
        .mobile-menu {
          display: none;
        }

        /* ================================================================
           Responsive: <=960px -> hamburger + mobile search icon + centered logo
           ================================================================ */
        @media (max-width: 960px) {
          .main-nav {
            display: none;
          }
          .country-btn {
            display: none;
          }

          .hamburger-btn {
            display: flex;
          }
          .mobile-search-btn {
            display: flex;
          }
          .search-box {
            display: none;
          }

          .dropdown-panel {
            display: none;
          }

          .header-inner {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 14px;
          }
          .header-left {
            display: flex;
            align-items: center;
            gap: 8px;
            z-index: 2;
          }
          .header-right {
            display: flex;
            align-items: center;
            gap: 8px;
            z-index: 2;
          }
          .logo {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
          }

          .logo-image {
            width: 180px;
            height: auto;
            display: block;
            object-fit: contain;
          }
          .icon-btn,
          .hamburger-btn,
          .mobile-search-btn {
            padding: 3px;
            flex-shrink: 0;
          }
          .icon-btn svg,
          .mobile-search-btn svg {
            width: 17px;
            height: 17px;
          }

          /* Mobile nav dropdown */
          .mobile-menu {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            max-height: calc(100vh - 60px);
            overflow-y: auto;
            background: #ffffff;
            border-top: 1px solid #ececec;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
            padding: 10px 20px 16px;
            gap: 4px;
            animation: mobileMenuIn 0.2s ease;
          }
          .mobile-menu :global(a) {
            color: #141414;
            font-size: 13px;
            letter-spacing: 0.06em;
            text-decoration: none;
            padding: 12px 4px;
            border-bottom: 1px solid #f0f0f0;
          }
          .mobile-country-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            background: transparent;
            border: 1px solid #cfcfcf;
            color: #141414;
            border-radius: 999px;
            padding: 6px 14px;
            font-size: 11px;
            letter-spacing: 0.06em;
            cursor: pointer;
            width: fit-content;
            margin-bottom: 8px;
          }

          /* Mobile accordion (SHOP BY / GEMSTONES expand inline) */
          .mobile-accordion {
            border-bottom: 1px solid #f0f0f0;
          }
          .mobile-accordion-trigger {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: transparent;
            border: none;
            color: #141414;
            font-size: 13px;
            letter-spacing: 0.06em;
            font-family: inherit;
            padding: 12px 4px;
            cursor: pointer;
          }
          .chevron {
            transition: transform 0.25s ease;
            flex-shrink: 0;
          }
          .chevron-open {
            transform: rotate(180deg);
          }
          .mobile-accordion-panel {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 0 4px 12px 10px;
            animation: mobileMenuIn 0.18s ease;
          }
          .mobile-accordion-group {
            display: flex;
            flex-direction: column;
            gap: 2px;
            margin-bottom: 8px;
          }
          .mobile-accordion-heading {
            font-size: 10px;
            letter-spacing: 0.08em;
            font-weight: 700;
            color: #8a8a8a;
            margin: 6px 0 4px;
          }
          .mobile-accordion-item {
            font-size: 12.5px;
            letter-spacing: 0.02em;
            color: #333333;
            text-decoration: none;
            padding: 7px 4px;
            border-bottom: none !important;
          }

          @keyframes mobileMenuIn {
            from {
              opacity: 0;
              transform: translateY(-6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes mobileSearchIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .mobile-search-overlay {
            display: flex;
            align-items: center;
            gap: 10px;
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            padding: 0 16px;
            background: #ffffff;
            color: #141414;
            z-index: 5;
            animation: mobileSearchIn 0.15s ease;
          }
          .mobile-search-input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            font-size: 13px;
            letter-spacing: 0.04em;
            color: inherit;
            height: 100%;
          }
          .mobile-search-close {
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: inherit;
            flex-shrink: 0;
          }
        }

        @media (max-width: 640px) {
          .logo-image {
            width: 130px;
            height: auto;
          }
          .hamburger-btn {
            display: flex;
          }
        }

        @media (max-width: 360px) {
          .header-inner {
            padding: 8px 8px;
          }
          .header-left {
            gap: 2px;
          }
          .header-right {
            gap: 2px;
          }
          .icon-btn,
          .hamburger-btn,
          .mobile-search-btn {
            padding: 2px;
          }
          .logo-image {
            width: 110px;
            height: auto;
          }
        }
      `}</style>
    </header>
  );
}