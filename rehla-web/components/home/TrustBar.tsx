import { ShieldCheck, FileText, Eye } from "lucide-react";
import type { SiteSettings } from "@/lib/data/settings";
import { settingOr } from "@/lib/data/settings";

/**
 * شريط الثقة: يعرض الوضع القانوني للمؤسسة وعناصر المصداقية.
 * كل النصوص قابلة للتعديل من لوحة التحكم.
 */
export function TrustBar({ settings }: { settings: SiteSettings }) {
  const items = [
    {
      icon: <ShieldCheck size={22} />,
      title: settingOr(settings, "trust_1_title", "مؤسسة غير ربحية"),
      subtitle: settingOr(
        settings,
        "trust_1_text",
        "نعمل وفق قانون الجمعيات والمؤسسات الأهلية"
      ),
    },
    {
      icon: <FileText size={22} />,
      title: settingOr(settings, "trust_2_title", "مقيدة رسميًا"),
      subtitle: settingOr(
        settings,
        "trust_2_text",
        "لدى وزارة التضامن الاجتماعي — رقم القيد قريبًا"
      ),
    },
    {
      icon: <Eye size={22} />,
      title: settingOr(settings, "trust_3_title", "شفافية كاملة"),
      subtitle: settingOr(
        settings,
        "trust_3_text",
        "كل تبرع موجَّه لهدف واضح، وأثره مرئي"
      ),
    },
  ];

  return (
    <section className="border-b border-brand-border bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-brand-border px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:divide-x-reverse sm:px-6 lg:px-8">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 py-5 sm:justify-center sm:px-4"
          >
            <span className="shrink-0 text-brand-accent">{item.icon}</span>
            <div>
              <p className="text-sm font-bold text-brand-primary">
                {item.title}
              </p>
              <p className="text-xs text-brand-text-secondary">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
