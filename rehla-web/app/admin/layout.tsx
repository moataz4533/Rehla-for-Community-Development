import { requireAdmin } from "@/lib/auth/admin";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "لوحة التحكم",
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // التحقق من الصلاحية على مستوى السيرفر (خط دفاع ثانٍ بعد الـ proxy)
  const admin = await requireAdmin();

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-brand-surface lg:flex-row">
      <AdminSidebar adminName={admin.full_name} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
