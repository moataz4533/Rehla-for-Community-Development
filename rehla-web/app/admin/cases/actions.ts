"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";

/**
 * Server Actions لإدارة فرص التبرع/الحالات.
 * كل action يتحقق أولًا من صلاحية الأدمن قبل تنفيذ أي تعديل.
 */

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9-]/g, "")
    .slice(0, 80);
}

export async function saveItem(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const id = (formData.get("id") as string) || null;
  const kind = formData.get("kind") as string;
  const titleAr = (formData.get("title_ar") as string)?.trim();
  const categoryId = formData.get("category_id") as string;

  if (!titleAr || !categoryId || !kind) {
    throw new Error("البيانات الأساسية ناقصة");
  }

  const unitPriceRaw = formData.get("unit_price") as string;
  const goalAmountRaw = formData.get("goal_amount") as string;

  // معالجة المبالغ المقترحة (تأتي كنص JSON من النموذج)
  let suggestedAmounts: { amount: number; label: string }[] = [];
  const suggestedRaw = formData.get("suggested_amounts") as string;
  if (suggestedRaw) {
    try {
      const parsed = JSON.parse(suggestedRaw);
      if (Array.isArray(parsed)) {
        suggestedAmounts = parsed
          .filter(
            (s) =>
              s && typeof s.amount === "number" && s.amount > 0
          )
          .map((s) => ({
            amount: s.amount,
            label: typeof s.label === "string" ? s.label : "",
          }));
      }
    } catch {
      suggestedAmounts = [];
    }
  }

  const payload = {
    category_id: categoryId,
    title_ar: titleAr,
    description_ar: (formData.get("description_ar") as string)?.trim() || null,
    kind,
    status: (formData.get("status") as string) || "active",
    unit_price:
      kind === "fixed_item" && unitPriceRaw ? parseFloat(unitPriceRaw) : null,
    goal_amount:
      kind === "funded_case" && goalAmountRaw ? parseFloat(goalAmountRaw) : null,
    cover_image_url: (formData.get("cover_image_url") as string)?.trim() || null,
    suggested_amounts: suggestedAmounts,
    allow_recurring: formData.get("allow_recurring") === "on",
    is_featured: formData.get("is_featured") === "on",
    is_urgent: formData.get("is_urgent") === "on",
  };

  if (id) {
    // تعديل عنصر موجود
    const { error } = await supabase
      .from("donation_items")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    // إنشاء عنصر جديد — نولّد slug فريدًا
    const baseSlug = slugify(titleAr) || "item";
    const uniqueSlug = `${baseSlug}-${Date.now().toString(36)}`;
    const { error } = await supabase
      .from("donation_items")
      .insert({ ...payload, slug: uniqueSlug });
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/cases");
  revalidatePath("/");
  redirect("/admin/cases");
}

export async function deleteItem(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const id = formData.get("id") as string;
  if (!id) throw new Error("معرّف العنصر مفقود");

  const { error } = await supabase
    .from("donation_items")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/cases");
  revalidatePath("/");
}
