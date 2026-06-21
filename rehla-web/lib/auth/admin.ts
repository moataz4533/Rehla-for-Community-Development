import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AdminUser } from "@/lib/types/database";

/**
 * تتحقق من أن المستخدم الحالي:
 * (1) مسجّل دخوله عبر Supabase Auth
 * (2) موجود فعلًا في جدول admin_users وحالته نشطة
 *
 * تُستخدم في بداية كل صفحة admin كخط دفاع ثانٍ بعد الـ middleware.
 * إن لم يتحقق الشرطان، تُعيد التوجيه لصفحة الدخول.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin-login");
  }

  const { data: adminUser, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("auth_user_id", user.id)
    .eq("is_active", true)
    .single();

  if (error || !adminUser) {
    // مسجّل دخوله لكنه ليس أدمن نشطًا — نخرجه ونعيده لصفحة الدخول
    redirect("/admin-login?error=unauthorized");
  }

  return adminUser as AdminUser;
}

/**
 * نسخة لا تُعيد التوجيه، بل تُرجع المستخدم الأدمن أو null.
 * مفيدة في الحالات التي نريد فيها التحقق دون إجبار إعادة توجيه.
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("*")
    .eq("auth_user_id", user.id)
    .eq("is_active", true)
    .single();

  return (adminUser as AdminUser) ?? null;
}
