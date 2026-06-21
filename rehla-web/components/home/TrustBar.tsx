import { ShieldCheck, FileText, Eye } from "lucide-react";

/**
 * شريط الثقة: يعرض الوضع القانوني للمؤسسة وعناصر المصداقية.
 * ملاحظة: رقم القيد الرسمي لم يُضَف بعد — سيُملأ في site_settings
 * (مفتاح legal_registration) أو هنا مباشرة فور توفره من الإدارة.
 */
export function TrustBar() {
  return (
    <section className="border-b border-brand-border bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-brand-border px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:divide-x-reverse sm:px-6 lg:px-8">
        <TrustItem
          icon={<ShieldCheck size={22} />}
          title="مؤسسة غير ربحية"
          subtitle="نعمل وفق قانون الجمعيات والمؤسسات الأهلية"
        />
        <TrustItem
          icon={<FileText size={22} />}
          title="مقيدة رسميًا"
          subtitle="لدى وزارة التضامن الاجتماعي — رقم القيد قريبًا"
        />
        <TrustItem
          icon={<Eye size={22} />}
          title="شفافية كاملة"
          subtitle="كل تبرع موجَّه لهدف واضح، وأثره مرئي"
        />
      </div>
    </section>
  );
}

function TrustItem({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3 py-5 sm:justify-center sm:px-4">
      <span className="shrink-0 text-brand-accent">{icon}</span>
      <div>
        <p className="text-sm font-bold text-brand-primary">{title}</p>
        <p className="text-xs text-brand-text-secondary">{subtitle}</p>
      </div>
    </div>
  );
}
