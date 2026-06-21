import { createSupabasePublicClient } from "@/lib/supabase/public";

export type SiteSettings = Record<string, string>;

/**
 * يجلب كل إعدادات الموقع من جدول site_settings ويحوّلها إلى
 * كائن بسيط { key: value } لسهولة الاستخدام في الصفحات.
 * القيم مخزّنة كـ JSON، فنفكّها للحصول على النص.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");

    if (error || !data) {
      console.error("getSiteSettings:", error?.message);
      return {};
    }

    const settings: SiteSettings = {};
    for (const row of data) {
      // value مخزّنة كـ JSON (نص أو كائن). نتعامل مع النصوص أساسًا.
      const v = row.value;
      settings[row.key] =
        typeof v === "string" ? v : v == null ? "" : JSON.stringify(v);
    }
    return settings;
  } catch (err) {
    console.error("getSiteSettings unexpected:", err);
    return {};
  }
}

/**
 * قيمة افتراضية آمنة عند غياب الإعداد، حتى لا تظهر الصفحة فارغة.
 */
export function settingOr(
  settings: SiteSettings,
  key: string,
  fallback: string
): string {
  const v = settings[key];
  return v && v.trim().length > 0 ? v : fallback;
}
