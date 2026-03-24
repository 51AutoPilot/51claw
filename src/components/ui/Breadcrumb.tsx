"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface BreadcrumbProps {
  currentPage: string;
}

export default function Breadcrumb({ currentPage }: BreadcrumbProps) {
  const t = useTranslations("nav");

  return (
    <nav className="mb-8 flex items-center gap-2 text-sm text-text-muted">
      <Link
        href="/"
        className="transition-colors duration-200 hover:text-primary-light"
      >
        {t("home")}
      </Link>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="opacity-50"
      >
        <polyline points="4,2 8,6 4,10" />
      </svg>
      <span className="text-foreground">{currentPage}</span>
    </nav>
  );
}
