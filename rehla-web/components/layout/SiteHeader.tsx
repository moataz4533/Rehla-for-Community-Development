"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "عن المؤسسة" },
  { href: "/programs", label: "محاور العمل" },
  { href: "/news", label: "أخبار" },
  { href: "/contact", label: "تواصل معنا" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* الشعار / اسم المؤسسة (مؤقت بدون لوجو) */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <Heart className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold text-brand-primary">
              رحلة للتنمية المجتمعية
            </span>
            <span className="text-[11px] text-brand-text-secondary">
              Rehla for Community Development
            </span>
          </span>
        </Link>

        {/* روابط التنقل - ديسكتوب */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* أزرار الإجراءات */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/donate"
            className="rounded-full bg-brand-accent px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.03] hover:bg-brand-accent-dark"
          >
            تبرع الآن
          </Link>
        </div>

        {/* زرار المنيو - موبايل */}
        <button
          onClick={() => setIsMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-primary lg:hidden"
          aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* قائمة الموبايل */}
      {isMenuOpen && (
        <nav className="border-t border-brand-border bg-white px-4 py-4 lg:hidden">
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-base font-medium text-gray-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/donate"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-full bg-brand-accent px-6 py-3 text-center text-base font-bold text-white"
              >
                تبرع الآن
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
