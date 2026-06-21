import { ShieldCheck, TrendingUp, Users, HeartHandshake } from "lucide-react";
import { getSiteSettings, settingOr } from "@/lib/data/settings";
import { createSupabasePublicClient } from "@/lib/supabase/public";

export const metadata = {
  title: "الشفافية والتقارير",
  description:
    "نلتزم بالشفافية الكاملة. تعرّف على كيفية إدارة التبرعات في مؤسسة رحلة، وأين تذهب، والأثر الذي تصنعه.",
};

export const revalidate = 300;

/**
 * إحصائيات حقيقية من قاعدة البيانات لعرضها على صفحة الشفافية.
 * كلها أرقام فعلية، لا تُختلق.
 */
async function getImpactStats() {
  try {
    const supabase = createSupabasePublicClient();

    const [activeCases, paidDonations, completedCases] = await Promise.all([
      supabase
        .from("donation_items")
        .select("id", { count: "exact", head: true })
        .eq("status", "active"),
      supabase
        .from("donations")
        .select("amount")
        .eq("status", "paid"),
      supabase
        .from("donation_items")
        .select("id", { count: "exact", head: true })
        .eq("status", "completed"),
    ]);

    const totalRaised = (paidDonations.data ?? []).reduce(
      (sum, d) => sum + Number(d.amount),
      0
    );

    return {
      activeCasesCount: activeCases.count ?? 0,
      completedCasesCount: completedCases.count ?? 0,
      donationsCount: paidDonations.data?.length ?? 0,
      totalRaised,
    };
  } catch {
    return {
      activeCasesCount: 0,
      completedCasesCount: 0,
      donationsCount: 0,
      totalRaised: 0,
    };
  }
}

export default async function TransparencyPage() {
  const [settings, stats] = await Promise.all([
    getSiteSettings(),
    getImpactStats(),
  ]);

  const intro = settingOr(
    settings,
    "transparency_intro",
    "نؤمن أن ثقتك أمانة. لذلك نلتزم بأن نوضّح لك بدقة كيف يُدار كل تبرع، وأين يذهب، والأثر الذي يصنعه."
  );

  const allocations = [
    {
      percent: parseInt(settingOr(settings, "allocation_programs_percent", "85")),
      label: settingOr(settings, "allocation_programs_label", "البرامج والمستفيدون"),
    },
    {
      percent: parseInt(settingOr(settings, "allocation_operations_percent", "10")),
      label: settingOr(
        settings,
        "allocation_operations_label",
        "التشغيل والمتابعة الميدانية"
      ),
    },
    {
      percent: parseInt(settingOr(settings, "allocation_admin_percent", "5")),
      label: settingOr(settings, "allocation_admin_label", "الإدارة والتطوير"),
    },
  ];

  const reportsNote = settingOr(
    settings,
    "reports_note",
    "نعمل على إصدار تقارير دورية توضّح نشاط المؤسسة وأثرها. ستتوفر هنا فور إطلاقها."
  );

  return (
    <div>
      {/* رأس الصفحة */}
      <section
        className="py-16 text-white"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ShieldCheck size={40} className="mx-auto text-brand-accent-light" />
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
            الشفافية والتقارير
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            {intro}
          </p>
        </div>
      </section>

      {/* إحصائيات الأثر */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-brand-primary">
          أثرنا بالأرقام
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatBox
            icon={<HeartHandshake size={24} />}
            value={stats.activeCasesCount.toLocaleString("ar-EG")}
            label="حالة نشطة"
          />
          <StatBox
            icon={<TrendingUp size={24} />}
            value={stats.completedCasesCount.toLocaleString("ar-EG")}
            label="حالة مكتملة"
          />
          <StatBox
            icon={<Users size={24} />}
            value={stats.donationsCount.toLocaleString("ar-EG")}
            label="تبرع مؤكد"
          />
          <StatBox
            icon={<TrendingUp size={24} />}
            value={`${stats.totalRaised.toLocaleString("ar-EG")}`}
            label="جنيه جُمعت"
          />
        </div>
        <p className="mt-4 text-center text-xs text-brand-text-secondary">
          هذه الأرقام تُحدَّث تلقائيًا من نشاط المنصة.
        </p>
      </section>

      {/* توزيع التبرعات */}
      <section className="bg-brand-surface">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-center text-2xl font-bold text-brand-primary">
            أين تذهب تبرعاتك؟
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-brand-text-secondary">
            نحرص على توجيه أكبر نسبة ممكنة مباشرة للمستفيدين، مع الحفاظ على
            جودة التنفيذ والمتابعة.
          </p>

          <div className="space-y-5">
            {allocations.map((a) => (
              <div key={a.label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="font-bold text-brand-primary">{a.label}</span>
                  <span className="tabular-nums-ltr font-bold text-brand-accent">
                    {a.percent}%
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${a.percent}%`,
                      backgroundColor: "var(--color-primary)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* التقارير */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-xl font-bold text-brand-primary">
          التقارير الدورية
        </h2>
        <div className="rounded-2xl border border-dashed border-brand-border bg-brand-surface p-8 text-center">
          <p className="text-brand-text-secondary">{reportsNote}</p>
        </div>
      </section>
    </div>
  );
}

function StatBox({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-brand-border bg-white p-5 text-center">
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-surface text-brand-primary">
        {icon}
      </span>
      <p className="mt-3 text-2xl font-bold text-brand-primary tabular-nums-ltr">
        {value}
      </p>
      <p className="mt-0.5 text-xs text-brand-text-secondary">{label}</p>
    </div>
  );
}
