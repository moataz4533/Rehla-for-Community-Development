import Image from "next/image";

/**
 * مكوّن صورة آمن: يستخدم next/image المحسّن للصور من نطاق Supabase
 * المعروف، ويسقط تلقائيًا إلى وسم img عادي لأي نطاق آخر — حتى لا تتسبب
 * أي صورة من نطاق غير مُعرَّف في next.config.ts في إسقاط الصفحة بخطأ.
 */
export function SafeImage({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  let isSupabaseHost = false;
  try {
    const host = new URL(src).hostname;
    isSupabaseHost = host.endsWith(".supabase.co");
  } catch {
    // رابط غير صالح تمامًا — سنستخدم img العادي الذي لا يكسر التصيير
    isSupabaseHost = false;
  }

  if (isSupabaseHost) {
    return (
      <Image src={src} alt={alt} fill className={className} priority={priority} />
    );
  }

  // نطاق غير معروف أو رابط غير قياسي: img عادي آمن
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`absolute inset-0 h-full w-full object-cover ${className ?? ""}`}
    />
  );
}
