import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * يُستخدم هذا الـ client في مكونات السيرفر (Server Components)
 * لجلب البيانات بشكل آمن وسريع وقت توليد الصفحة على السيرفر.
 * هذا هو الخيار الافتراضي لمعظم صفحات القراءة (المحاور، الحالات، الأخبار).
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
            // يحدث هذا عند استدعاء setAll من Server Component
            // وهو متوقع ويمكن تجاهله بأمان إذا كان middleware يحدّث الجلسة
          }
        },
      },
    }
  );
}
