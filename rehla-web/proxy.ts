import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // نطبّق على مسارات لوحة التحكم فقط (المحمية وصفحة الدخول)
  matcher: ["/admin/:path*", "/admin"],
};
