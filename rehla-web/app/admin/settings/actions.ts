"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";

/**
 * يحفظ إعدادات الموقع. كل المفاتيح المسموح بها مُعرّفة في قائمة بيضاء
 * للأمان. القيم تُخزّن كـ JSON نصي في جدول site_settings.
 */

// القائمة البيضاء لكل المفاتيح القابلة للتعديل
const ALLOWED_KEYS = [
  // الهيرو
  "hero_title_line1",
  "hero_title_line2",
  "hero_subtitle",
  // قسم المحاور
  "categories_title",
  "categories_subtitle",
  // لماذا رحلة
  "why_1_title",
  "why_1_text",
  "why_2_title",
  "why_2_text",
  "why_3_title",
  "why_3_text",
  // كيف يعمل تبرعك
  "how_title",
  "how_subtitle",
  "how_1_title",
  "how_1_text",
  "how_2_title",
  "how_2_text",
  "how_3_title",
  "how_3_text",
  // شريط الثقة
  "trust_1_title",
  "trust_1_text",
  "trust_2_title",
  "trust_2_text",
  "trust_3_title",
  "trust_3_text",
  // عنوان الحالات المميزة
  "featured_title",
  // الشفافية
  "transparency_intro",
  "allocation_programs_percent",
  "allocation_programs_label",
  "allocation_operations_percent",
  "allocation_operations_label",
  "allocation_admin_percent",
  "allocation_admin_label",
  "reports_note",
  // التواصل
  "contact_phone",
  "contact_email",
  "contact_address",
  // السوشيال
  "social_facebook",
  "social_instagram",
  "social_youtube",
  "social_linkedin",
];

export async function saveSettings(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  // نحدّث فقط المفاتيح الموجودة فعلًا في النموذج المُرسَل
  const updates = ALLOWED_KEYS.filter((key) => formData.has(key)).map((key) => {
    const raw = (formData.get(key) as string) ?? "";
    return {
      key,
      value: JSON.stringify(raw.trim()),
      updated_at: new Date().toISOString(),
    };
  });

  if (updates.length > 0) {
    const { error } = await supabase
      .from("site_settings")
      .upsert(updates, { onConflict: "key" });
    if (error) throw new Error(error.message);
  }

  // نحدّث الصفحات المتأثرة
  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
}
