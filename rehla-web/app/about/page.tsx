import { Target, Eye, ShieldCheck, Search, HandHeart, LineChart } from "lucide-react";

export const metadata = {
  title: "عن المؤسسة",
  description:
    "تعرّف على مؤسسة رحلة للتنمية المجتمعية، رؤيتها، رسالتها، ومنهجيتها في نقل الإنسان من الاحتياج إلى القدرة.",
};

export default function AboutPage() {
  return (
    <div>
      {/* رأس الصفحة */}
      <section
        className="py-16 text-white"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">عن المؤسسة</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            رحلة للتنمية المجتمعية — مؤسسة غير ربحية تؤمن أن أصدق أنواع العطاء
            هو ما يجعل الإنسان قادرًا على الاستغناء عنه.
          </p>
        </div>
      </section>

      {/* القصة ومعنى الاسم */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-lg leading-relaxed text-gray-700">
          <p>
            اخترنا اسم <strong>«رحلة»</strong> لأنه يحمل جوهر ما نؤمن به: أن
            الخروج من دائرة الاحتياج ليس لحظة، بل مسار له بداية وخطوات ومحطات.
            كثير من العمل الخيري يتوقف عند سدّ الحاجة الآنية — وجبة، أو مبلغ،
            أو دواء — ثم يعود المحتاج إلى نقطة الصفر. أما نحن فنرافق الإنسان في
            رحلته كاملة، حتى يقف على قدميه ويصبح هو من يمدّ يده لغيره.
          </p>
          <p className="mt-5">
            لذلك بنينا عملنا حول ستة محاور متكاملة — التمكين الاقتصادي،
            التعليم، الصحة، التدريب، دور الرعاية، وصناديق الخير — تتعامل مع
            الإنسان ككل: رزقه، وعلمه، وصحته، ونفسه. لأن الحياة الكريمة لا
            تتجزأ.
          </p>
        </div>

        {/* الرؤية والرسالة والشفافية */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3" id="vision">
          <ValueCard
            icon={<Eye size={24} />}
            title="الرؤية"
            description="مجتمع تتاح فيه لكل إنسان فرصة حقيقية ليصنع لنفسه حياة كريمة مستقرة ومستقلة."
          />
          <ValueCard
            icon={<Target size={24} />}
            title="الرسالة"
            description="تقديم تدخلات تنموية مستدامة تنقل الإنسان من الاحتياج إلى القدرة، بشراكة حقيقية مع مجتمعه."
          />
          <ValueCard
            icon={<ShieldCheck size={24} />}
            title="الشفافية"
            description="كل تبرع موجَّه لهدف واضح، ونلتزم بإطلاع المتبرعين على أثر مساهمتهم خطوة بخطوة."
          />
        </div>
      </section>

      {/* منهجية العمل */}
      <section className="bg-brand-surface">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-brand-primary">
            منهجيتنا في العمل
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-brand-text-secondary">
            لا نعمل بشكل عشوائي. لكل تدخل مسار مدروس يضمن وصول الأثر واستدامته.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <MethodStep
              icon={<Search size={24} />}
              step="١"
              title="الدراسة"
              description="دراسة ميدانية لكل حالة ومجتمع، لفهم جذر الاحتياج لا أعراضه."
            />
            <MethodStep
              icon={<HandHeart size={24} />}
              step="٢"
              title="التنفيذ"
              description="تدخل ملموس يناسب طبيعة كل محور، من تدريب وعلاج إلى منح ودعم."
            />
            <MethodStep
              icon={<LineChart size={24} />}
              step="٣"
              title="المتابعة"
              description="قياس التغيّر الحقيقي ومتابعة المستفيد حتى يصل إلى الاستقلال."
            />
          </div>
        </div>
      </section>

      {/* الأهداف */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8" id="goals">
        <h2 className="text-xl font-bold text-brand-primary">أهدافنا التنموية</h2>
        <ul className="mt-5 space-y-3 text-gray-700">
          {[
            "تأهيل الرجال والنساء بمهن وحرف تفتح لهم أبواب رزق مستدامة.",
            "دعم استمرار التعليم من الثانوية وحتى الدراسات العليا.",
            "تيسير الوصول للرعاية الصحية والعلاج لمن لا يقدر عليه.",
            "بناء قدرات الشباب عبر برامج تدريبية تناسب كل مرحلة عمرية.",
            "تقديم الدعم النفسي والتوعية لدور رعاية الأطفال وذوي الهمم والمسنين.",
          ].map((goal) => (
            <li key={goal} className="flex gap-3">
              <span className="mt-1 font-bold text-brand-accent">·</span>
              <span>{goal}</span>
            </li>
          ))}
        </ul>
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

function MethodStep({
  icon,
  step,
  title,
  description,
}: {
  icon: React.ReactNode;
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary text-white">
        {icon}
      </span>
      <div className="mt-3 text-sm font-bold text-brand-accent">
        الخطوة {step}
      </div>
      <h3 className="mt-1 font-bold text-brand-primary">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-text-secondary">
        {description}
      </p>
    </div>
  );
}
