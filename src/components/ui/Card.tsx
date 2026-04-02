"use client";

import { type ReactNode, useRef, useState, useCallback } from "react";

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
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setGlowPos((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={hoverable ? handleMouseMove : undefined}
      onMouseLeave={hoverable ? handleMouseLeave : undefined}
      className={`group relative overflow-hidden rounded-lg border border-card-border bg-card-bg backdrop-blur-sm ${
        hoverable ? "card-hover" : ""
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {/* 滑鼠追蹤光暈 */}
      {hoverable && (
        <div
          className="pointer-events-none absolute -inset-px rounded-lg transition-opacity duration-500"
          style={{
            opacity: glowPos.visible ? 1 : 0,
            background: `radial-gradient(350px circle at ${glowPos.x}px ${glowPos.y}px, rgba(232, 115, 74, 0.08), transparent 60%)`,
          }}
        />
      )}

      {/* 頂部 accent 線 */}
      {showGradientBar && (
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
      )}

      {header && (
        <div className="border-b border-card-border px-6 py-4">{header}</div>
      )}
      <div className="relative px-6 py-5">{children}</div>
      {footer && (
        <div className="border-t border-card-border px-6 py-4">{footer}</div>
      )}
    </div>
  );
}
