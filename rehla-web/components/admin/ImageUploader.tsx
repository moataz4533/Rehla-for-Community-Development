"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * مكوّن رفع صورة إلى Supabase Storage (bucket: media).
 * يعرض معاينة للصورة الحالية، ويسمح برفع صورة جديدة أو إزالتها.
 * القيمة النهائية (رابط الصورة العام) تُحفظ في حقل مخفي باسم `name`
 * ليُرسَل مع النموذج.
 */
export function ImageUploader({
  name,
  defaultUrl,
  folder = "uploads",
  label = "الصورة",
}: {
  name: string;
  defaultUrl?: string | null;
  folder?: string;
  label?: string;
}) {
  const [url, setUrl] = useState<string>(defaultUrl ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // تحقق أساسي: النوع والحجم (حد أقصى 5 ميجابايت)
    if (!file.type.startsWith("image/")) {
      setError("من فضلك اختر ملف صورة صالح");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("حجم الصورة كبير جدًا (الحد الأقصى 5 ميجابايت)");
      return;
    }

    setIsUploading(true);

    try {
      const supabase = createSupabaseBrowserClient();

      // اسم ملف فريد لتفادي التعارض
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${folder}/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        setError("تعذّر رفع الصورة. تأكد من صلاحياتك وحاول مجددًا.");
        setIsUploading(false);
        return;
      }

      // الحصول على الرابط العام
      const { data } = supabase.storage.from("media").getPublicUrl(fileName);
      setUrl(data.publicUrl);
    } catch {
      setError("حدث خطأ غير متوقع أثناء الرفع");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-brand-primary">
        {label}
      </label>

      {/* حقل مخفي يحمل الرابط ليُرسَل مع النموذج */}
      <input type="hidden" name={name} value={url} />

      {url ? (
        <div className="relative inline-block">
          <div className="relative h-40 w-64 overflow-hidden rounded-xl border border-brand-border bg-brand-surface">
            {/* نستخدم img عادي لأن الرابط قد يكون من Supabase أو غيره */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt="معاينة"
              className="h-full w-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setUrl("");
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="absolute -left-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-danger text-white shadow"
            aria-label="إزالة الصورة"
          >
            <X size={15} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="flex h-40 w-64 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-border bg-brand-surface text-brand-text-secondary transition-colors hover:border-brand-primary/40 disabled:opacity-60"
        >
          {isUploading ? (
            <>
              <Loader2 size={24} className="animate-spin" />
              <span className="text-sm">جارٍ الرفع...</span>
            </>
          ) : (
            <>
              <Upload size={24} />
              <span className="text-sm">اضغط لرفع صورة</span>
              <span className="text-xs">حتى 5 ميجابايت</span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <p className="mt-2 text-sm text-brand-danger">{error}</p>
      )}
    </div>
  );
}
