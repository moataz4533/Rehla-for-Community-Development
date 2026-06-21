import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

interface DonationRequestBody {
  donationItemId: string;
  amount: number;
  quantity: number;
  fullName: string;
  contact: string; // إيميل أو رقم تليفون
  isAnonymous: boolean;
  donorMessage?: string;
  recurrence?: string; // 'one_time' أو 'monthly'
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: NextRequest) {
  let body: DonationRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "بيانات الطلب غير صحيحة" }, { status: 400 });
  }

  const { donationItemId, amount, quantity, fullName, contact, isAnonymous, donorMessage, recurrence } =
    body;

  // التحقق من قيمة التكرار (قائمة بيضaء)
  const safeRecurrence = recurrence === "monthly" ? "monthly" : "one_time";

  // ------------------------------------------------------------
  // 1) التحقق الأساسي من صحة البيانات
  // ------------------------------------------------------------
  if (!donationItemId || !amount || amount <= 0) {
    return NextResponse.json(
      { error: "بيانات التبرع غير مكتملة أو غير صحيحة" },
      { status: 400 }
    );
  }
  if (!contact || contact.trim().length < 3) {
    return NextResponse.json(
      { error: "من فضلك أدخل رقم موبايل أو بريد إلكتروني صحيح" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();

  // ------------------------------------------------------------
  // 2) التأكد أن العنصر موجود وما زال متاحًا للتبرع
  // ------------------------------------------------------------
  const { data: item, error: itemError } = await supabase
    .from("donation_items")
    .select("id, status, title_ar")
    .eq("id", donationItemId)
    .single();

  if (itemError || !item) {
    return NextResponse.json({ error: "عنصر التبرع غير موجود" }, { status: 404 });
  }
  if (item.status === "completed" || item.status === "paused") {
    return NextResponse.json(
      { error: "هذه الحالة لا تقبل تبرعات جديدة حاليًا" },
      { status: 409 }
    );
  }

  // ------------------------------------------------------------
  // 3) إيجاد المتبرع أو إنشاؤه
  // ------------------------------------------------------------
  const donorEmail = isEmail(contact) ? contact : null;
  const donorPhone = !donorEmail ? contact : null;

  let donorId: string;

  const { data: existingDonor } = await supabase
    .from("donors")
    .select("id")
    .or(
      [
        donorEmail ? `email.eq.${donorEmail}` : null,
        donorPhone ? `phone.eq.${donorPhone}` : null,
      ]
        .filter(Boolean)
        .join(",")
    )
    .maybeSingle();

  if (existingDonor) {
    donorId = existingDonor.id;
  } else {
    const { data: newDonor, error: donorError } = await supabase
      .from("donors")
      .insert({
        full_name: fullName || "متبرع كريم",
        email: donorEmail,
        phone: donorPhone,
        is_anonymous: isAnonymous,
      })
      .select("id")
      .single();

    if (donorError || !newDonor) {
      console.error("donor insert error:", donorError?.message);
      return NextResponse.json(
        { error: "تعذر حفظ بيانات المتبرع، حاول مرة أخرى" },
        { status: 500 }
      );
    }
    donorId = newDonor.id;
  }

  // ------------------------------------------------------------
  // 4) إنشاء سجل التبرع بحالة pending
  // ------------------------------------------------------------
  const { data: donation, error: donationError } = await supabase
    .from("donations")
    .insert({
      donation_item_id: donationItemId,
      donor_id: donorId,
      amount,
      quantity: quantity || 1,
      status: "pending",
      donor_message: donorMessage || null,
      is_anonymous_display: isAnonymous,
      is_recurring: safeRecurrence === "monthly",
      recurrence: safeRecurrence,
    })
    .select("id")
    .single();

  if (donationError || !donation) {
    console.error("donation insert error:", donationError?.message);
    return NextResponse.json(
      { error: "تعذر إنشاء سجل التبرع، حاول مرة أخرى" },
      { status: 500 }
    );
  }

  // ------------------------------------------------------------
  // 5) نقطة ربط بوابة الدفع (Paymob) — لم يتم تفعيلها بعد
  // ------------------------------------------------------------
  // عند توفر مفاتيح Paymob الحقيقية، يُستبدل الكود التالي بمنطق:
  //   أ) طلب auth token من Paymob
  //   ب) تسجيل "order" بالمبلغ المطلوب
  //   ج) طلب "payment key" مرتبط بالـ integration_id المناسب
  //   د) إعادة رابط صفحة الدفع (iframe أو redirect) للمتصفح
  //
  // مثال (يُفعَّل لاحقًا، يتطلب env vars: PAYMOB_API_KEY, PAYMOB_INTEGRATION_ID):
  //
  // const authToken = await getPaymobAuthToken();
  // const order = await createPaymobOrder(authToken, amount, donation.id);
  // const paymentKey = await getPaymobPaymentKey(authToken, order.id, amount);
  // const redirectUrl = `https://accept.paymob.com/api/acceptance/iframes/{iframe_id}?payment_token=${paymentKey}`;
  //
  // return NextResponse.json({ donationId: donation.id, redirectUrl });

  return NextResponse.json({
    donationId: donation.id,
    redirectUrl: null, // سيُستبدل برابط Paymob الفعلي بعد الربط
  });
}
