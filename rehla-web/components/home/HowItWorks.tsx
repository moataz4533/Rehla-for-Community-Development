import { Search, HandHeart, LineChart } from "lucide-react";

const STEPS = [
  {
    icon: <Search size={26} />,
    title: "ندرس الاحتياج",
    description:
      "نبدأ بدراسة ميدانية لكل حالة أو مجتمع، لنتأكد أن الدعم يصل لمن يستحقه فعلًا، وأنه يعالج جذر المشكلة لا أعراضها.",
  },
  {
    icon: <HandHeart size={26} />,
    title: "ننفّذ التدخل",
    description:
      "نحوّل تبرعك إلى تدخل ملموس: تدريب يفتح باب رزق، علاج ينقذ حياة، أو منحة تكمل تعليمًا — حسب طبيعة كل محور.",
  },
  {
    icon: <LineChart size={26} />,
    title: "نتابع الأثر",
    description:
      "لا تنتهي الرحلة بالتنفيذ. نتابع المستفيد ونقيس التغيّر الحقيقي في حياته، حتى يصل إلى الاستقلال والاعتماد على نفسه.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-brand-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="text-sm font-bold text-brand-accent">
            منهجيتنا
          </span>
          <h2 className="mt-2 text-2xl font-bold text-brand-primary sm:text-3xl">
            كيف يتحوّل تبرعك إلى أثر يدوم؟
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-brand-text-secondary">
            نؤمن أن العطاء الحقيقي رحلة لها بداية وخطوات ونهاية واضحة. هكذا
            نضمن أن كل جنيه يصنع تغييرًا مستدامًا.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={step.title} className="relative text-center">
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
