"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  currentPage: string;
  items?: BreadcrumbItem[];
}

const Chevron = () => (
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
);

export default function Breadcrumb({ currentPage, items = [] }: BreadcrumbProps) {
  const t = useTranslations("nav");

  return (
    <nav className="mb-8 flex items-center gap-2 text-sm text-text-muted">
      <Link
        href="/"
        className="transition-colors duration-200 hover:text-primary-light"
      >
        {t("home")}
      </Link>
      {items.map((item) => (
        <span key={item.href} className="flex items-center gap-2">
          <Chevron />
          <Link
            href={item.href}
            className="transition-colors duration-200 hover:text-primary-light"
          >
            {item.label}
          </Link>
        </span>
      ))}
      <Chevron />
      <span className="text-foreground truncate max-w-[200px]">{currentPage}</span>
    </nav>
  );
}
