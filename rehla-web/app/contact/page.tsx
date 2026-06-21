import { Phone, Mail, MapPin } from "lucide-react";
import { getSiteSettings, settingOr } from "@/lib/data/settings";

export const metadata = {
  title: "تواصل معنا",
  description: "تواصل مع مؤسسة رحلة للتنمية المجتمعية لأي استفسار أو شراكة.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const phone = settingOr(settings, "contact_phone", "سيُستكمل قريبًا");
  const email = settingOr(settings, "contact_email", "سيُستكمل قريبًا");
  const address = settingOr(settings, "contact_address", "سيُستكمل قريبًا");

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-brand-primary sm:text-4xl">
          تواصل معنا
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-brand-text-secondary">
          نرحب بأي استفسار، اقتراح، أو فرصة شراكة. فريقنا جاهز للرد عليك.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="space-y-5">
          <ContactRow icon={<Phone size={20} />} label="رقم التواصل" value={phone} />
          <ContactRow icon={<Mail size={20} />} label="البريد الإلكتروني" value={email} />
          <ContactRow icon={<MapPin size={20} />} label="العنوان" value={address} />

          <div className="rounded-2xl bg-brand-surface p-6">
            <h3 className="font-bold text-brand-primary">
              تسجيل المؤسسة الرسمي
            </h3>
            <p className="mt-2 text-sm text-brand-text-secondary">
              مؤسسة رحلة للتنمية المجتمعية — منظمة غير هادفة للربح، تعمل وفق
              قانون الجمعيات والمؤسسات الأهلية.
            </p>
          </div>
        </div>

        <form className="space-y-4 rounded-2xl border border-brand-border bg-white p-6">
          <input
            type="text"
            required
            placeholder="الاسم بالكامل"
            className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
          />
          <input
            type="text"
            required
            placeholder="البريد الإلكتروني أو رقم الموبايل"
            className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
          />
          <textarea
            required
            rows={5}
            placeholder="رسالتك"
            className="w-full resize-none rounded-xl border border-brand-border px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-brand-primary py-3 text-sm font-bold text-white hover:bg-brand-primary-dark"
          >
            إرسال الرسالة
          </button>
          <p className="text-center text-xs text-brand-text-secondary">
            ملاحظة: نموذج التواصل غير مفعّل فعليًا بعد، سيتم ربطه بالبريد
            الرسمي للمؤسسة عند توفره.
          </p>
        </form>
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: "var(--color-surface)", color: "var(--color-primary)" }}
      >
        {icon}
      </span>
      <div>
        <p className="text-sm text-brand-text-secondary">{label}</p>
        <p className="font-bold text-brand-primary">{value}</p>
      </div>
    </div>
  );
}
