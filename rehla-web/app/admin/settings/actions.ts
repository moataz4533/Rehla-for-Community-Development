"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";

/**
 * يحفظ مجموعة إعدادات الموقع. يستقبل كل الحقول من النموذج،
 * ويحدّث كل مفتاح في جدول site_settings (upsert).
 * القيم تُخزّن كـ JSON نصي.
 */
export async function saveSettings(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  // المفاتيح المسموح بتعديلها (قائمة بيضاء للأمان)
  const allowedKeys = [
    "hero_title_line1",
    "hero_title_line2",
    "hero_subtitle",
    "contact_phone",
    "contact_email",
    "contact_address",
    "social_facebook",
    "social_instagram",
    "social_youtube",
    "social_linkedin",
  ];

  const updates = allowedKeys.map((key) => {
    const raw = (formData.get(key) as string) ?? "";
    return {
      key,
      // نخزّن القيمة كـ JSON (نص)
      value: JSON.stringify(raw.trim()),
      updated_at: new Date().toISOString(),
    };
  });

  const { error } = await supabase
    .from("site_settings")
    .upsert(updates, { onConflict: "key" });

  if (error) throw new Error(error.message);

  // نحدّث الصفحات التي تعتمد على هذه الإعدادات
  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
}
