import { getSiteSettings } from "@/lib/data/settings";
import { saveSettings } from "./actions";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-2xl p-4 sm:p-8">
      <h1 className="text-2xl font-bold text-brand-primary">إعدادات الموقع</h1>
      <p className="mt-1 text-sm text-brand-text-secondary">
        تحكّم في محتوى الصفحة الرئيسية وبيانات التواصل
      </p>

      <form action={saveSettings} className="mt-8">
        <SettingsForm settings={settings} />
      </form>
    </div>
  );
}
