import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "شكرًا لك",
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ donationId?: string }>;
}) {
  const { donationId } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <span
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: "var(--color-surface)", color: "var(--color-success)" }}
      >
        <CheckCircle2 size={36} />
      </span>
      <h1 className="mt-6 text-2xl font-bold text-brand-primary sm:text-3xl">
        شكرًا لك، تبرعك يصنع فرقًا حقيقيًا
      </h1>
      <p className="mt-3 text-base leading-relaxed text-brand-text-secondary">
        تم تسجيل تبرعك بنجاح. سيتم التواصل معك أو إرسال إيصال التأكيد بعد
        إتمام عملية الدفع.
      </p>
      {donationId && (
        <p className="mt-4 text-xs text-brand-text-secondary">
          رقم العملية المرجعي:{" "}
          <span className="tabular-nums-ltr font-mono">{donationId}</span>
        </p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-brand-primary px-6 py-3 text-sm font-bold text-white hover:bg-brand-primary-dark"
        >
          العودة للرئيسية
        </Link>
        <Link
          href="/programs"
          className="rounded-full border border-brand-border px-6 py-3 text-sm font-bold text-brand-primary hover:bg-brand-surface"
        >
          استكشف محاور أخرى
        </Link>
      </div>
    </div>
  );
}
