"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, X } from "lucide-react";
import { saveItem, deleteItem } from "@/app/admin/cases/actions";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { Category, DonationItem, SuggestedAmount } from "@/lib/types/database";

export function CaseForm({
  categories,
  item,
}: {
  categories: Category[];
  item?: DonationItem;
}) {
  const [kind, setKind] = useState<string>(item?.kind ?? "fixed_item");
  const [suggestedAmounts, setSuggestedAmounts] = useState<SuggestedAmount[]>(
    item?.suggested_amounts ?? []
  );

  function addSuggested() {
    setSuggestedAmounts((prev) => [...prev, { amount: 0, label: "" }]);
  }
  function updateSuggested(
    index: number,
    field: "amount" | "label",
    value: string
  ) {
    setSuggestedAmounts((prev) =>
      prev.map((s, i) =>
        i === index
          ? { ...s, [field]: field === "amount" ? parseFloat(value) || 0 : value }
          : s
      )
    );
  }
  function removeSuggested(index: number) {
    setSuggestedAmounts((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="mx-auto max-w-2xl p-4 sm:p-8">
      <div className="mb-6">
        <Link
          href="/admin/cases"
          className="text-sm text-brand-text-secondary hover:text-brand-primary"
        >
          → العودة للقائمة
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-brand-primary">
          {item ? "تعديل الحالة" : "إضافة حالة جديدة"}
        </h1>
      </div>

      <form action={saveItem} className="space-y-5">
        {item && <input type="hidden" name="id" value={item.id} />}

        {/* العنوان */}
        <Field label="عنوان الحالة / المنتج" required>
          <input
            name="title_ar"
            required
            defaultValue={item?.title_ar ?? ""}
            className="form-input"
            placeholder="مثال: ماكينة خياطة لسيدة معيلة"
          />
        </Field>

        {/* المحور */}
        <Field label="المحور" required>
          <select
            name="category_id"
            required
            defaultValue={item?.category_id ?? ""}
            className="form-input"
          >
            <option value="" disabled>
              اختر المحور
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name_ar}
              </option>
            ))}
          </select>
        </Field>

        {/* النوع */}
        <Field label="نوع العنصر" required>
          <div className="flex gap-3">
            <KindOption
              value="fixed_item"
              label="منتج بسعر ثابت"
              hint="مثل: كرتونة طعام، ماكينة خياطة"
              current={kind}
              onChange={setKind}
            />
            <KindOption
              value="funded_case"
              label="حالة بهدف مالي"
              hint="مثل: عملية جراحية بمبلغ محدد"
              current={kind}
              onChange={setKind}
            />
          </div>
          <input type="hidden" name="kind" value={kind} />
        </Field>

        {/* السعر أو الهدف حسب النوع */}
        {kind === "fixed_item" ? (
          <Field label="سعر الوحدة (جنيه)" required>
            <input
              name="unit_price"
              type="number"
              min={1}
              step="0.01"
              defaultValue={item?.unit_price ?? ""}
              className="form-input"
              dir="ltr"
            />
          </Field>
        ) : (
          <Field label="المبلغ المستهدف (جنيه)" required>
            <input
              name="goal_amount"
              type="number"
              min={1}
              step="0.01"
              defaultValue={item?.goal_amount ?? ""}
              className="form-input"
              dir="ltr"
            />
          </Field>
        )}

        {/* المبالغ المقترحة بسياق (للحالات بهدف مالي) */}
        {kind === "funded_case" && (
          <div className="rounded-xl bg-brand-surface p-4">
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm font-medium text-brand-primary">
                مبالغ مقترحة بسياق
              </label>
              <button
                type="button"
                onClick={addSuggested}
                className="flex items-center gap-1 text-sm font-bold text-brand-accent"
              >
                <Plus size={15} />
                إضافة مبلغ
              </button>
            </div>
            <p className="mb-3 text-xs text-brand-text-secondary">
              تساعد المتبرع على فهم أثر كل مبلغ. مثال: ٢٥٠ جنيه = شهر أدوية.
            </p>

            {suggestedAmounts.length === 0 ? (
              <p className="text-xs text-brand-text-secondary">
                لا توجد مبالغ مقترحة. اضغط &quot;إضافة مبلغ&quot;.
              </p>
            ) : (
              <div className="space-y-2">
                {suggestedAmounts.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={s.amount || ""}
                      onChange={(e) => updateSuggested(i, "amount", e.target.value)}
                      placeholder="المبلغ"
                      dir="ltr"
                      className="w-24 rounded-lg border border-brand-border px-3 py-2 text-sm"
                    />
                    <input
                      type="text"
                      value={s.label}
                      onChange={(e) => updateSuggested(i, "label", e.target.value)}
                      placeholder="السياق (مثال: شهر أدوية)"
                      className="flex-1 rounded-lg border border-brand-border px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeSuggested(i)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-brand-danger hover:bg-red-50"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* حقل مخفي يحمل المبالغ كـ JSON */}
            <input
              type="hidden"
              name="suggested_amounts"
              value={JSON.stringify(suggestedAmounts)}
            />
          </div>
        )}

        {/* خيار التبرع المتكرر */}
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="allow_recurring"
            defaultChecked={item?.allow_recurring ?? false}
            className="h-4 w-4 accent-[var(--color-primary)]"
          />
          السماح بالتبرع الشهري المتكرر لهذه الحالة
        </label>

        {/* الوصف */}
        <Field label="الوصف">
          <textarea
            name="description_ar"
            rows={5}
            defaultValue={item?.description_ar ?? ""}
            className="form-input resize-none"
            placeholder="اكتب قصة الحالة وتفاصيلها..."
          />
        </Field>

        {/* صورة الغلاف */}
        <ImageUploader
          name="cover_image_url"
          defaultUrl={item?.cover_image_url}
          folder="cases"
          label="صورة الغلاف"
        />

        {/* الحالة */}
        <Field label="حالة النشر">
          <select
            name="status"
            defaultValue={item?.status ?? "active"}
            className="form-input"
          >
            <option value="active">نشط (ظاهر للجمهور)</option>
            <option value="draft">مسودة (مخفي)</option>
            <option value="paused">متوقف مؤقتًا</option>
            <option value="completed">مكتمل</option>
          </select>
        </Field>

        {/* خيارات الإبراز */}
        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="is_featured"
              defaultChecked={item?.is_featured ?? false}
              className="h-4 w-4 accent-[var(--color-primary)]"
            />
            إظهار في الصفحة الرئيسية
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="is_urgent"
              defaultChecked={item?.is_urgent ?? false}
              className="h-4 w-4 accent-[var(--color-primary)]"
            />
            حالة عاجلة
          </label>
        </div>

        {/* أزرار */}
        <div className="flex items-center justify-between border-t border-brand-border pt-5">
          <button
            type="submit"
            className="rounded-full bg-brand-primary px-8 py-3 text-sm font-bold text-white hover:bg-brand-primary-dark"
          >
            {item ? "حفظ التعديلات" : "إضافة الحالة"}
          </button>
        </div>
      </form>

      {/* حذف (في وضع التعديل فقط) */}
      {item && (
        <form
          action={deleteItem}
          className="mt-8 border-t border-brand-border pt-6"
        >
          <input type="hidden" name="id" value={item.id} />
          <DeleteButton />
        </form>
      )}

      <style>{`
        .form-input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid var(--color-border);
          padding: 10px 16px;
          font-size: 14px;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(31,58,53,0.1);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-brand-primary">
        {label}
        {required && <span className="text-brand-danger"> *</span>}
      </label>
      {children}
    </div>
  );
}

function KindOption({
  value,
  label,
  hint,
  current,
  onChange,
}: {
  value: string;
  label: string;
  hint: string;
  current: string;
  onChange: (v: string) => void;
}) {
  const isActive = current === value;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`flex-1 rounded-xl border p-4 text-right transition-colors ${
        isActive
          ? "border-brand-primary bg-brand-primary/5"
          : "border-brand-border hover:border-brand-primary/40"
      }`}
    >
      <span className="block text-sm font-bold text-brand-primary">{label}</span>
      <span className="mt-1 block text-xs text-brand-text-secondary">{hint}</span>
    </button>
  );
}

function DeleteButton() {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="text-sm font-medium text-brand-danger hover:underline"
      >
        حذف هذه الحالة نهائيًا
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4">
      <span className="text-sm text-brand-danger">
        متأكد؟ لا يمكن التراجع عن الحذف.
      </span>
      <button
        type="submit"
        className="rounded-full bg-brand-danger px-4 py-1.5 text-xs font-bold text-white"
      >
        نعم، احذف
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="text-xs text-brand-text-secondary"
      >
        إلغاء
      </button>
    </div>
  );
}
