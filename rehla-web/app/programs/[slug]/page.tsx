import { notFound } from "next/navigation";
import { Users } from "lucide-react";
import {
  getCategoryBySlug,
  getDonationItemsByCategory,
  getSubcategoriesByCategory,
} from "@/lib/data/queries";
import { DonationItemCard } from "@/components/home/DonationItemCard";

export const revalidate = 60;

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
        className="py-16 text-white"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">{category.name_ar}</h1>
          {category.short_description_ar && (
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              {category.short_description_ar}
            </p>
          )}
        </div>
      </section>

      {/* الوصف الكامل للمحور */}
      {category.long_description_ar && (
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-gray-700">
            {category.long_description_ar}
          </p>
        </section>
      )}

      {/* الفئات المستهدفة داخل المحور */}
      {subcategories.length > 0 && (
        <section className="bg-brand-surface">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center gap-2">
              <Users size={20} className="text-brand-accent" />
              <h2 className="text-xl font-bold text-brand-primary">
                من نخدم في هذا المحور
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {subcategories.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center gap-3 rounded-xl border border-brand-border bg-white px-5 py-4"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-brand-accent" />
                  <span className="font-medium text-brand-primary">
                    {sub.name_ar}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* فرص التبرع في هذا المحور */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-xl font-bold text-brand-primary">
          فرص التبرع في {category.name_ar}
        </h2>
        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <DonationItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-brand-border bg-brand-surface py-16 text-center">
            <p className="text-brand-text-secondary">
              نعمل على إضافة فرص تبرع في هذا المحور قريبًا. يمكنك دعمنا الآن عبر
              صناديق الخير، وسنوجّه مساهمتك حيث تشتدّ الحاجة.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
