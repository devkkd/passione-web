// src/data/gemstonesData.js
// -----------------------------------------------------------------
// SINGLE SOURCE OF TRUTH for every "/gemstones/[slug]" page AND for
// the "GEMSTONES" mega-menu in Header.jsx. Same pattern as
// shopByData.js — see that file for the full explanation.
//
// GEMSTONES has no heading groups in the mega-menu (just one flat,
// alphabetised list split into 3 even columns), so entries here
// don't need a `navGroup` field.
// -----------------------------------------------------------------

import { withSlugs } from "./productHelpers";

const DEFAULT_CATEGORIES = [
  { label: "Rings", img: "/home/28.png", slug: "rings" },
  { label: "Pendants", img: "/home/29.png", slug: "pendants" },
  { label: "Bangles", img: "/home/30.png", slug: "bangles" },
  { label: "Earrings", img: "/home/31.png", slug: "earrings" },
];

const DEFAULT_PRODUCT_BASE = [
  {
    title: "Opal & Iolite Blue Topaz Earrings",
    subtitle: "Opal & Iolite Drop Earrings - Blue Topaz & Silver Statement Earrings",
    price: 1500,
    img: "/home/1.png",
  },
  {
    title: "Rustile Malachite Earrings",
    subtitle: "Rutilated Quartz - Strength Meets Transformation",
    price: 1500,
    img: "/home/2.png",
  },
  {
    title: "Pink Tourmaline Rhodolite Opal",
    subtitle: "Pink Tourmaline & Opal Statement Earrings – Rhodolite Garnet & Rose...",
    price: 1500,
    img: "/home/3.png",
  },
  {
    title: "Emerald Quartz Statement Pendant",
    subtitle: "Emerald Quartz & Silver Pendant - Nature Inspired Setting",
    price: 1500,
    img: "/home/4.png",
  },
];

function buildProducts(count = 12) {
  const list = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    ...DEFAULT_PRODUCT_BASE[i % DEFAULT_PRODUCT_BASE.length],
  }));
  return withSlugs(list);
}

function page(overrides) {
  return {
    heroImage: "/new.png",
    description:
      "Each gemstone is hand-selected for its clarity, colour, and character — sourced responsibly and set to let its natural beauty lead the design.",
    categories: DEFAULT_CATEGORIES,
    products: buildProducts(12),
    seoTitle: `${overrides.navLabel} Jewelry | Passione Jewelry`,
    seoDescription: `Shop ${overrides.navLabel} jewelry at Passione Jewelry — handcrafted in Thailand's ancient gem capital.`,
    ...overrides,
  };
}

export const gemstonesPages = [
  page({ slug: "amethyst", navLabel: "Amethyst", pageTitle: "Amethyst" }),
  page({ slug: "chrysoberyl", navLabel: "Chrysoberyl", pageTitle: "Chrysoberyl" }),
  page({ slug: "citrine", navLabel: "Citrine", pageTitle: "Citrine" }),
  page({ slug: "diamond", navLabel: "Diamond", pageTitle: "Diamond" }),
  page({ slug: "green-amethyst", navLabel: "Green Amethyst", pageTitle: "Green Amethyst" }),
  page({ slug: "chrome-diopside", navLabel: "Chrome Diopside", pageTitle: "Chrome Diopside" }),
  page({ slug: "lemon-quartz", navLabel: "Lemon Quartz", pageTitle: "Lemon Quartz" }),
  page({
    slug: "mandarin-garnet-spessartine",
    navLabel: "Mandarin Garnet (Spessartine)",
    pageTitle: "Mandarin Garnet (Spessartine)",
  }),
  page({ slug: "pearl", navLabel: "Pearl", pageTitle: "Pearl" }),
  page({ slug: "peridot", navLabel: "Peridot", pageTitle: "Peridot" }),
  page({
    slug: "red-garnet-rhodolite",
    navLabel: "Red Garnet (Rhodolite)",
    pageTitle: "Red Garnet (Rhodolite)",
  }),
  page({ slug: "ruby", navLabel: "Ruby", pageTitle: "Ruby" }),
  page({ slug: "sapphire", navLabel: "Sapphire", pageTitle: "Sapphire" }),
  page({ slug: "smoky-quartz", navLabel: "Smoky Quartz", pageTitle: "Smoky Quartz" }),
  page({ slug: "spinel", navLabel: "Spinel", pageTitle: "Spinel" }),
  page({ slug: "topaz", navLabel: "Topaz", pageTitle: "Topaz" }),
  page({ slug: "tsavorite", navLabel: "Tsavorite", pageTitle: "Tsavorite" }),
  page({ slug: "white-zircon", navLabel: "White Zircon", pageTitle: "White Zircon" }),
];

export function getGemstonePage(slug) {
  return gemstonesPages.find((p) => p.slug === slug) || null;
}