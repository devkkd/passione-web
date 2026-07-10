import { notFound } from "next/navigation";
import { shopByPages, getShopByPage } from "@/data/shopByData";
import ProductListingPage from "@/app/components/ProductListingPage";

// Pre-render every known slug at build time (SSG). New slugs added
// to shopByData.js are automatically picked up on the next build.
export async function generateStaticParams() {
  return shopByPages.map((p) => ({ slug: p.slug }));
}

// Per-page SEO — pulled straight from the data file.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = getShopByPage(slug);
  if (!data) return {};

  return {
    title: data.seoTitle,
    description: data.seoDescription,
  };
}

export default async function ShopByPage({ params }) {
  const { slug } = await params;
  const data = getShopByPage(slug);

  if (!data) {
    notFound();
  }

  return <ProductListingPage data={data} basePath="/shop-by" />;
}