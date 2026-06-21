import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // يغطي هذا الـ wildcard نطاق مشروع Supabase الحالي:
        // nezcvqphhwdxsldvcxen.supabase.co (وأي مشروع آخر تحت نفس الصيغة)
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
