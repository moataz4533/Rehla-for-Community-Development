import type { SiteSettings } from "@/lib/data/settings";
import { settingOr } from "@/lib/data/settings";

export function StatsStrip({ settings }: { settings: SiteSettings }) {
  const values = [
    {
      title: settingOr(settings, "why_1_title", "تنمية لا إغاثة"),
      description: settingOr(
        settings,
        "why_1_text",
        "لا نكتفي بسدّ الحاجة اللحظية، بل نبني قدرة الإنسان ليعتمد على نفسه ويخرج من دائرة الاحتياج نهائيًا."
      ),
    },
    {
      title: settingOr(settings, "why_2_title", "إنسان متكامل"),
      description: settingOr(
        settings,
        "why_2_text",
        "ستة محاور تتعامل مع الإنسان ككل — جسده وعلمه ورزقه ونفسه — لأن الحياة الكريمة لا تتجزأ."
      ),
    },
    {
      title: settingOr(settings, "why_3_title", "أثر مرئي"),
      description: settingOr(
        settings,
        "why_3_text",
        "نقيس نجاحنا بحياة تغيّرت فعلًا، ونُطلع المتبرعين على أثر مساهمتهم خطوة بخطوة."
      ),
    },
  ];

  return (
    <section className="border-y border-brand-border bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:px-8">
        {values.map((value) => (
          <div key={value.title} className="text-center sm:text-right">
            <div className="text-lg font-bold text-brand-primary">
              {value.title}
            </div>
            <div className="mt-2 text-sm leading-relaxed text-brand-text-secondary">
              {value.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
