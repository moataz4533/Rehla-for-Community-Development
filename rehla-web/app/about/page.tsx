import { Target, Eye, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "عن المؤسسة",
  description:
    "تعرّف على مؤسسة رحلة للتنمية المجتمعية، رؤيتها، رسالتها، وأهدافها التنموية.",
};

export default function AboutPage() {
  return (
    <div>
      <section
        className="py-16 text-white"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">عن المؤسسة</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            رحلة للتنمية المجتمعية — مؤسسة غير ربحية، نؤمن أن التنمية الحقيقية
            تبدأ من الإنسان، وتُبنى خطوة بخطوة.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-lg leading-relaxed">
            تأسست مؤسسة <strong>رحلة للتنمية المجتمعية</strong> انطلاقًا من
            قناعة بأن التنمية المستدامة لا تتحقق بالعطاء العابر، بل برحلة
            متكاملة تواكب الإنسان من لحظة الاحتياج وحتى الاستقلالية والاعتماد
            على نفسه. لذلك صممنا عملنا حول ستة محاور متكاملة تغطي الجوانب
            الاقتصادية، التعليمية، الصحية، والإنسانية لمن نخدمهم.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3" id="vision">
          <ValueCard
            icon={<Eye size={24} />}
            title="الرؤية"
            description="مجتمع تتاح فيه لكل إنسان فرصة حقيقية لحياة كريمة ومستقبل مستقر."
          />
          <ValueCard
            icon={<Target size={24} />}
            title="الرسالة"
            description="تقديم تدخلات تنموية مستدامة عبر التمكين، التعليم، الصحة، والتدريب، بشراكة حقيقية مع المجتمع."
          />
          <ValueCard
            icon={<ShieldCheck size={24} />}
            title="الشفافية"
            description="كل تبرع موجَّه لهدف واضح، ونلتزم بإطلاع المتبرعين على أثر مساهمتهم."
          />
        </div>

        <div className="mt-14 rounded-2xl bg-brand-surface p-8" id="goals">
          <h2 className="text-xl font-bold text-brand-primary">أهدافنا التنموية</h2>
          <ul className="mt-5 space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-brand-accent">·</span>
              تأهيل الرجال والنساء بمهن وحرف تفتح لهم أبواب رزق مستدامة.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-brand-accent">·</span>
              دعم استمرار التعليم من الثانوية وحتى الدراسات العليا.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-brand-accent">·</span>
              تيسير الوصول للرعاية الصحية والعلاج لمن لا يقدر.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-brand-accent">·</span>
              بناء قدرات الشباب عبر برامج تدريبية تناسب كل مرحلة عمرية.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-brand-accent">·</span>
              تقديم الدعم النفسي والتوعية لدور رعاية الأطفال وذوي الهمم والمسنين.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-brand-border bg-white p-6">
      <span
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ backgroundColor: "var(--color-surface)", color: "var(--color-primary)" }}
      >
        {icon}
      </span>
      <h3 className="mt-4 font-bold text-brand-primary">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-text-secondary">
        {description}
      </p>
    </div>
  );
}
