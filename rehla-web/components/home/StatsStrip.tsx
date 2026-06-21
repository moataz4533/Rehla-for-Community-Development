const VALUES = [
  {
    title: "شفافية كاملة",
    description: "كل تبرع موجَّه لهدف محدد، وتقدّمه مرئي للجميع لحظة بلحظة",
  },
  {
    title: "ستة محاور تنموية",
    description: "من التمكين الاقتصادي إلى الرعاية، نتعامل مع الإنسان ككل",
  },
  {
    title: "أثر حقيقي لا أرقام فقط",
    description: "نقيس نجاحنا بحياة تغيّرت، لا بإحصائية في تقرير",
  },
];

export function StatsStrip() {
  return (
    <section className="border-y border-brand-border bg-brand-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:px-8">
        {VALUES.map((value) => (
          <div key={value.title} className="text-center">
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
