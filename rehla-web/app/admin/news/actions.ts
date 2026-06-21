"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9-]/g, "")
    .slice(0, 80);
}

export async function saveNews(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const id = (formData.get("id") as string) || null;
  const titleAr = (formData.get("title_ar") as string)?.trim();

  if (!titleAr) throw new Error("العنوان مطلوب");

  const isPublished = formData.get("is_published") === "on";

  const payload = {
    title_ar: titleAr,
    excerpt_ar: (formData.get("excerpt_ar") as string)?.trim() || null,
    body_ar: (formData.get("body_ar") as string)?.trim() || null,
    cover_image_url: (formData.get("cover_image_url") as string)?.trim() || null,
    is_published: isPublished,
    published_at: isPublished ? new Date().toISOString() : null,
  };

  if (id) {
    const { error } = await supabase
      .from("news_posts")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const baseSlug = slugify(titleAr) || "news";
    const uniqueSlug = `${baseSlug}-${Date.now().toString(36)}`;
    const { error } = await supabase
      .from("news_posts")
      .insert({ ...payload, slug: uniqueSlug });
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/news");
  revalidatePath("/news");
  redirect("/admin/news");
}

export async function deleteNews(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const id = formData.get("id") as string;
  if (!id) throw new Error("المعرّف مفقود");

  const { error } = await supabase.from("news_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/news");
  revalidatePath("/news");
}
