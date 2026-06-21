"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DonationItem } from "@/lib/types/database";

const SUGGESTED_MULTIPLIERS = [1, 2, 5, 10];

export function DonationForm({ item }: { item: DonationItem }) {
  const router = useRouter();
  const isFundedCase = item.kind === "funded_case";

  const [quantity, setQuantity] = useState(1);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [recurrence, setRecurrence] = useState<"one_time" | "monthly">(
    "one_time"
  );
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState(""); // إيميل أو تليفون
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donorMessage, setDonorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // المبلغ المحدد فعليًا: للمنتج الثابت = سعر الوحدة × الكمية،
  // للحالة بهدف مالي = مبلغ حر يحدده المتبرع
  const computedAmount = isFundedCase
    ? parseFloat(customAmount) || 0
    : (item.unit_price ?? 0) * quantity;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() && !isAnonymous) {
      setErrorMessage("من فضلك أدخل اسمك، أو اختر التبرع كمجهول");
      return;
    }
    if (computedAmount <= 0) {
      setErrorMessage("من فضلك أدخل مبلغًا صحيحًا للتبرع");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donationItemId: item.id,
          amount: computedAmount,
          quantity: isFundedCase ? 1 : quantity,
          fullName: isAnonymous ? "متبرع كريم" : fullName.trim(),
          contact: contact.trim(),
          isAnonymous,
          donorMessage: donorMessage.trim(),
          recurrence: item.allow_recurring ? recurrence : "one_time",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "حدث خطأ غير متوقع، حاول مرة أخرى");
        setIsSubmitting(false);
        return;
      }

      // عند ربط بوابة الدفع فعليًا، الـ API سيرجع رابط تحويل (redirectUrl)
      // للذهاب إلى صفحة الدفع الخاصة بـ Paymob. حاليًا (قبل الربط الفعلي)
      // نوجّه المستخدم مباشرة لصفحة الشكر كخطوة مؤقتة لإثبات سلامة التدفق.
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        router.push(`/donate/thank-you?donationId=${data.donationId}`);
      }
    } catch {
      setErrorMessage("تعذر الاتصال بالخادم، تأكد من اتصالك بالإنترنت");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* اختيار المبلغ / الكمية */}
      {isFundedCase ? (
        <div>
          <label className="mb-2 block text-sm font-bold text-brand-primary">
            مبلغ التبرع (جنيه)
          </label>

          {/* مبالغ مقترحة بسياق، إن وُجدت */}
          {item.suggested_amounts && item.suggested_amounts.length > 0 && (
            <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {item.suggested_amounts.map((s) => {
                const isActive = parseFloat(customAmount) === s.amount;
                return (
                  <button
                    key={s.amount}
                    type="button"
                    onClick={() => setCustomAmount(String(s.amount))}
                    className={`rounded-xl border px-4 py-3 text-right transition-colors ${
                      isActive
                        ? "border-brand-primary bg-brand-primary/5"
                        : "border-brand-border hover:border-brand-primary/40"
                    }`}
                  >
                    <span className="block font-bold text-brand-primary">
                      {s.amount.toLocaleString("ar-EG")} جنيه
                    </span>
                    {s.label && (
                      <span className="mt-0.5 block text-xs text-brand-text-secondary">
                        {s.label}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <input
            type="number"
            inputMode="numeric"
            min={1}
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="أو أدخل مبلغًا آخر"
            className="w-full rounded-xl border border-brand-border px-4 py-3 text-lg font-bold text-brand-primary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>
      ) : (
        <div>
          <label className="mb-2 block text-sm font-bold text-brand-primary">
            عدد الوحدات
          </label>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_MULTIPLIERS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setQuantity(m)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                  quantity === m
                    ? "border-brand-primary bg-brand-primary text-white"
                    : "border-brand-border text-brand-primary hover:border-brand-primary"
                }`}
              >
                {m}
              </button>
            ))}
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-20 rounded-full border border-brand-border px-3 py-2 text-center text-sm font-bold text-brand-primary focus:border-brand-primary focus:outline-none"
            />
          </div>
          <p className="mt-2 text-sm text-brand-text-secondary">
            الإجمالي:{" "}
            <span className="tabular-nums-ltr font-bold text-brand-primary">
              {computedAmount.toLocaleString("ar-EG")} جنيه
            </span>
          </p>
        </div>
      )}

      {/* خيار التكرار (يظهر فقط إذا كان العنصر يسمح بالتبرع المتكرر) */}
      {item.allow_recurring && (
        <div className="border-t border-brand-border pt-5">
          <label className="mb-2 block text-sm font-bold text-brand-primary">
            نوع التبرع
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRecurrence("one_time")}
              className={`rounded-xl border px-4 py-3 text-center text-sm font-bold transition-colors ${
                recurrence === "one_time"
                  ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                  : "border-brand-border text-brand-text-secondary hover:border-brand-primary/40"
              }`}
            >
              مرة واحدة
            </button>
            <button
              type="button"
              onClick={() => setRecurrence("monthly")}
              className={`rounded-xl border px-4 py-3 text-center text-sm font-bold transition-colors ${
                recurrence === "monthly"
                  ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                  : "border-brand-border text-brand-text-secondary hover:border-brand-primary/40"
              }`}
            >
              شهري متكرر
            </button>
          </div>
          {recurrence === "monthly" && (
            <p className="mt-2 text-xs text-brand-text-secondary">
              سيتجدد تبرعك شهريًا تلقائيًا، ويمكنك إيقافه في أي وقت.
            </p>
          )}
        </div>
      )}

      {/* بيانات المتبرع */}
      <div className="space-y-3 border-t border-brand-border pt-5">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="h-4 w-4 rounded border-brand-border accent-[var(--color-primary)]"
          />
          أتبرع بدون إظهار اسمي (مجهول)
        </label>

        {!isAnonymous && (
          <input
            type="text"
            required={!isAnonymous}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="الاسم بالكامل"
            className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
          />
        )}

        <input
          type="text"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="رقم الموبايل أو البريد الإلكتروني"
          className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
        />

        <textarea
          value={donorMessage}
          onChange={(e) => setDonorMessage(e.target.value)}
          placeholder="رسالة دعم اختيارية (لن تُنشر علنًا)"
          rows={2}
          className="w-full resize-none rounded-xl border border-brand-border px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
        />
      </div>

      {errorMessage && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-brand-danger">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-brand-accent py-3.5 text-base font-bold text-white transition-colors hover:bg-brand-accent-dark disabled:opacity-60"
      >
        {isSubmitting ? "جارٍ التحويل لصفحة الدفع..." : "إتمام التبرع"}
      </button>

      <p className="text-center text-xs text-brand-text-secondary">
        الدفع آمن ومشفّر بالكامل عبر بوابة دفع موثوقة
      </p>
    </form>
  );
}
