import { HomeHero } from "@/components/home/HomeHero";
import { TrustBar } from "@/components/home/TrustBar";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { StatsStrip } from "@/components/home/StatsStrip";
import { HowItWorks } from "@/components/home/HowItWorks";
import { DonationItemCard } from "@/components/home/DonationItemCard";
import {
  getActiveCategories,
  getFeaturedDonationItems,
} from "@/lib/data/queries";
import { getSiteSettings, settingOr } from "@/lib/data/settings";

export const revalidate = 60;

export default async function HomePage() {
  const [categories, featuredItems, settings] = await Promise.all([
    getActiveCategories(),
    getFeaturedDonationItems(),
    getSiteSettings(),
  ]);

  return (
    <>
      <HomeHero settings={settings} />
      <TrustBar settings={settings} />
      <StatsStrip settings={settings} />
      <CategoriesGrid categories={categories} settings={settings} />
      <HowItWorks settings={settings} />

      {featuredItems.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-sm font-bold text-brand-accent">تبرع الآن</span>
            <h2 className="mt-2 text-2xl font-bold text-brand-primary sm:text-3xl">
              {settingOr(settings, "featured_title", "حالات وفرص تبرع مباشرة")}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredItems.map((item) => (
              <DonationItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
