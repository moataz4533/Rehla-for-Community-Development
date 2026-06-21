import { adminGetAllCategories } from "@/lib/data/admin-queries";
import { CaseForm } from "@/components/admin/CaseForm";

export const dynamic = "force-dynamic";

export default async function NewCasePage() {
  const categories = await adminGetAllCategories();
  return <CaseForm categories={categories} />;
}
