"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  HeartHandshake,
  Layers,
  Newspaper,
  Wallet,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/admin", label: "الرئيسية", icon: LayoutDashboard, exact: true },
  { href: "/admin/programs", label: "المحاور", icon: Layers },
  { href: "/admin/cases", label: "الحالات وفرص التبرع", icon: HeartHandshake },
  { href: "/admin/news", label: "الأخبار", icon: Newspaper },
  { href: "/admin/donations", label: "التبرعات", icon: Wallet },
  { href: "/admin/settings", label: "إعدادات الموقع", icon: Settings },
];

export function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin-login");
    router.refresh();
  }

  const navContent = (
    <>
      <div className="border-b border-brand-border p-5">
        <p className="text-sm font-bold text-brand-primary">لوحة تحكم رحلة</p>
        <p className="mt-0.5 text-xs text-brand-text-secondary">{adminName}</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {NAV.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-primary text-white"
                  : "text-gray-700 hover:bg-brand-surface"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-brand-border p-3">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-brand-danger transition-colors hover:bg-red-50"
        >
          <LogOut size={18} />
          تسجيل الخروج
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* شريط علوي للموبايل فقط */}
      <header className="flex items-center justify-between border-b border-brand-border bg-white p-4 lg:hidden">
        <p className="text-sm font-bold text-brand-primary">لوحة تحكم رحلة</p>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="فتح القائمة"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-brand-primary hover:bg-brand-surface"
        >
          <Menu size={22} />
        </button>
      </header>

      {/* السايدبار الثابت للشاشات الكبيرة */}
      <aside className="hidden w-64 shrink-0 flex-col border-l border-brand-border bg-white lg:flex">
        {navContent}
      </aside>

      {/* السايدبار المنزلق للموبايل */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 right-0 flex w-72 max-w-[80%] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-brand-border p-3">
              <span className="px-2 text-sm font-bold text-brand-primary">
                القائمة
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="إغلاق القائمة"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-text-secondary hover:bg-brand-surface"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
              {navContent}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
