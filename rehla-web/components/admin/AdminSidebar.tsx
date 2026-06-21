"use client";

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

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin-login");
    router.refresh();
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-l border-brand-border bg-white">
      <div className="border-b border-brand-border p-5">
        <p className="text-sm font-bold text-brand-primary">لوحة تحكم رحلة</p>
        <p className="mt-0.5 text-xs text-brand-text-secondary">{adminName}</p>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {NAV.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
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
    </aside>
  );
}
