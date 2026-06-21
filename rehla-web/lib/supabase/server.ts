import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * يُستخدم هذا الـ client في مكونات السيرفر (Server Components)
 * لجلب البيانات بشكل آمن وسريع وقت توليد الصفحة على السيرفر.
 */
export async function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // تحقق صريح من وجود متغيرات البيئة، مع رسالة واضحة في اللوج
  // بدلاً من خطأ غامض من داخل المكتبة.
  if (!url || !key) {
    throw new Error(
      `Supabase env vars missing — URL: ${url ? "موجود" : "مفقود"}, ANON_KEY: ${
        key ? "موجود" : "مفقود"
      }`
    );
  }

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // متوقع عند الاستدعاء من Server Component، يمكن تجاهله بأمان
        }
      },
    },
  });
}
