import Link from "next/link";
import { Pencil } from "lucide-react";
import { adminGetAllCategories } from "@/lib/data/admin-queries";

export const dynamic = "force-dynamic";

export default async function AdminProgramsPage() {
  const categories = await adminGetAllCategories();

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-primary">المحاور</h1>
        <p className="mt-1 text-sm text-brand-text-secondary">
          المحاور الستة للمؤسسة — يمكنك تعديل محتوى كل محور
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-start justify-between rounded-2xl border border-brand-border bg-white p-5"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-brand-primary">{cat.name_ar}</h3>
                {!cat.is_active && (
                  <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                    مخفي
                  </span>
                )}
              </div>
              {cat.short_description_ar && (
                <p className="mt-1.5 line-clamp-2 text-sm text-brand-text-secondary">
                  {cat.short_description_ar}
                </p>
              )}
            </div>
            <Link
              href={`/admin/programs/${cat.id}`}
              className="ms-3 inline-flex shrink-0 items-center gap-1 rounded-full border border-brand-border px-4 py-2 text-sm font-medium text-brand-primary hover:bg-brand-surface"
            >
              <Pencil size={14} />
              تعديل
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
