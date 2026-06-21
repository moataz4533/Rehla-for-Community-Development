import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

// ملاحظة: next/font/google لـ IBM Plex Sans Arabic يُفعَّل تلقائيًا
// عند النشر على Vercel (له وصول كامل للإنترنت). في حال احتجت تجربته
// محليًا بدون وصول لـ Google Fonts، استخدم الخط النظامي كـ fallback.
// عند النشر، أعد استيراد next/font/google كما في النسخة الأصلية:
//
// import { IBM_Plex_Sans_Arabic } from "next/font/google";
// const plexArabic = IBM_Plex_Sans_Arabic({
//   variable: "--font-plex-arabic",
//   subsets: ["arabic"],
//   weight: ["400", "500", "600", "700"],
//   display: "swap",
// });
// وأضف `${plexArabic.variable}` لـ className تحت.

export const metadata: Metadata = {
  metadataBase: new URL("https://rehla-foundation.vercel.app"),
  title: {
    default: "رحلة للتنمية المجتمعية | من الاحتياج إلى القدرة",
    template: "%s | رحلة للتنمية المجتمعية",
  },
  description:
    "مؤسسة رحلة للتنمية المجتمعية — مؤسسة غير ربحية تنقل الإنسان من الاحتياج إلى القدرة عبر ستة محاور: التمكين الاقتصادي، التعليم، الصحة، التدريب، دور الرعاية، وصناديق الخير.",
  keywords: [
    "تبرع",
    "مؤسسة خيرية",
    "تنمية مجتمعية",
    "تمكين اقتصادي",
    "كفالة",
    "رحلة",
    "عمل خيري مصر",
  ],
  authors: [{ name: "رحلة للتنمية المجتمعية" }],
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "رحلة للتنمية المجتمعية",
    title: "رحلة للتنمية المجتمعية | من الاحتياج إلى القدرة",
    description:
      "مؤسسة غير ربحية تنقل الإنسان من الاحتياج إلى القدرة عبر ستة محاور تنموية متكاملة.",
  },
  twitter: {
    card: "summary_large_image",
    title: "رحلة للتنمية المجتمعية",
    description:
      "مؤسسة غير ربحية تنقل الإنسان من الاحتياج إلى القدرة عبر ستة محاور تنموية.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              name: "رحلة للتنمية المجتمعية",
              alternateName: "Rehla for Community Development",
              url: "https://rehla-foundation.vercel.app",
              description:
                "مؤسسة غير ربحية تنقل الإنسان من الاحتياج إلى القدرة عبر ستة محاور تنموية متكاملة.",
              areaServed: { "@type": "Country", name: "Egypt" },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
