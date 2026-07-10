// src/data/productHelpers.js

export function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// id is appended because titles repeat (cycled base products) — keeps slugs unique.
export function withSlugs(products) {
  return products.map((p) => ({
    ...p,
    slug: `${slugify(p.title)}-${p.id}`,
  }));
}