import { createClient } from "@supabase/supabase-js";

/**
 * client للقراءة العامة فقط (المحاور، الحالات، الأخبار).
 * لا يستخدم cookies لأن هذه البيانات عامة ولا تحتاج جلسة مستخدم،
 * وهذا يتجنب مشكلة DYNAMIC_SERVER_USAGE التي قد تسبب أخطاء على السيرفر.
 *
 * يستخدم مفتاح anon/public العام (آمن)، وتحكمه سياسات RLS التي تسمح
 * فقط بقراءة المحتوى المنشور/النشط.
 */
export function createSupabasePublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      `Supabase env vars missing — URL: ${url ? "موجود" : "مفقود"}, ANON_KEY: ${
        key ? "موجود" : "مفقود"
      }`
    );
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
