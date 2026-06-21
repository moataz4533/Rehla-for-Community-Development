import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 0 }).format(
    amount
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "قيد الدفع", color: "#C68A3E" },
  paid: { label: "مدفوع", color: "#2E7D5B" },
  failed: { label: "فشل", color: "#B14B3F" },
  refunded: { label: "مُسترجع", color: "#5B6660" },
  cancelled: { label: "ملغي", color: "#9CA3AF" },
};

async function getDonations() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("donations")
      .select(
        "id, amount, status, created_at, is_anonymous_display, donation_items(title_ar), donors(full_name)"
      )
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) {
      console.error("getDonations:", error.message);
      return [];
    }
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function AdminDonationsPage() {
  const donations = await getDonations();

  const totalPaid = donations
    .filter((d) => d.status === "paid")
    .reduce((sum, d) => sum + Number(d.amount), 0);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-brand-primary">التبرعات</h1>
      <p className="mt-1 text-sm text-brand-text-secondary">
        إجمالي المؤكد:{" "}
        <span className="tabular-nums-ltr font-bold text-brand-primary">
          {formatCurrency(totalPaid)} جنيه
        </span>{" "}
        — آخر {donations.length} عملية
      </p>

      {donations.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-brand-border bg-white">
          <table className="w-full text-right text-sm">
            <thead className="border-b border-brand-border bg-brand-surface text-brand-text-secondary">
              <tr>
                <th className="px-5 py-3 font-medium">المتبرع</th>
                <th className="px-5 py-3 font-medium">الحالة / العنصر</th>
                <th className="px-5 py-3 font-medium">المبلغ</th>
                <th className="px-5 py-3 font-medium">الحالة</th>
                <th className="px-5 py-3 font-medium">التاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {donations.map((d) => {
                const status =
                  STATUS_LABELS[d.status] ?? STATUS_LABELS.pending;
                // البيانات المرتبطة قد تأتي كمصفوفة من Supabase
                const itemTitle = Array.isArray(d.donation_items)
                  ? d.donation_items[0]?.title_ar
                  : (d.donation_items as { title_ar?: string } | null)?.title_ar;
                const donorName = Array.isArray(d.donors)
                  ? d.donors[0]?.full_name
                  : (d.donors as { full_name?: string } | null)?.full_name;
                return (
                  <tr key={d.id} className="hover:bg-brand-surface/50">
                    <td className="px-5 py-3.5 text-brand-primary">
                      {d.is_anonymous_display ? "متبرع كريم" : donorName ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 text-brand-text-secondary">
                      {itemTitle ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 tabular-nums-ltr font-bold text-brand-primary">
                      {formatCurrency(Number(d.amount))}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-block rounded-full px-2.5 py-1 text-xs font-bold text-white"
                        style={{ backgroundColor: status.color }}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-brand-text-secondary">
                      {formatDate(d.created_at)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-brand-border bg-white py-16 text-center text-brand-text-secondary">
          لا توجد تبرعات بعد.
        </div>
      )}
    </div>
  );
}
