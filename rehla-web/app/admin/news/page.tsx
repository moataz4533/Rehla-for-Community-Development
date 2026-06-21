import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { adminGetAllNews } from "@/lib/data/admin-queries";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const posts = await adminGetAllNews();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-primary">الأخبار</h1>
          <p className="mt-1 text-sm text-brand-text-secondary">
            {posts.length} خبر
          </p>
        </div>
        <Link
          href="/admin/news/new"
          className="flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-primary-dark"
        >
          <Plus size={18} />
          إضافة خبر
        </Link>
      </div>

      {posts.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-brand-border bg-white">
          <table className="w-full text-right text-sm">
            <thead className="border-b border-brand-border bg-brand-surface text-brand-text-secondary">
              <tr>
                <th className="px-5 py-3 font-medium">العنوان</th>
                <th className="px-5 py-3 font-medium">الحالة</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-brand-surface/50">
                  <td className="px-5 py-3.5 font-medium text-brand-primary">
                    {post.title_ar}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="inline-block rounded-full px-2.5 py-1 text-xs font-bold text-white"
                      style={{
                        backgroundColor: post.is_published
                          ? "#2E7D5B"
                          : "#9CA3AF",
                      }}
                    >
                      {post.is_published ? "منشور" : "مسودة"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/admin/news/${post.id}`}
                      className="inline-flex items-center gap-1 text-brand-primary hover:text-brand-accent"
                    >
                      <Pencil size={15} />
                      تعديل
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-brand-border bg-white py-16 text-center text-brand-text-secondary">
          لا توجد أخبار بعد.
        </div>
      )}
    </div>
  );
}
