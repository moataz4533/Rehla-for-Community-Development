import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ProgramForm } from "@/components/admin/ProgramForm";
import type { Category } from "@/lib/types/database";

export const dynamic = "force-dynamic";

async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export default async function EditProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getCategoryById(id);

  if (!category) notFound();

  return <ProgramForm category={category} />;
}
