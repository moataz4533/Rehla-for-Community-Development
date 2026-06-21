import { createClient } from "@supabase/supabase-js";

/**
 * هذا الـ client يستخدم service_role key، ويتجاوز RLS بالكامل.
 * يُستخدم فقط داخل API Routes الموثوقة على السيرفر (مثل إنشاء التبرعات
 * وتأكيد عمليات الدفع عبر webhook)، ولا يجب استيراده مطلقًا في أي كود
 * يعمل على المتصفح (Client Component).
 *
 * SUPABASE_SERVICE_ROLE_KEY يجب أن يبقى سريًا تمامًا، ويُضاف فقط في
 * إعدادات البيئة على Vercel (Environment Variables)، وليس في أي ملف
 * يُرفع إلى Git.
 */
export function createSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
