import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { getActiveCategories } from "@/lib/data/queries";
import { getSiteSettings } from "@/lib/data/settings";

export const revalidate = 60;

export const metadata = {
  title: "محاور العمل",
  description:
    "تعرّف على المحاور الستة لمؤسسة رحلة للتنمية المجتمعية: التمكين الاقتصادي، التعليم، الصحة، التدريبات، دور الرعاية، وصناديق الخير.",
};

export default async function ProgramsPage() {
  const [categories, settings] = await Promise.all([
    getActiveCategories(),
    getSiteSettings(),
  ]);

  return (
    <div>
      <section
        className="py-14 text-white"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">محاور العمل</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            ستة محاور تنموية متكاملة، كل واحد منها رحلة مستقلة نحو حياة كريمة.
          </p>
        </div>
      </section>
      <CategoriesGrid categories={categories} settings={settings} />
    </div>
  );
}
