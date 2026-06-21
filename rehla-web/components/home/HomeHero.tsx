import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function HomeHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      {/* خط الرحلة - عنصر بصري توقيعي خفيف في الخلفية */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full opacity-20"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 80 C 150 20, 300 110, 450 60 C 600 10, 750 100, 900 50 C 1000 20, 1100 70, 1200 40"
          stroke="var(--color-accent)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-accent-light">
            مؤسسة غير ربحية
          </span>
          <h1 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            كل خطوة في رحلتنا
            <br />
            بداية حياة جديدة لإنسان
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-white/80">
            نعمل عبر ستة محاور تنموية لنوفر فرصًا حقيقية في التمكين الاقتصادي،
            التعليم، الصحة، والتدريب، ودعم دور الرعاية، انطلاقًا من إيمان واحد:
            كل إنسان يستحق رحلة كريمة.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/donate"
              className="rounded-full bg-brand-accent px-8 py-3.5 text-base font-bold text-white shadow-lg transition-transform hover:scale-[1.03] hover:bg-brand-accent-dark"
            >
              ابدأ رحلة العطاء
            </Link>
            <Link
              href="/programs"
              className="group flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              تعرّف على محاورنا
              <ArrowLeft
                size={18}
                className="transition-transform group-hover:-translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
