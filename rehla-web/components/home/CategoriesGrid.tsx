import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  HeartPulse,
  Users,
  HandHeart,
  Gift,
  ArrowLeft,
} from "lucide-react";
import type { Category } from "@/lib/types/database";
import type { SiteSettings } from "@/lib/data/settings";
import { settingOr } from "@/lib/data/settings";

// أيقونات افتراضية لكل محور حسب الـ slug
const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "economic-empowerment": Briefcase,
  education: GraduationCap,
  health: HeartPulse,
  training: Users,
  "care-homes": HandHeart,
  "charity-funds": Gift,
};

export function CategoriesGrid({
  categories,
  settings,
}: {
  categories: Category[];
  settings: SiteSettings;
}) {
  const title = settingOr(settings, "categories_title", "ستة محاور، رحلة واحدة");
  const subtitle = settingOr(
    settings,
    "categories_subtitle",
    "كل محور بوابة لتغيير حقيقي في حياة إنسان. اختر المحور الذي يلامس قلبك، وكن جزءًا من رحلته."
  );

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <span className="text-sm font-bold text-brand-accent">محاور العمل</span>
        <h2 className="mt-2 text-2xl font-bold text-brand-primary sm:text-3xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-brand-text-secondary">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category.slug] ?? Gift;
          return (
            <Link
              key={category.id}
              href={`/programs/${category.slug}`}
              className="group relative flex flex-col rounded-2xl border border-brand-border bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: "var(--color-surface)",
                  color: "var(--color-primary)",
                }}
              >
                <Icon size={24} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-brand-primary">
                {category.name_ar}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-text-secondary">
                {category.short_description_ar}
              </p>
              <span className="mt-5 flex items-center gap-1.5 text-sm font-bold text-brand-accent">
                اعرف أكثر
                <ArrowLeft
                  size={16}
                  className="transition-transform group-hover:-translate-x-1"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
