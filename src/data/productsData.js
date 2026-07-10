import { shopByPages } from "./shopByData";
import { gemstonesPages } from "./gemstonesData";

function allPages() {
  return [
    ...shopByPages.map((p) => ({ ...p, basePath: "/shop-by" })),
    ...gemstonesPages.map((p) => ({ ...p, basePath: "/gemstones" })),
  ];
}

export function getProductBySlug(slug) {
  for (const page of allPages()) {
    const product = page.products.find((p) => p.slug === slug);
    if (product) return { product, parentPage: page, basePath: page.basePath };
  }
  return null;
}

export function getRelatedProducts(slug, count = 8) {
  const found = getProductBySlug(slug);
  if (!found) return [];
  return found.parentPage.products.filter((p) => p.slug !== slug).slice(0, count);
}