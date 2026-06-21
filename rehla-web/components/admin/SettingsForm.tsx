"use client";

import { useFormStatus } from "react-dom";
import type { SiteSettings } from "@/lib/data/settings";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  return (
    <div className="space-y-8">
      {/* قسم الهيرو */}
      <Section title="محتوى الواجهة الرئيسية (الهيرو)">
        <Field
          name="hero_title_line1"
          label="العنوان — السطر الأول"
          defaultValue={settings.hero_title_line1}
        />
        <Field
          name="hero_title_line2"
          label="العنوان — السطر الثاني (بلون مميز)"
          defaultValue={settings.hero_title_line2}
        />
        <Field
          name="hero_subtitle"
          label="النص التعريفي تحت العنوان"
          defaultValue={settings.hero_subtitle}
          textarea
        />
      </Section>

      {/* قسم التواصل */}
      <Section title="بيانات التواصل">
        <Field
          name="contact_phone"
          label="رقم الهاتف"
          defaultValue={settings.contact_phone}
          dir="ltr"
        />
        <Field
          name="contact_email"
          label="البريد الإلكتروني"
          defaultValue={settings.contact_email}
          dir="ltr"
        />
        <Field
          name="contact_address"
          label="العنوان"
          defaultValue={settings.contact_address}
        />
      </Section>

      {/* قسم السوشيال */}
      <Section title="روابط التواصل الاجتماعي">
        <Field
          name="social_facebook"
          label="فيسبوك"
          defaultValue={settings.social_facebook}
          dir="ltr"
          placeholder="https://facebook.com/..."
        />
        <Field
          name="social_instagram"
          label="إنستجرام"
          defaultValue={settings.social_instagram}
          dir="ltr"
          placeholder="https://instagram.com/..."
        />
        <Field
          name="social_youtube"
          label="يوتيوب"
          defaultValue={settings.social_youtube}
          dir="ltr"
          placeholder="https://youtube.com/..."
        />
        <Field
          name="social_linkedin"
          label="لينكدإن"
          defaultValue={settings.social_linkedin}
          dir="ltr"
          placeholder="https://linkedin.com/..."
        />
      </Section>

      <SaveButton />

      <style>{`
        .settings-input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid var(--color-border);
          padding: 10px 16px;
          font-size: 14px;
        }
        .settings-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(31,58,53,0.1);
        }
      `}</style>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-brand-border bg-white p-6">
      <h2 className="mb-4 font-bold text-brand-primary">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  name,
  label,
  defaultValue,
  textarea,
  dir,
  placeholder,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  textarea?: boolean;
  dir?: "ltr" | "rtl";
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-brand-primary">
        {label}
      </label>
      {textarea ? (
        <textarea
          name={name}
          rows={3}
          defaultValue={defaultValue ?? ""}
          dir={dir}
          placeholder={placeholder}
          className="settings-input resize-none"
        />
      ) : (
        <input
          name={name}
          defaultValue={defaultValue ?? ""}
          dir={dir}
          placeholder={placeholder}
          className="settings-input"
        />
      )}
    </div>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-brand-primary px-8 py-3 text-sm font-bold text-white hover:bg-brand-primary-dark disabled:opacity-60"
    >
      {pending ? "جارٍ الحفظ..." : "حفظ الإعدادات"}
    </button>
  );
}
