import { notFound } from "next/navigation";
import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { getDonationItemBySlug } from "@/lib/data/queries";
import { DonationForm } from "@/components/donate/DonationForm";
export const revalidate = 60; // إعادة جلب البيانات كل 60 ثانية

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 0 }).format(
    amount
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getDonationItemBySlug(slug);
  if (!item) return {};
  return {
    title: item.title_ar,
    description: item.description_ar ?? undefined,
  };
}

export default async function DonationItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getDonationItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const isFundedCase = item.kind === "funded_case";
  const progressPercent =
    isFundedCase && item.goal_amount
      ? Math.min(100, Math.round((item.raised_amount / item.goal_amount) * 100))
      : null;
  const isClosed = item.status === "completed" || item.status === "paused";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-brand-text-secondary">
        <Link href="/" className="hover:text-brand-primary">
          الرئيسية
        </Link>
        <span className="mx-2">/</span>
        <span className="text-brand-primary">{item.title_ar}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
        {/* تفاصيل العنصر */}
        <div className="lg:col-span-3">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-brand-surface">
            {item.cover_image_url ? (
              <SafeImage
                src={item.cover_image_url}
                alt={item.title_ar}
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-brand-text-secondary">
                صورة قريبًا
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {item.is_urgent && (
              <span className="rounded-full bg-brand-danger px-3 py-1 text-xs font-bold text-white">
                حالة عاجلة
              </span>
            )}
            {isClosed && (
              <span className="rounded-full bg-brand-success px-3 py-1 text-xs font-bold text-white">
                تم اكتمال الدعم — شكرًا لكل من ساهم
              </span>
            )}
          </div>

          <h1 className="mt-4 text-2xl font-bold text-brand-primary sm:text-3xl">
            {item.title_ar}
          </h1>

          {item.description_ar && (
            <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-gray-700">
              {item.description_ar}
            </p>
          )}
        </div>

        {/* بطاقة التبرع الجانبية */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-2xl border border-brand-border bg-white p-6 shadow-sm">
            {isFundedCase ? (
              <>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-brand-surface-alt">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${progressPercent}%`,
                      backgroundColor: "var(--color-accent)",
                    }}
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="tabular-nums-ltr text-xl font-bold text-brand-primary">
                    {formatCurrency(item.raised_amount)} جنيه
                  </span>
                  <span className="text-sm text-brand-text-secondary">
                    {progressPercent}٪
                  </span>
                </div>
                <p className="mt-1 text-sm text-brand-text-secondary">
                  من إجمالي{" "}
                  <span className="tabular-nums-ltr font-bold">
                    {formatCurrency(item.goal_amount ?? 0)} جنيه
                  </span>
                </p>
              </>
            ) : (
              <div>
                <p className="text-sm text-brand-text-secondary">سعر الوحدة</p>
                <p className="tabular-nums-ltr text-2xl font-bold text-brand-primary">
                  {formatCurrency(item.unit_price ?? 0)} جنيه
                </p>
              </div>
            )}

            <div className="mt-6 border-t border-brand-border pt-6">
              {isClosed ? (
                <div className="rounded-xl bg-brand-surface p-4 text-center text-sm text-brand-text-secondary">
                  هذه الحالة اكتمل دعمها، شكرًا لكل من ساهم في إكمال هذه
                  الرحلة. تابع حالات أخرى تحتاج دعمك.
                </div>
              ) : (
                <DonationForm item={item} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
