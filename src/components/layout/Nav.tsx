"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/install", key: "install" },
  { href: "/skills", key: "skills" },
  { href: "/about", key: "about" },
  { href: "/blog", key: "blog" },
  { href: "/bundles", key: "bundles" },
] as const;

export default function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const switchLocale = () => {
    const next = locale === "zh-TW" ? "en" : "zh-TW";
    router.replace(pathname, { locale: next });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-gradient-purple font-heading text-xl font-bold tracking-tight">
            51Claw
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.key}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-primary-light bg-primary/10"
                    : "text-text-muted hover:text-foreground hover:bg-white/5"
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </div>

        {/* Right side: Language + Mobile toggle */}
        <div className="flex items-center gap-3">
          {/* Language Switch */}
          <button
            onClick={switchLocale}
            className="rounded-lg border border-card-border px-3 py-1.5 text-xs font-medium text-text-muted transition-colors duration-200 hover:border-primary/40 hover:text-primary-light"
          >
            {locale === "zh-TW" ? "EN" : "中文"}
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/5 hover:text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </>
              ) : (
                <>
                  <line x1="3" y1="5" x2="17" y2="5" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="15" x2="17" y2="15" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-card-border bg-background/95 backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <div className="space-y-1 px-4 py-3">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-primary-light bg-primary/10"
                    : "text-text-muted hover:text-foreground hover:bg-white/5"
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
