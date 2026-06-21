# رحلة للتنمية المجتمعية | Rehla for Community Development

موقع المؤسسة الرسمي — مبني بـ Next.js 16 (App Router) + Tailwind CSS v4 +
Supabase. يدعم الاتجاه العربي (RTL) بالكامل.

## التشغيل المحلي

```bash
npm install
```

أنشئ ملف `.env.local` في جذر المشروع، وضع فيه المحتوى التالي
(القيمتان العامتان فعليتان لمشروعك، فقط أضف المفتاح السري):

```
NEXT_PUBLIC_SUPABASE_URL=https://nezcvqphhwdxsldvcxen.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_SIh20ZYAwRQH4FHNTjut3g_PcEbT4CD
SUPABASE_SERVICE_ROLE_KEY=القيمة_السرية_من_Settings>API>service_role
```

> **تنبيه أمان:** `SUPABASE_SERVICE_ROLE_KEY` مفتاح سري بصلاحيات كاملة على
> قاعدة البيانات، يتجاوز كل صلاحيات RLS. لا تضعه أبدًا في كود يصل للمتصفح،
> ولا في أي ملف يُرفع إلى Git (`.env.local` مستثنى تلقائيًا في `.gitignore`).
> يُستخدم فقط داخل `app/api/*` (كود سيرفر).

ثم شغّل:

```bash
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000).

## هيكل المشروع

```
app/
  page.tsx                  الصفحة الرئيسية
  about/                    عن المؤسسة
  contact/                  تواصل معنا
  news/                     الأخبار
  programs/                 فهرس المحاور + صفحة كل محور [slug]
  donate/[slug]/            صفحة عنصر/حالة تبرع منفردة
  donate/thank-you/         صفحة الشكر بعد التبرع
  api/donations/            استقبال طلبات التبرع (Server-side)

components/
  layout/                   الهيدر والفوتر
  home/                     مكونات الصفحة الرئيسية (هيرو، شبكة المحاور، بطاقة التبرع)
  donate/                   نموذج التبرع التفاعلي

lib/
  supabase/                 عملاء Supabase (browser, server, admin)
  data/queries.ts           كل دوال جلب البيانات من قاعدة البيانات
  types/database.ts         أنواع TypeScript المطابقة لجداول قاعدة البيانات
```

## نظام التصميم المؤقت

كل الألوان والخطوط معرّفة كمتغيرات CSS واحدة في `app/globals.css`
(قسم "نظام التصميم المؤقت"). عند اعتماد الهوية البصرية النهائية من
الإدارة، التغيير يكون في مكان واحد فقط:

- `--color-primary` / `--color-accent` للألوان الأساسية
- `--font-arabic-display` / `--font-arabic-body` للخطوط

## ربط الخط العربي عند النشر

محليًا، تم تعطيل `next/font/google` لـ "IBM Plex Sans Arabic" مؤقتًا بسبب
قيود شبكة بيئة التطوير الحالية (لا يوجد وصول لـ fonts.googleapis.com).
**عند النشر على Vercel، فعّل الخط مجددًا** باتباع التعليمات المكتوبة كتعليق
في `app/layout.tsx`.

## الخطوة التالية: ربط بوابة الدفع (Paymob)

نقطة الربط جاهزة ومُعلَّمة بوضوح في `app/api/donations/route.ts`
(القسم 5 من الكود). عند توفر مفاتيح Paymob الحقيقية:

1. أضف `PAYMOB_API_KEY` و `PAYMOB_INTEGRATION_ID` و `PAYMOB_HMAC_SECRET`
   في إعدادات البيئة على Vercel
2. استبدل الجزء المُعلَّم في `route.ts` بمنطق استدعاء Paymob الفعلي
3. أضف `app/api/webhooks/paymob/route.ts` لاستقبال تأكيد الدفع وتحديث
   حالة التبرع من `pending` إلى `paid`

## النشر على Vercel

### الطريقة الموصى بها (عبر GitHub)
1. أنشئ مستودع (repository) جديد على GitHub، وارفع محتوى هذا المجلد إليه
   (لا تقلق، `.gitignore` يستثني `.env.local` و `node_modules` تلقائيًا)
2. على [vercel.com](https://vercel.com)، اختر "Add New Project" واربطه
   بالمستودع
3. في خطوة الإعداد، أضف متغيرات البيئة الثلاثة (Settings → Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://nezcvqphhwdxsldvcxen.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `sb_publishable_SIh20ZYAwRQH4FHNTjut3g_PcEbT4CD`
   - `SUPABASE_SERVICE_ROLE_KEY` = (من Supabase: Settings → API → service_role، القيمة السرية)
4. اضغط Deploy

### الطريقة المباشرة (CLI)
```bash
npm install -g vercel
vercel
# اتبع التعليمات، وأضف متغيرات البيئة عند السؤال عنها
```

بعد أول نشر ناجح، تأكد أن الصفحة الرئيسية تعرض المحاور الستة فعليًا من
قاعدة البيانات (هذا ما تعذّر اختباره في بيئة التطوير المحلية بسبب قيود
شبكة الـ sandbox التي لا تسمح بالوصول لـ `*.supabase.co`، لكنه يعمل
طبيعيًا على أي سيرفر له وصول كامل للإنترنت كـ Vercel).
