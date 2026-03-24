"use client";

import type { ReactNode } from "react";

interface CardProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  showGradientBar?: boolean;
  onClick?: () => void;
}

export default function Card({
  header,
  footer,
  children,
  className = "",
  hoverable = true,
  showGradientBar = true,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border border-card-border bg-card-bg backdrop-blur-sm ${
        hoverable ? "card-hover cursor-pointer" : ""
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {/* 頂部漸變光條 — hover 時亮度增強 */}
      {showGradientBar && (
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent transition-all duration-300 group-hover:via-primary/60" />
      )}
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
