import Link from "next/link";
import { HeartHandshake, Newspaper, Wallet, ArrowLeft } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const supabase = await createSupabaseServerClient();
    const [items, news, donations] = await Promise.all([
      supabase.from("donation_items").select("id", { count: "exact", head: true }),
      supabase.from("news_posts").select("id", { count: "exact", head: true }),
      supabase
        .from("donations")
        .select("id", { count: "exact", head: true })
        .eq("status", "paid"),
    ]);
    return {
      itemsCount: items.count ?? 0,
      newsCount: news.count ?? 0,
      paidDonationsCount: donations.count ?? 0,
    };
  } catch {
    return { itemsCount: 0, newsCount: 0, paidDonationsCount: 0 };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-brand-primary">لوحة التحكم</h1>
      <p className="mt-1 text-brand-text-secondary">
        نظرة عامة على محتوى الموقع
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard
          label="فرص التبرع والحالات"
          value={stats.itemsCount}
          href="/admin/cases"
          icon={<HeartHandshake size={22} />}
        />
        <StatCard
          label="الأخبار المنشورة"
          value={stats.newsCount}
          href="/admin/news"
          icon={<Newspaper size={22} />}
        />
        <StatCard
          label="التبرعات المؤكدة"
          value={stats.paidDonationsCount}
          href="/admin/donations"
          icon={<Wallet size={22} />}
        />
      </div>

      <div className="mt-8 rounded-2xl border border-brand-border bg-white p-6">
        <h2 className="font-bold text-brand-primary">إجراءات سريعة</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/cases/new"
            className="rounded-full bg-brand-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-primary-dark"
          >
            + إضافة حالة / فرصة تبرع
          </Link>
          <Link
            href="/admin/news/new"
            className="rounded-full border border-brand-border px-5 py-2.5 text-sm font-bold text-brand-primary hover:bg-brand-surface"
          >
            + إضافة خبر
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: number;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-brand-border bg-white p-6 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-surface text-brand-primary">
          {icon}
        </span>
        <ArrowLeft
          size={18}
          className="text-brand-text-secondary transition-transform group-hover:-translate-x-1"
        />
      </div>
      <p className="mt-4 text-3xl font-bold text-brand-primary">{value}</p>
      <p className="mt-1 text-sm text-brand-text-secondary">{label}</p>
    </Link>
  );
}
