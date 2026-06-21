import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import type { DonationItem } from "@/lib/types/database";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 0 }).format(
    amount
  );
}

export function DonationItemCard({ item }: { item: DonationItem }) {
  const isFundedCase = item.kind === "funded_case";
  const progressPercent =
    isFundedCase && item.goal_amount
      ? Math.min(100, Math.round((item.raised_amount / item.goal_amount) * 100))
      : null;

  return (
    <Link
      href={`/donate/${item.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand-border bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-surface">
        {item.cover_image_url ? (
          <SafeImage
            src={item.cover_image_url}
            alt={item.title_ar}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-brand-text-secondary">
            صورة قريبًا
          </div>
        )}
        {item.is_urgent && (
          <span className="absolute right-3 top-3 rounded-full bg-brand-danger px-3 py-1 text-xs font-bold text-white">
            حالة عاجلة
          </span>
        )}
        {item.status === "completed" && (
          <span className="absolute right-3 top-3 rounded-full bg-brand-success px-3 py-1 text-xs font-bold text-white">
            تم اكتمال الدعم
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-base font-bold text-brand-primary">
          {item.title_ar}
        </h3>

        {isFundedCase ? (
          <div className="mt-4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-brand-surface-alt">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progressPercent}%`,
                  backgroundColor: "var(--color-accent)",
                }}
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between text-xs text-brand-text-secondary">
              <span className="tabular-nums-ltr font-bold text-brand-primary">
                {formatCurrency(item.raised_amount)} جنيه
              </span>
              <span className="tabular-nums-ltr">
                من {formatCurrency(item.goal_amount ?? 0)} جنيه
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-4 text-sm text-brand-text-secondary">
            سعر الوحدة:{" "}
            <span className="tabular-nums-ltr font-bold text-brand-primary">
              {formatCurrency(item.unit_price ?? 0)} جنيه
            </span>
          </div>
        )}

        <span className="mt-5 block rounded-full bg-brand-primary py-2.5 text-center text-sm font-bold text-white transition-colors group-hover:bg-brand-primary-dark">
          تبرع الآن
        </span>
      </div>
    </Link>
  );
}
