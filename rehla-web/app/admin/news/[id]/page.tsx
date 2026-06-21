import { notFound } from "next/navigation";
import { adminGetNewsById } from "@/lib/data/admin-queries";
import { NewsForm } from "@/components/admin/NewsForm";

export const dynamic = "force-dynamic";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (id === "new") notFound();

  const post = await adminGetNewsById(id);
  if (!post) notFound();

  return <NewsForm post={post} />;
}
