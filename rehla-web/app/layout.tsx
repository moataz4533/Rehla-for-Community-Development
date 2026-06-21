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
  title: {
    default: "رحلة للتنمية المجتمعية",
    template: "%s | رحلة للتنمية المجتمعية",
  },
  description:
    "رحلة للتنمية المجتمعية — مؤسسة غير ربحية تعمل في التمكين الاقتصادي، التعليم، الصحة، التدريب، دور الرعاية، وصناديق الخير.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
