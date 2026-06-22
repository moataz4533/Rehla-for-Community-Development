"use client";

import { useState } from "react";
import Link from "next/link";
import { saveNews, deleteNews } from "@/app/admin/news/actions";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { NewsPost } from "@/lib/types/database";

export function NewsForm({ post }: { post?: NewsPost }) {
  return (
    <div className="mx-auto max-w-2xl p-4 sm:p-8">
      <div className="mb-6">
        <Link
          href="/admin/news"
          className="text-sm text-brand-text-secondary hover:text-brand-primary"
        >
          → العودة للقائمة
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-brand-primary">
          {post ? "تعديل الخبر" : "إضافة خبر جديد"}
        </h1>
      </div>

      <form action={saveNews} className="space-y-5">
        {post && <input type="hidden" name="id" value={post.id} />}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-primary">
            عنوان الخبر <span className="text-brand-danger">*</span>
          </label>
          <input
            name="title_ar"
            required
            defaultValue={post?.title_ar ?? ""}
            className="news-input"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-primary">
            مقتطف قصير
          </label>
          <textarea
            name="excerpt_ar"
            rows={2}
            defaultValue={post?.excerpt_ar ?? ""}
            className="news-input resize-none"
            placeholder="جملة أو جملتان تظهران في قائمة الأخبار"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-primary">
            نص الخبر
          </label>
          <textarea
            name="body_ar"
            rows={8}
            defaultValue={post?.body_ar ?? ""}
            className="news-input resize-none"
          />
        </div>

        <ImageUploader
          name="cover_image_url"
          defaultUrl={post?.cover_image_url}
          folder="news"
          label="صورة الغلاف"
        />

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="is_published"
            defaultChecked={post?.is_published ?? false}
            className="h-4 w-4 accent-[var(--color-primary)]"
          />
          نشر الخبر (ظاهر للجمهور)
        </label>

        <div className="border-t border-brand-border pt-5">
          <button
            type="submit"
            className="rounded-full bg-brand-primary px-8 py-3 text-sm font-bold text-white hover:bg-brand-primary-dark"
          >
            {post ? "حفظ التعديلات" : "إضافة الخبر"}
          </button>
        </div>
      </form>

      {post && (
        <form
          action={deleteNews}
          className="mt-8 border-t border-brand-border pt-6"
        >
          <input type="hidden" name="id" value={post.id} />
          <DeleteNewsButton />
        </form>
      )}

      <style>{`
        .news-input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid var(--color-border);
          padding: 10px 16px;
          font-size: 14px;
        }
        .news-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(31,58,53,0.1);
        }
      `}</style>
    </div>
  );
}

function DeleteNewsButton() {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="text-sm font-medium text-brand-danger hover:underline"
      >
        حذف هذا الخبر نهائيًا
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4">
      <span className="text-sm text-brand-danger">متأكد؟ لا يمكن التراجع.</span>
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
