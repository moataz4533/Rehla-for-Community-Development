"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";

/**
 * يحدّث محتوى محور (فئة). المحاور ثابتة العدد (ستة)، فلا نسمح
 * بإضافة أو حذف — فقط تعديل الاسم والوصف والصورة وحالة التفعيل.
 */
export async function updateCategory(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const id = formData.get("id") as string;
  if (!id) throw new Error("معرّف المحور مفقود");

  const nameAr = (formData.get("name_ar") as string)?.trim();
  if (!nameAr) throw new Error("اسم المحور مطلوب");

  const payload = {
    name_ar: nameAr,
    short_description_ar:
      (formData.get("short_description_ar") as string)?.trim() || null,
    long_description_ar:
      (formData.get("long_description_ar") as string)?.trim() || null,
    cover_image_url:
      (formData.get("cover_image_url") as string)?.trim() || null,
    is_active: formData.get("is_active") === "on",
  };

  const { error } = await supabase
    .from("categories")
    .update(payload)
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/programs");
  revalidatePath("/programs");
  revalidatePath("/");
  redirect("/admin/programs");
}
