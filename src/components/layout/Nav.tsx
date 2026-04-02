"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";

/* 主導航：最重要的 6 個 */
const mainLinks = [
  { href: "/", key: "home" },
  { href: "/skills", key: "skills" },
  { href: "/install", key: "install" },
  { href: "/guide", key: "guide" },
  { href: "/blog", key: "blog" },
  { href: "/about", key: "about" },
] as const;

/* 更多：其餘項目 */
const moreLinks = [
  { href: "/bundles", key: "bundles" },
  { href: "/resources", key: "resources" },
  { href: "/llms", key: "llms" },
  { href: "/models", key: "models" },
] as const;

/* 全部（手機版用） */
const allLinks = [...mainLinks, ...moreLinks];

export default function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const switchLocale = () => {
    const next = locale === "zh-TW" ? "en" : "zh-TW";
    router.replace(pathname, { locale: next });
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isMoreActive = moreLinks.some((link) => isActive(link.href));

  /* 點外面關閉 dropdown */
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
      setMoreOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const linkClass = (active: boolean) =>
    `rounded-md px-3 py-1.5 text-sm transition-colors duration-200 ${
      active
        ? "text-primary bg-primary/10"
        : "text-[#c0c0c0] hover:text-white hover:bg-white/5"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/85 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="font-heading text-xl font-bold tracking-tight text-primary">
            HunterKit
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-0.5 md:flex">
          {mainLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={linkClass(isActive(link.href))}
            >
              {t(link.key)}
            </Link>
          ))}

          {/* More dropdown */}
          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={`flex items-center gap-1 ${linkClass(isMoreActive && !moreOpen)}`}
            >
              {t("more") ?? "更多"}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
              >
                <polyline points="3,4.5 6,7.5 9,4.5" />
              </svg>
            </button>

            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0f]/95 backdrop-blur-xl shadow-xl">
                {moreLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setMoreOpen(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors duration-200 ${
                      isActive(link.href)
                        ? "text-primary bg-primary/10"
                        : "text-[#c0c0c0] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-shrink-0 items-center gap-3">
          <button
            onClick={switchLocale}
            className="rounded-md border border-white/[0.08] px-3 py-1.5 text-sm text-[#c0c0c0] transition-colors duration-200 hover:border-primary/30 hover:text-white"
          >
            {locale === "zh-TW" ? "EN" : "中文"}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-[#c0c0c0] transition-colors hover:bg-white/5 hover:text-white md:hidden"
            aria-label={t("toggleMenu")}
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

      {/* Mobile Menu — 全部項目 */}
      <div
        className={`overflow-hidden border-t border-white/[0.06] bg-[#0a0a0f]/95 backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden ${
          mobileOpen ? "max-h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <div className="space-y-0.5 px-4 py-3">
          {allLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-md px-3 py-2.5 text-sm transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-primary bg-primary/10"
                  : "text-[#c0c0c0] hover:text-white hover:bg-white/5"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
