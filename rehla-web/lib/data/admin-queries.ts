import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  Category,
  DonationItem,
  NewsPost,
} from "@/lib/types/database";

/**
 * دوال جلب البيانات الخاصة بلوحة التحكم.
 * تُستخدم داخل صفحات admin المحمية فقط، وتُرجع كل البيانات
 * (بما فيها draft) لأن المستخدم أدمن نشط تم التحقق منه.
 */

export async function adminGetAllItems(): Promise<DonationItem[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("donation_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("adminGetAllItems:", error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error("adminGetAllItems unexpected:", err);
    return [];
  }
}

export async function adminGetItemById(
  id: string
): Promise<DonationItem | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("donation_items")
      .select("*")
      .eq("id", id)
      .single();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export async function adminGetAllCategories(): Promise<Category[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

export async function adminGetAllNews(): Promise<NewsPost[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("news_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

export async function adminGetNewsById(id: string): Promise<NewsPost | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("news_posts")
      .select("*")
      .eq("id", id)
      .single();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}
