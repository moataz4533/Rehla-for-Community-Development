import { Search, HandHeart, LineChart } from "lucide-react";
import type { SiteSettings } from "@/lib/data/settings";
import { settingOr } from "@/lib/data/settings";

export function HowItWorks({ settings }: { settings: SiteSettings }) {
  const steps = [
    {
      icon: <Search size={26} />,
      title: settingOr(settings, "how_1_title", "ندرس الاحتياج"),
      description: settingOr(
        settings,
        "how_1_text",
        "نبدأ بدراسة ميدانية لكل حالة أو مجتمع، لنتأكد أن الدعم يصل لمن يستحقه فعلًا، وأنه يعالج جذر المشكلة لا أعراضها."
      ),
    },
    {
      icon: <HandHeart size={26} />,
      title: settingOr(settings, "how_2_title", "ننفّذ التدخل"),
      description: settingOr(
        settings,
        "how_2_text",
        "نحوّل تبرعك إلى تدخل ملموس: تدريب يفتح باب رزق، علاج ينقذ حياة، أو منحة تكمل تعليمًا — حسب طبيعة كل محور."
      ),
    },
    {
      icon: <LineChart size={26} />,
      title: settingOr(settings, "how_3_title", "نتابع الأثر"),
      description: settingOr(
        settings,
        "how_3_text",
        "لا تنتهي الرحلة بالتنفيذ. نتابع المستفيد ونقيس التغيّر الحقيقي في حياته، حتى يصل إلى الاستقلال والاعتماد على نفسه."
      ),
    },
  ];

  const title = settingOr(
    settings,
    "how_title",
    "كيف يتحوّل تبرعك إلى أثر يدوم؟"
  );
  const subtitle = settingOr(
    settings,
    "how_subtitle",
    "نؤمن أن العطاء الحقيقي رحلة لها بداية وخطوات ونهاية واضحة. هكذا نضمن أن كل جنيه يصنع تغييرًا مستدامًا."
  );

  return (
    <section className="bg-brand-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="text-sm font-bold text-brand-accent">منهجيتنا</span>
          <h2 className="mt-2 text-2xl font-bold text-brand-primary sm:text-3xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-brand-text-secondary">
            {subtitle}
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand-primary shadow-sm">
                {step.icon}
              </div>
              <div className="mt-3 text-sm font-bold text-brand-accent">
                الخطوة {["الأولى", "الثانية", "الثالثة"][index]}
              </div>
              <h3 className="mt-1 text-lg font-bold text-brand-primary">
                {step.title}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-brand-text-secondary">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
