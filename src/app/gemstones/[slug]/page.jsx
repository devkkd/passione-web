import { notFound } from "next/navigation";
import { gemstonesPages, getGemstonePage } from "@/data/gemstonesData";
import ProductListingPage from "@/app/components/ProductListingPage";

export async function generateStaticParams() {
  return gemstonesPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = getGemstonePage(slug);
  if (!data) return {};

  return {
    title: data.seoTitle,
    description: data.seoDescription,
  };
}

export default async function GemstonePage({ params }) {
  const { slug } = await params;
  const data = getGemstonePage(slug);

  if (!data) {
    notFound();
  }

  return <ProductListingPage data={data} basePath="/gemstones" />;
}