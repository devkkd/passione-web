import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/data/productsData";
import ProductDetailPage from "@/app/components/ProductDetailPage";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const found = getProductBySlug(slug);
  if (!found) return { title: "Product Not Found | Passione Jewelry" };
  const { product } = found;
  return {
    title: `${product.title} | Passione Jewelry`,
    description: product.subtitle,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const found = getProductBySlug(slug);
  if (!found) notFound();

  return (
    <ProductDetailPage
      product={found.product}
      related={getRelatedProducts(slug, 8)}
      basePath={found.basePath}
    />
  );
}