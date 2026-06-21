// أنواع TypeScript مطابقة لجداول قاعدة البيانات في Supabase
// يجب تحديث هذا الملف يدويًا عند أي تغيير في schema قاعدة البيانات،
// أو توليده تلقائيًا لاحقًا عبر Supabase CLI (supabase gen types typescript)

export type DonationStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "cancelled";

export type ItemKind = "fixed_item" | "funded_case";

export type ItemStatus = "active" | "completed" | "paused" | "draft";

export type AdminRole = "super_admin" | "content_editor" | "finance_viewer";

export interface Category {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string | null;
  short_description_ar: string | null;
  long_description_ar: string | null;
  icon: string | null;
  cover_image_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subcategory {
  id: string;
  category_id: string;
  slug: string;
  name_ar: string;
  name_en: string | null;
  description_ar: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface DonationItem {
  id: string;
  category_id: string;
  subcategory_id: string | null;
  slug: string;
  title_ar: string;
  title_en: string | null;
  description_ar: string | null;
  description_en: string | null;
  kind: ItemKind;
  status: ItemStatus;
  unit_price: number | null;
  goal_amount: number | null;
  raised_amount: number;
  deadline: string | null;
  cover_image_url: string | null;
  gallery_image_urls: string[] | null;
  suggested_amounts: SuggestedAmount[] | null;
  allow_recurring: boolean;
  is_featured: boolean;
  is_urgent: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface SuggestedAmount {
  amount: number;
  label: string;
}

export interface Donor {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  is_anonymous: boolean;
  created_at: string;
}

export interface Donation {
  id: string;
  donation_item_id: string;
  donor_id: string;
  amount: number;
  currency: string;
  quantity: number;
  status: DonationStatus;
  payment_gateway: string | null;
  gateway_transaction_id: string | null;
  gateway_order_id: string | null;
  donor_message: string | null;
  is_anonymous_display: boolean;
  is_recurring: boolean;
  recurrence: string;
  created_at: string;
  paid_at: string | null;
}

export interface NewsPost {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string | null;
  excerpt_ar: string | null;
  body_ar: string | null;
  cover_image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  auth_user_id: string | null;
  full_name: string;
  email: string;
  role: AdminRole;
  is_active: boolean;
  created_at: string;
}

// أنواع مساعدة للعرض في الواجهة
export interface DonationItemWithCategory extends DonationItem {
  category?: Category;
  subcategory?: Subcategory | null;
}
