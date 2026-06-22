"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import { updateCategory } from "@/app/admin/programs/actions";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { Category } from "@/lib/types/database";

export function ProgramForm({ category }: { category: Category }) {
  return (
    <div className="mx-auto max-w-2xl p-4 sm:p-8">
      <div className="mb-6">
        <Link
          href="/admin/programs"
          className="text-sm text-brand-text-secondary hover:text-brand-primary"
        >
          → العودة للمحاور
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-brand-primary">
          تعديل: {category.name_ar}
        </h1>
      </div>

      <form action={updateCategory} className="space-y-5">
        <input type="hidden" name="id" value={category.id} />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-primary">
            اسم المحور <span className="text-brand-danger">*</span>
          </label>
          <input
            name="name_ar"
            required
            defaultValue={category.name_ar}
            className="program-input"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-primary">
            وصف قصير
          </label>
          <textarea
            name="short_description_ar"
            rows={2}
            defaultValue={category.short_description_ar ?? ""}
            className="program-input resize-none"
            placeholder="جملة تظهر في بطاقة المحور والصفحة الرئيسية"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-primary">
            الوصف الكامل
          </label>
          <textarea
            name="long_description_ar"
            rows={6}
            defaultValue={category.long_description_ar ?? ""}
            className="program-input resize-none"
            placeholder="الوصف التفصيلي الذي يظهر في صفحة المحور"
          />
        </div>

        <ImageUploader
          name="cover_image_url"
          defaultUrl={category.cover_image_url}
          folder="programs"
          label="صورة المحور"
        />

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={category.is_active}
            className="h-4 w-4 accent-[var(--color-primary)]"
          />
          المحور ظاهر للجمهور
        </label>

        <div className="border-t border-brand-border pt-5">
          <SaveButton />
        </div>
      </form>

      <style>{`
        .program-input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid var(--color-border);
          padding: 10px 16px;
          font-size: 14px;
        }
        .program-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(31,58,53,0.1);
        }
      `}</style>
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
      {pending ? "جارٍ الحفظ..." : "حفظ التعديلات"}
    </button>
  );
}
