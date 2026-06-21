import Link from "next/link";
import Image from "next/image";
import { getPublishedNews } from "@/lib/data/queries";

export const metadata = {
  title: "أخبار المؤسسة",
};

export default async function NewsPage() {
  const posts = await getPublishedNews();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-brand-primary sm:text-4xl">
          أخبار المؤسسة
        </h1>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-brand-border bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] w-full bg-brand-surface">
                {post.cover_image_url && (
                  <Image
                    src={post.cover_image_url}
                    alt={post.title_ar}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-5">
                <h3 className="line-clamp-2 font-bold text-brand-primary">
                  {post.title_ar}
                </h3>
                {post.excerpt_ar && (
                  <p className="mt-2 line-clamp-2 text-sm text-brand-text-secondary">
                    {post.excerpt_ar}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-brand-border bg-brand-surface py-16 text-center text-brand-text-secondary">
          لا توجد أخبار منشورة حاليًا، تابعنا قريبًا.
        </div>
      )}
    </div>
  );
}
