"use client";

import type { ReactNode } from "react";

interface CardProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export default function Card({
  header,
  footer,
  children,
  className = "",
  hoverable = true,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-card-border bg-card-bg backdrop-blur-sm ${
        hoverable ? "card-hover cursor-pointer" : ""
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {header && (
        <div className="border-b border-card-border px-6 py-4">{header}</div>
      )}
      <div className="px-6 py-5">{children}</div>
      {footer && (
        <div className="border-t border-card-border px-6 py-4">{footer}</div>
      )}
    </div>
  );
}
