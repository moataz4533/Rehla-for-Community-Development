import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getDonationItemsByCategory,
  getSubcategoriesByCategory,
} from "@/lib/data/queries";
import { DonationItemCard } from "@/components/home/DonationItemCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.name_ar,
    description: category.short_description_ar ?? undefined,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const [items, subcategories] = await Promise.all([
    getDonationItemsByCategory(category.id),
    getSubcategoriesByCategory(category.id),
  ]);

  return (
    <div>
      {/* رأس صفحة المحور */}
      <section
        className="py-14 text-white"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">
            {category.name_ar}
          </h1>
          {category.long_description_ar ? (
            <p className="mt-4 max-w-2xl text-white/80">
              {category.long_description_ar}
            </p>
          ) : category.short_description_ar ? (
            <p className="mt-4 max-w-2xl text-white/80">
              {category.short_description_ar}
            </p>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* التصنيفات الفرعية، لو موجودة لهذا المحور */}
        {subcategories.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-3">
            {subcategories.map((sub) => (
              <span
                key={sub.id}
                className="rounded-full border border-brand-border bg-brand-surface px-4 py-2 text-sm font-medium text-brand-primary"
              >
                {sub.name_ar}
              </span>
            ))}
          </div>
        )}

        {/* عناصر/حالات التبرع التابعة لهذا المحور */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <DonationItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-brand-border bg-brand-surface py-16 text-center">
            <p className="text-brand-text-secondary">
              لا توجد فرص تبرع متاحة في هذا المحور حاليًا، تابعنا قريبًا.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
