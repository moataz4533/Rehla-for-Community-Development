import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { getSiteSettings } from "@/lib/data/settings";

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.45 2.91h-2.33V22c4.78-.81 8.44-4.94 8.44-9.94z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.34 18V9.75H5.67V18zM7 8.59A1.38 1.38 0 1 0 7 5.83a1.38 1.38 0 0 0 0 2.76zM18.34 18v-4.6c0-2.46-1.31-3.6-3.06-3.6a2.64 2.64 0 0 0-2.39 1.31h-.03V9.75H10.2c.03.71 0 8.25 0 8.25h2.66v-4.6c0-.25.02-.5.1-.68a1.48 1.48 0 0 1 1.39-1c.98 0 1.37.75 1.37 1.84V18z" />
    </svg>
  );
}

const FOOTER_LINKS = {
  about: [
    { href: "/about", label: "عن المؤسسة" },
    { href: "/about#vision", label: "الرؤية والأهداف" },
    { href: "/news", label: "أخبارنا" },
  ],
  programs: [
    { href: "/programs/economic-empowerment", label: "التمكين الاقتصادي" },
    { href: "/programs/education", label: "التعليم" },
    { href: "/programs/health", label: "الصحة" },
    { href: "/programs/training", label: "التدريبات" },
    { href: "/programs/care-homes", label: "دور الرعاية" },
    { href: "/programs/charity-funds", label: "صناديق الخير" },
  ],
};

export async function SiteFooter() {
  const settings = await getSiteSettings();

  const socials = [
    { url: settings.social_facebook, label: "فيسبوك", Icon: FacebookIcon },
    { url: settings.social_instagram, label: "إنستجرام", Icon: InstagramIcon },
    { url: settings.social_youtube, label: "يوتيوب", Icon: YoutubeIcon },
    { url: settings.social_linkedin, label: "لينكدإن", Icon: LinkedinIcon },
  ].filter((s) => s.url && s.url.trim().length > 0);

  const phone = settings.contact_phone?.trim();
  const email = settings.contact_email?.trim();

  return (
    <footer
      className="mt-20 text-white"
      style={{ backgroundColor: "var(--color-primary-dark)" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* عن المؤسسة */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold">رحلة للتنمية المجتمعية</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              مؤسسة غير ربحية تعمل على بناء حياة كريمة عبر التمكين الاقتصادي،
              التعليم، الصحة، والتدريب، ودعم دور الرعاية.
            </p>
            {socials.length > 0 && (
              <div className="mt-4 flex gap-3">
                {socials.map((s) => (
                  <SocialIcon key={s.label} href={s.url} label={s.label}>
                    <s.Icon />
                  </SocialIcon>
                ))}
              </div>
            )}
          </div>

          <FooterColumn title="عن المؤسسة" links={FOOTER_LINKS.about} />
          <FooterColumn title="محاور العمل" links={FOOTER_LINKS.programs} />

          {/* التواصل */}
          <div>
            <h4 className="text-sm font-bold text-white/90">تواصل معنا</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-brand-accent" />
                <span dir="ltr">{phone || "سيُستكمل رقم التواصل"}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-brand-accent" />
                <span dir="ltr">{email || "سيُستكمل البريد الإلكتروني"}</span>
              </li>
            </ul>
            <Link
              href="/donate"
              className="mt-5 inline-block rounded-full bg-brand-accent px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-accent-dark"
            >
              تبرع الآن
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>
            مؤسسة رحلة للتنمية المجتمعية — منظمة غير هادفة للربح.
          </p>
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-bold text-white/90">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-accent"
    >
      {children}
    </a>
  );
}
