// src/data/shopByData.js
// -----------------------------------------------------------------
// SINGLE SOURCE OF TRUTH for:
//   1. Every "/shop-by/[slug]" page (hero, description, categories,
//      products, SEO).
//   2. The "SHOP BY" mega-menu in Header.jsx (navGroup + navLabel +
//      slug) — Header reads this same array, so the menu and the
//      pages can never go out of sync.
//
// TO ADD A NEW PAGE: add one object to `shopByPages` below. No new
// route file, no Header edit needed — /shop-by/[slug]/page.jsx and
// the mega-menu both pick it up automatically.
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

const EARRINGS_PRODUCTS = [
  {
    title: "Opal & Iolite Blue Topaz Earrings",
    subtitle:
      "Opal & Iolite Drop Earrings - Blue Topaz & Silver Statement Earrings",
    price: 1500,
    img: "/earings/1.png",
  },
  {
    title: "Rustile Malachite Earrings",
    subtitle:
      "Rutilated Quartz - Strength Meets Transformation",
    price: 1500,
    img: "/earings/2.png",
  },
  {
    title: "Pink Tourmaline Rhodolite Opal",
    subtitle:
      "Pink Tourmaline & Opal Statement Earrings – Rhodolite Garnet & Rose...",
    price: 1500,
    img: "/earings/3.png",
  },
];

function buildEarringProducts(count = 12) {
  const list = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    ...EARRINGS_PRODUCTS[i % EARRINGS_PRODUCTS.length],
  }));
  return withSlugs(list);
}

const RINGS_PRODUCTS = [
  {
    title: "Green Tourmaline Ring",
    subtitle: "Known for its vibrant color and clear sparkle, this beautiful ring showcases...",
    price: 1500,
    img: "/rings/1.png",
  },
  {
    title: "Citrine Ring",
    subtitle: "Illuminate your elegance with our exquisite Citrine Ring...",
    price: 1500,
    img: "/rings/2.png",
  },
  {
    title: "Green Amethyst Ring",
    subtitle: "Expertly crafted to showcase an luminous green amethyst, this unique...",
    price: 1500,
    img: "/rings/3.png",
  },
];

function buildRingProducts(count = 12) {
  const list = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    ...RINGS_PRODUCTS[i % RINGS_PRODUCTS.length],
  }));
  return withSlugs(list);
}

const PENDANTS_PRODUCTS = [
  {
    title: "Ethiopian Opal with Chain Pendant",
    subtitle:
      "Ethiopian Opal & Sapphire Jewelry – A Radiant Fusion of Fire & Royalty",
    price: 1500,
    img: "/pendants/1.png",
  },
  {
    title: "Ethiopian Opal Pendant",
    subtitle:
      "At Passione Jewelry, we proudly present the mesmerizing Ethiopian Opal...",
    price: 1500,
    img: "/pendants/2.png",
  },
  {
    title: "Blue Topaz Pendant",
    subtitle:
      "This captivating piece features a stunning Blue Topaz gemstone, radiating timeless elegance.",
    price: 1500,
    img: "/pendants/3.png",
  },
];

function buildPendantProducts(count = 12) {
  const list = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    ...PENDANTS_PRODUCTS[i % PENDANTS_PRODUCTS.length],
  }));
  return withSlugs(list);
}

const BANGLES_PRODUCTS = [
  {
    title: "Iolite Bracelet",
    subtitle:
      "Exclusively available at Passione Jewelry. Each handcrafted piece reflects timeless elegance.",
    price: 1500,
    img: "/bangles/1.png",
  },
  {
    title: "Iolite Bracelet",
    subtitle:
      "Discover the beauty of our Iolite Bracelet, only at Passione Jewelry.",
    price: 1500,
    img: "/bangles/2.png",
  },
  {
    title: "Peridot Bracelet",
    subtitle:
      "Expertly crafted, this stunning bracelet features vibrant Peridot gemstones.",
    price: 1500,
    img: "/bangles/3.png",
  },
];

function buildBangleProducts(count = 12) {
  const list = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    ...BANGLES_PRODUCTS[i % BANGLES_PRODUCTS.length],
  }));
  return withSlugs(list);
}

// Cycles the 4 base products to build a bigger grid. Swap this out
// for a real DB / CMS / API call later — the page component doesn't
// care where `products` comes from.
function buildProducts(count = 12) {
  const list = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    ...DEFAULT_PRODUCT_BASE[i % DEFAULT_PRODUCT_BASE.length],
  }));
  return withSlugs(list);
}

// Helper so every entry doesn't repeat categories/products/SEO by
// hand — override any field per-slug. "new-arrivals" and
// "bestsellers" below show a fully custom entry; the rest use the
// shared defaults as a scalable starting point.
function page(overrides) {
  return {
    heroImage: "/new.png",
    description:
      "Inspired by nature and shaped by design, each piece brings a fresh perspective to everyday jewellery — crafted for beauty that lasts.",
    categories: DEFAULT_CATEGORIES,
    products: buildProducts(12),
    seoTitle: `${overrides.navLabel} | Passione Jewelry`,
    seoDescription: `Shop ${overrides.navLabel} at Passione Jewelry — handcrafted in Thailand's ancient gem capital.`,
    ...overrides,
  };
}

export const shopByPages = [
  // ---------------- FEATURED ----------------
  page({
    slug: "new-arrivals",
    navGroup: "FEATURED",
    navLabel: "New Arrivals",
    pageTitle: " New Arrivals",
    heroImage: "/new1.png",
    description:
      "Inspired by nature and shaped by design, our newest arrivals bring fresh perspective to everyday jewellery. Discover pieces that reflect beauty in its most natural form. New designs rooted in organic inspiration each piece captures a moment of nature, reimagined into something you can wear and cherish.",
  }),
  page({
    slug: "bestsellers",
    navGroup: "FEATURED",
    navLabel: "Bestsellers",
    pageTitle: "Best Sellers",
    heroImage: "/best1.png",
    description:
      "Inspired by the effortless beauty of nature and refined through intentional design, our best-selling pieces embody modern luxury in its most timeless form. Each creation begins with an organic inspiration soft curves, fluid textures, and natural forms reimagined into jewellery that feels both contemporary and enduring. Designed to be worn every day yet treasured for a lifetime, these pieces go beyond adornment they become part of your story, capturing moments, emotions, and individuality with quiet sophistication.",
  }),
  page({
    slug: "celebrities-choice",
    navGroup: "FEATURED",
    navLabel: "Celebrities' Choice",
    pageTitle: "Celebrities' Choice",
  }),

  // ---------------- TYPE ----------------
  page({
    slug: "rings",
    navGroup: "TYPE",
    navLabel: "Rings",
    pageTitle: "Rings",
    heroImage: "/rings1.png",
    description:
      "Inspired by the natural world and refined through thoughtful craftsmanship, our rings are a study in balance where organic forms meet modern design. Each piece is carefully sculpted to feel effortless yet distinctive, capturing subtle details that reveal themselves over time. Whether worn as a personal signature or layered for a more expressive look, these rings are created to move with you quietly elevating the everyday while holding lasting meaning.",
    products: buildRingProducts(12),
    totalProducts: 260,
  }),

  page({
    slug: "earrings",
    navGroup: "TYPE",
    navLabel: "Earrings",
    pageTitle: "Earrings",
    heroImage: "/earings1.png",
    description:
      "Inspired by the fluid beauty of nature, our earrings are designed to bring light, movement, and refinement to every moment. Each piece reflects a harmony of organic forms and precise craftsmanship resulting in silhouettes that feel both modern and timeless. Whether subtle or statement, these earrings are created to elevate your everyday with quiet sophistication and enduring style.",
    products: buildEarringProducts(12),
    totalProducts: 260,
  }),

  page({
    slug: "pendants",
    navGroup: "TYPE",
    navLabel: "Pendants",
    pageTitle: "Pendants",
    heroImage: "/pendants.png",
    description:
      "Inspired by nature’s quiet elegance, our pendants are crafted to capture beauty in its most refined form. Each piece reflects a balance of organic inspiration and thoughtful design resulting in jewellery that feels both effortless and intentional. Worn close to the heart, these pendants become more than adornment they carry sentiment, individuality, and a sense of timeless luxury.",
    products: buildPendantProducts(12),
    totalProducts: 260,
  }),

  page({
    slug: "bangles",
    navGroup: "TYPE",
    navLabel: "Bangles",
    pageTitle: "Bangles",
    heroImage: "/bangles.png",
    description:
      "Inspired by the natural flow of organic shapes, our bangles are designed as continuous expressions of form and balance. Each piece is thoughtfully crafted to feel both structured and fluid, bringing together modern design with timeless appeal. Worn alone or layered, these bangles add a quiet statement of sophistication, elevating everyday moments with refined simplicity.",
    products: buildBangleProducts(12),
    totalProducts: 260,
  }),

  page({
    slug: "necklaces",
    navGroup: "TYPE",
    navLabel: "Necklaces",
    pageTitle: "Necklaces",
    heroImage: "/necklaces.png",
    description:
      "Designed to make every look unforgettable, our Necklaces showcase exceptional craftsmanship, premium gemstones, and timeless elegance. From delicate everyday styles to statement pieces, each necklace is created to celebrate beauty, confidence, and individuality.",
  }),

  page({
    slug: "bracelets",
    navGroup: "TYPE",
    navLabel: "Bracelets",
    pageTitle: "Bracelets",
    heroImage: "/bracelets.png",
    description:
      "Crafted with remarkable attention to detail, our Bracelets blend natural gemstones with elegant contemporary design. Each piece is created to bring effortless sophistication, making it perfect for layering or wearing as a timeless statement on its own.",
  }),

  page({
    slug: "shop-all",
    navGroup: "TYPE",
    navLabel: "Shop All",
    pageTitle: "Shop All",
    heroImage: "/shop-all.png",
    description:
      "Browse the complete Passione Jewelry collection in one place. Discover handcrafted rings, earrings, pendants, necklaces, bangles, bracelets, and exclusive creations featuring carefully selected natural gemstones, exceptional craftsmanship, and timeless luxury designed to celebrate every occasion.",
  }),

  // ---------------- COLLECTION ----------------
  page({ slug: "artifact-new", navGroup: "COLLECTION", navLabel: "Artifact New", pageTitle: "Artifact New" }),
  page({ slug: "mesh", navGroup: "COLLECTION", navLabel: "Mesh", pageTitle: "Mesh" }),
  page({ slug: "raw", navGroup: "COLLECTION", navLabel: "Raw", pageTitle: "Raw" }),
  page({
    slug: "singular-edition",
    navGroup: "COLLECTION",
    navLabel: "Singular Edition",
    pageTitle: "Singular Edition",
  }),
  page({ slug: "gold", navGroup: "COLLECTION", navLabel: "Gold", pageTitle: "Gold" }),
  page({ slug: "elemental", navGroup: "COLLECTION", navLabel: "Elemental", pageTitle: "Elemental" }),

  // ---------------- STYLE ----------------
  page({ slug: "mens", navGroup: "STYLE", navLabel: "Men's", pageTitle: "Men's" }),
  page({ slug: "casual", navGroup: "STYLE", navLabel: "Casual", pageTitle: "Casual" }),
  page({ slug: "statement", navGroup: "STYLE", navLabel: "Statement", pageTitle: "Statement" }),
  page({ slug: "friendship", navGroup: "STYLE", navLabel: "Friendship", pageTitle: "Friendship" }),
];

// Convenience lookup used by the [slug] route.
export function getShopByPage(slug) {
  return shopByPages.find((p) => p.slug === slug) || null;
}