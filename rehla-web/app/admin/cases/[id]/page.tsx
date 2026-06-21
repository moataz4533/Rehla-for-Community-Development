import { notFound } from "next/navigation";
import { adminGetItemById, adminGetAllCategories } from "@/lib/data/admin-queries";
import { CaseForm } from "@/components/admin/CaseForm";

export const dynamic = "force-dynamic";

export default async function EditCasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // "new" يُعالَج في مسار منفصل، لكن نحتاط لأي تعارض
  if (id === "new") notFound();

  const [item, categories] = await Promise.all([
    adminGetItemById(id),
    adminGetAllCategories(),
  ]);

  if (!item) notFound();

  return <CaseForm categories={categories} item={item} />;
}
