const VALUES = [
  {
    title: "تنمية لا إغاثة",
    description:
      "لا نكتفي بسدّ الحاجة اللحظية، بل نبني قدرة الإنسان ليعتمد على نفسه ويخرج من دائرة الاحتياج نهائيًا.",
  },
  {
    title: "إنسان متكامل",
    description:
      "ستة محاور تتعامل مع الإنسان ككل — جسده وعلمه ورزقه ونفسه — لأن الحياة الكريمة لا تتجزأ.",
  },
  {
    title: "أثر مرئي",
    description:
      "نقيس نجاحنا بحياة تغيّرت فعلًا، ونُطلع المتبرعين على أثر مساهمتهم خطوة بخطوة.",
  },
];

export function StatsStrip() {
  return (
    <section className="border-y border-brand-border bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:px-8">
        {VALUES.map((value) => (
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
