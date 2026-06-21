import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { adminGetAllItems, adminGetAllCategories } from "@/lib/data/admin-queries";

export const dynamic = "force-dynamic";

function formatCurrency(amount: number | null) {
  if (amount == null) return "—";
  return new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 0 }).format(
    amount
  );
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  active: { label: "نشط", color: "#2E7D5B" },
  completed: { label: "مكتمل", color: "#5B6660" },
  paused: { label: "متوقف", color: "#C68A3E" },
  draft: { label: "مسودة", color: "#9CA3AF" },
};

export default async function AdminCasesPage() {
  const [items, categories] = await Promise.all([
    adminGetAllItems(),
    adminGetAllCategories(),
  ]);

  const categoryMap = new Map(categories.map((c) => [c.id, c.name_ar]));

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-primary">
            الحالات وفرص التبرع
          </h1>
          <p className="mt-1 text-sm text-brand-text-secondary">
            {items.length} عنصر
          </p>
        </div>
        <Link
          href="/admin/cases/new"
          className="flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-primary-dark"
        >
          <Plus size={18} />
          إضافة جديد
        </Link>
      </div>

      {items.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-brand-border bg-white">
          <table className="w-full text-right text-sm">
            <thead className="border-b border-brand-border bg-brand-surface text-brand-text-secondary">
              <tr>
                <th className="px-5 py-3 font-medium">العنوان</th>
                <th className="px-5 py-3 font-medium">المحور</th>
                <th className="px-5 py-3 font-medium">النوع</th>
                <th className="px-5 py-3 font-medium">السعر / الهدف</th>
                <th className="px-5 py-3 font-medium">الحالة</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {items.map((item) => {
                const status = STATUS_LABELS[item.status] ?? STATUS_LABELS.draft;
                return (
                  <tr key={item.id} className="hover:bg-brand-surface/50">
                    <td className="px-5 py-3.5 font-medium text-brand-primary">
                      {item.title_ar}
                    </td>
                    <td className="px-5 py-3.5 text-brand-text-secondary">
                      {categoryMap.get(item.category_id) ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 text-brand-text-secondary">
                      {item.kind === "funded_case" ? "حالة بهدف" : "منتج ثابت"}
                    </td>
                    <td className="px-5 py-3.5 tabular-nums-ltr text-brand-text-secondary">
                      {item.kind === "funded_case"
                        ? formatCurrency(item.goal_amount)
                        : formatCurrency(item.unit_price)}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-block rounded-full px-2.5 py-1 text-xs font-bold text-white"
                        style={{ backgroundColor: status.color }}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/admin/cases/${item.id}`}
                        className="inline-flex items-center gap-1 text-brand-primary hover:text-brand-accent"
                      >
                        <Pencil size={15} />
                        تعديل
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-brand-border bg-white py-16 text-center text-brand-text-secondary">
          لا توجد حالات بعد. ابدأ بإضافة أول فرصة تبرع.
        </div>
      )}
    </div>
  );
}
