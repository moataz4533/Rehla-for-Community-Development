"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { ChevronDown } from "lucide-react";
import type { SiteSettings } from "@/lib/data/settings";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  return (
    <div className="space-y-4">
      {/* الهيرو */}
      <Section title="الواجهة الرئيسية (الهيرو)" defaultOpen>
        <Field name="hero_title_line1" label="العنوان — السطر الأول" settings={settings} />
        <Field name="hero_title_line2" label="العنوان — السطر الثاني (لون مميز)" settings={settings} />
        <Field name="hero_subtitle" label="النص التعريفي" settings={settings} textarea />
      </Section>

      {/* قسم المحاور */}
      <Section title="عنوان قسم المحاور">
        <Field name="categories_title" label="العنوان" settings={settings} />
        <Field name="categories_subtitle" label="الوصف" settings={settings} textarea />
      </Section>

      {/* لماذا رحلة */}
      <Section title='قسم "لماذا رحلة"'>
        <SubGroup label="القيمة الأولى">
          <Field name="why_1_title" label="العنوان" settings={settings} />
          <Field name="why_1_text" label="النص" settings={settings} textarea />
        </SubGroup>
        <SubGroup label="القيمة الثانية">
          <Field name="why_2_title" label="العنوان" settings={settings} />
          <Field name="why_2_text" label="النص" settings={settings} textarea />
        </SubGroup>
        <SubGroup label="القيمة الثالثة">
          <Field name="why_3_title" label="العنوان" settings={settings} />
          <Field name="why_3_text" label="النص" settings={settings} textarea />
        </SubGroup>
      </Section>

      {/* كيف يعمل تبرعك */}
      <Section title='قسم "كيف يعمل تبرعك"'>
        <Field name="how_title" label="عنوان القسم" settings={settings} />
        <Field name="how_subtitle" label="وصف القسم" settings={settings} textarea />
        <SubGroup label="الخطوة الأولى">
          <Field name="how_1_title" label="العنوان" settings={settings} />
          <Field name="how_1_text" label="النص" settings={settings} textarea />
        </SubGroup>
        <SubGroup label="الخطوة الثانية">
          <Field name="how_2_title" label="العنوان" settings={settings} />
          <Field name="how_2_text" label="النص" settings={settings} textarea />
        </SubGroup>
        <SubGroup label="الخطوة الثالثة">
          <Field name="how_3_title" label="العنوان" settings={settings} />
          <Field name="how_3_text" label="النص" settings={settings} textarea />
        </SubGroup>
      </Section>

      {/* شريط الثقة */}
      <Section title="شريط الثقة">
        <SubGroup label="العنصر الأول">
          <Field name="trust_1_title" label="العنوان" settings={settings} />
          <Field name="trust_1_text" label="النص" settings={settings} />
        </SubGroup>
        <SubGroup label="العنصر الثاني (رقم القيد)">
          <Field name="trust_2_title" label="العنوان" settings={settings} />
          <Field name="trust_2_text" label="النص" settings={settings} />
        </SubGroup>
        <SubGroup label="العنصر الثالث">
          <Field name="trust_3_title" label="العنوان" settings={settings} />
          <Field name="trust_3_text" label="النص" settings={settings} />
        </SubGroup>
      </Section>

      {/* الشفافية */}
      <Section title="صفحة الشفافية">
        <Field name="transparency_intro" label="مقدمة الشفافية" settings={settings} textarea />
        <SubGroup label="توزيع التبرعات (النسب يجب أن يكون مجموعها 100)">
          <Field name="allocation_programs_label" label="البند الأول — الاسم" settings={settings} />
          <Field name="allocation_programs_percent" label="البند الأول — النسبة %" settings={settings} dir="ltr" />
          <Field name="allocation_operations_label" label="البند الثاني — الاسم" settings={settings} />
          <Field name="allocation_operations_percent" label="البند الثاني — النسبة %" settings={settings} dir="ltr" />
          <Field name="allocation_admin_label" label="البند الثالث — الاسم" settings={settings} />
          <Field name="allocation_admin_percent" label="البند الثالث — النسبة %" settings={settings} dir="ltr" />
        </SubGroup>
        <Field name="reports_note" label="نص التقارير" settings={settings} textarea />
      </Section>

      {/* التواصل */}
      <Section title="بيانات التواصل">
        <Field name="contact_phone" label="رقم الهاتف" settings={settings} dir="ltr" />
        <Field name="contact_email" label="البريد الإلكتروني" settings={settings} dir="ltr" />
        <Field name="contact_address" label="العنوان" settings={settings} />
      </Section>

      {/* السوشيال */}
      <Section title="روابط التواصل الاجتماعي">
        <Field name="social_facebook" label="فيسبوك" settings={settings} dir="ltr" placeholder="https://facebook.com/..." />
        <Field name="social_instagram" label="إنستجرام" settings={settings} dir="ltr" placeholder="https://instagram.com/..." />
        <Field name="social_youtube" label="يوتيوب" settings={settings} dir="ltr" placeholder="https://youtube.com/..." />
        <Field name="social_linkedin" label="لينكدإن" settings={settings} dir="ltr" placeholder="https://linkedin.com/..." />
      </Section>

      {/* زر الحفظ ثابت في الأسفل */}
      <div className="sticky bottom-0 -mx-8 border-t border-brand-border bg-white px-8 py-4">
        <SaveButton />
      </div>

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
  defaultOpen,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div className="overflow-hidden rounded-2xl border border-brand-border bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-6 py-4 text-right"
      >
        <span className="font-bold text-brand-primary">{title}</span>
        <ChevronDown
          size={20}
          className={`text-brand-text-secondary transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && <div className="space-y-4 border-t border-brand-border p-6">{children}</div>}
    </div>
  );
}

function SubGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-brand-surface p-4">
      <p className="mb-3 text-xs font-bold text-brand-accent">{label}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({
  name,
  label,
  settings,
  textarea,
  dir,
  placeholder,
}: {
  name: string;
  label: string;
  settings: SiteSettings;
  textarea?: boolean;
  dir?: "ltr" | "rtl";
  placeholder?: string;
}) {
  const defaultValue = settings[name] ?? "";
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-brand-primary">
        {label}
      </label>
      {textarea ? (
        <textarea
          name={name}
          rows={3}
          defaultValue={defaultValue}
          dir={dir}
          placeholder={placeholder}
          className="settings-input resize-none"
        />
      ) : (
        <input
          name={name}
          defaultValue={defaultValue}
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
      className="w-full rounded-full bg-brand-primary py-3 text-sm font-bold text-white hover:bg-brand-primary-dark disabled:opacity-60"
    >
      {pending ? "جارٍ الحفظ..." : "حفظ كل الإعدادات"}
    </button>
  );
}
