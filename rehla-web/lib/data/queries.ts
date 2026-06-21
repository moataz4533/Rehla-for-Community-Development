import { createSupabasePublicClient } from "@/lib/supabase/public";
import type { Category, DonationItem, Subcategory } from "@/lib/types/database";

/**
 * غلاف آمن: يضمن أن أي فشل في الاتصال أو في إنشاء الـ client
 * لا يُسقط الصفحة بخطأ 500، بل يُسجّل الخطأ ويُرجع قيمة افتراضية.
 */
async function safeQuery<T>(
  label: string,
  fn: (supabase: Awaited<ReturnType<typeof createSupabasePublicClient>>) => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    const supabase = createSupabasePublicClient();
    return await fn(supabase);
  } catch (err) {
    console.error(`[${label}] unexpected error:`, err);
    return fallback;
  }
}

export async function getActiveCategories(): Promise<Category[]> {
  return safeQuery(
    "getActiveCategories",
    async (supabase) => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) {
        console.error("getActiveCategories query error:", error.message);
        return [];
      }
      return data ?? [];
    },
    []
  );
}

export async function getFeaturedDonationItems(): Promise<DonationItem[]> {
  return safeQuery(
    "getFeaturedDonationItems",
    async (supabase) => {
      const { data, error } = await supabase
        .from("donation_items")
        .select("*")
        .eq("is_featured", true)
        .neq("status", "draft")
        .order("display_order", { ascending: true })
        .limit(6);
      if (error) {
        console.error("getFeaturedDonationItems query error:", error.message);
        return [];
      }
      return data ?? [];
    },
    []
  );
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return safeQuery(
    "getCategoryBySlug",
    async (supabase) => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();
      if (error) {
        console.error("getCategoryBySlug query error:", error.message);
        return null;
      }
      return data;
    },
    null
  );
}

export async function getDonationItemsByCategory(
  categoryId: string
): Promise<DonationItem[]> {
  return safeQuery(
    "getDonationItemsByCategory",
    async (supabase) => {
      const { data, error } = await supabase
        .from("donation_items")
        .select("*")
        .eq("category_id", categoryId)
        .neq("status", "draft")
        .order("display_order", { ascending: true });
      if (error) {
        console.error("getDonationItemsByCategory query error:", error.message);
        return [];
      }
      return data ?? [];
    },
    []
  );
}

export async function getSubcategoriesByCategory(
  categoryId: string
): Promise<Subcategory[]> {
  return safeQuery(
    "getSubcategoriesByCategory",
    async (supabase) => {
      const { data, error } = await supabase
        .from("subcategories")
        .select("*")
        .eq("category_id", categoryId)
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) {
        console.error("getSubcategoriesByCategory query error:", error.message);
        return [];
      }
      return data ?? [];
    },
    []
  );
}

export async function getDonationItemBySlug(
  slug: string
): Promise<DonationItem | null> {
  return safeQuery(
    "getDonationItemBySlug",
    async (supabase) => {
      const { data, error } = await supabase
        .from("donation_items")
        .select("*")
        .eq("slug", slug)
        .single();
      if (error) {
        console.error("getDonationItemBySlug query error:", error.message);
        return null;
      }
      return data;
    },
    null
  );
}

export async function getPublishedNews(limit = 12) {
  return safeQuery(
    "getPublishedNews",
    async (supabase) => {
      const { data, error } = await supabase
        .from("news_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(limit);
      if (error) {
        console.error("getPublishedNews query error:", error.message);
        return [];
      }
      return data ?? [];
    },
    []
  );
}
