import { createSupabasePublicClient } from "@/lib/supabase/public";

// صفحة تشخيص مؤقتة — احذفها بعد التأكد أن كل شيء يعمل.
// تعرض حالة متغيرات البيئة والاتصال بقاعدة البيانات بأمان،
// دون كشف قيم المفاتيح السرية.

export const dynamic = "force-dynamic";

export default async function HealthPage() {
  const checks: { label: string; status: string; detail?: string }[] = [];

  // 1) فحص متغيرات البيئة
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  checks.push({
    label: "NEXT_PUBLIC_SUPABASE_URL",
    status: url ? "✓ موجود" : "✗ مفقود",
    detail: url ? `يبدأ بـ: ${url.slice(0, 24)}...` : "غير معرّف",
  });
  checks.push({
    label: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    status: anonKey ? "✓ موجود" : "✗ مفقود",
    detail: anonKey
      ? `الطول: ${anonKey.length} حرف، يبدأ بـ: ${anonKey.slice(0, 8)}...`
      : "غير معرّف",
  });
  checks.push({
    label: "SUPABASE_SERVICE_ROLE_KEY",
    status: serviceKey ? "✓ موجود" : "✗ مفقود",
    detail: serviceKey
      ? `الطول: ${serviceKey.length} حرف، يبدأ بـ: ${serviceKey.slice(0, 8)}...`
      : "غير معرّف",
  });

  // 2) فحص الاتصال الفعلي بقاعدة البيانات
  let connectionStatus = "لم يُختبر";
  let connectionDetail = "";
  let categoriesCount = 0;

  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("categories")
      .select("id, name_ar")
      .eq("is_active", true);

    if (error) {
      connectionStatus = "✗ خطأ في الاستعلام";
      connectionDetail = error.message;
    } else {
      connectionStatus = "✓ الاتصال ناجح";
      categoriesCount = data?.length ?? 0;
      connectionDetail = `تم جلب ${categoriesCount} محور من قاعدة البيانات`;
    }
  } catch (err) {
    connectionStatus = "✗ فشل إنشاء الاتصال";
    connectionDetail = err instanceof Error ? err.message : String(err);
  }

  // 3) اختبار نفس استعلامات الصفحة الرئيسية بالضبط
  const homeTests: { label: string; status: string; detail: string }[] = [];

  try {
    const { getActiveCategories, getFeaturedDonationItems } = await import(
      "@/lib/data/queries"
    );
    const cats = await getActiveCategories();
    homeTests.push({
      label: "getActiveCategories()",
      status: "✓ نجح",
      detail: `رجّع ${cats.length} محور`,
    });

    const featured = await getFeaturedDonationItems();
    homeTests.push({
      label: "getFeaturedDonationItems()",
      status: "✓ نجح",
      detail: `رجّع ${featured.length} عنصر مميز`,
    });

    // فحص الصور: هل أي عنصر له cover_image_url من نطاق غير متوقع؟
    const imageUrls = featured
      .map((f) => f.cover_image_url)
      .filter(Boolean) as string[];
    homeTests.push({
      label: "صور العناصر المميزة",
      status: imageUrls.length > 0 ? "ℹ توجد صور" : "ℹ لا توجد صور",
      detail:
        imageUrls.length > 0
          ? imageUrls.map((u) => u.slice(0, 50)).join(" | ")
          : "كل العناصر بدون صور (سيظهر 'صورة قريبًا')",
    });
  } catch (err) {
    homeTests.push({
      label: "استعلامات الصفحة الرئيسية",
      status: "✗ خطأ",
      detail: err instanceof Error ? `${err.message}\n${err.stack ?? ""}` : String(err),
    });
  }

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 24, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
        تشخيص حالة الموقع
      </h1>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>
        متغيرات البيئة
      </h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {checks.map((c) => (
          <li
            key={c.label}
            style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}
          >
            <strong>{c.label}</strong>: {c.status}
            {c.detail && (
              <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
                {c.detail}
              </div>
            )}
          </li>
        ))}
      </ul>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>
        الاتصال بقاعدة البيانات
      </h2>
      <div
        style={{
          padding: 16,
          borderRadius: 8,
          background: connectionStatus.startsWith("✓") ? "#e8f5e9" : "#ffebee",
        }}
      >
        <strong>{connectionStatus}</strong>
        <div style={{ fontSize: 13, color: "#444", marginTop: 6 }}>
          {connectionDetail}
        </div>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>
        اختبار استعلامات الصفحة الرئيسية
      </h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {homeTests.map((t, i) => (
          <li
            key={i}
            style={{
              padding: 12,
              marginBottom: 8,
              borderRadius: 8,
              background: t.status.startsWith("✗") ? "#ffebee" : "#f5f5f5",
            }}
          >
            <strong>{t.label}</strong>: {t.status}
            <pre
              style={{
                fontSize: 12,
                color: "#444",
                marginTop: 6,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {t.detail}
            </pre>
          </li>
        ))}
      </ul>

      <p style={{ fontSize: 13, color: "#999", marginTop: 32 }}>
        هذه صفحة تشخيص مؤقتة. احذف مجلد <code>app/health</code> بعد حل المشكلة.
      </p>
    </div>
  );
}
