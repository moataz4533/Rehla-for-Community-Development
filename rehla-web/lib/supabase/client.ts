import { createBrowserClient } from "@supabase/ssr";

/**
 * يُستخدم هذا الـ client في مكونات العميل (Client Components)
 * مثل صفحة التبرع التفاعلية، حيث نحتاج تفاعلًا فوريًا مع المستخدم.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
