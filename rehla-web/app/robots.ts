import type { MetadataRoute } from "next";

const BASE_URL = "https://rehla-foundation.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // نمنع أرشفة لوحة التحكم وصفحات الدخول
      disallow: ["/admin", "/admin/", "/admin-login", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
