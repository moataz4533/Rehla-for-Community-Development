import type { MetadataRoute } from "next";
import { getActiveCategories } from "@/lib/data/queries";

const BASE_URL = "https://rehla-foundation.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // الصفحات الثابتة
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/programs`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/news`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/transparency`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/donate`, changeFrequency: "weekly", priority: 0.9 },
  ];

  // صفحات المحاور (ديناميكية)
  let categoryPages: MetadataRoute.Sitemap = [];
  try {
    const categories = await getActiveCategories();
    categoryPages = categories.map((cat) => ({
      url: `${BASE_URL}/programs/${cat.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // في حال فشل الجلب، نكتفي بالصفحات الثابتة
  }

  return [...staticPages, ...categoryPages];
}
