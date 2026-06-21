import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Category, DonationItem, Subcategory } from "@/lib/types/database";

export async function getActiveCategories(): Promise<Category[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("getActiveCategories error:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getFeaturedDonationItems(): Promise<DonationItem[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("donation_items")
    .select("*")
    .eq("is_featured", true)
    .neq("status", "draft")
    .order("display_order", { ascending: true })
    .limit(6);

  if (error) {
    console.error("getFeaturedDonationItems error:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("getCategoryBySlug error:", error.message);
    return null;
  }
  return data;
}

export async function getDonationItemsByCategory(
  categoryId: string
): Promise<DonationItem[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("donation_items")
    .select("*")
    .eq("category_id", categoryId)
    .neq("status", "draft")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("getDonationItemsByCategory error:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getSubcategoriesByCategory(
  categoryId: string
): Promise<Subcategory[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("subcategories")
    .select("*")
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("getSubcategoriesByCategory error:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getDonationItemBySlug(
  slug: string
): Promise<DonationItem | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("donation_items")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("getDonationItemBySlug error:", error.message);
    return null;
  }
  return data;
}

export async function getPublishedNews(limit = 12) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getPublishedNews error:", error.message);
    return [];
  }
  return data ?? [];
}
