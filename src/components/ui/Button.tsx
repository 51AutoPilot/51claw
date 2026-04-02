"use client";

import { Link } from "@/i18n/navigation";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary:
    "btn-shine bg-gradient-to-r from-[#E8734A] to-[#da7756] text-white shadow-lg shadow-primary/15 hover:shadow-[0_0_24px_rgba(232,115,74,0.25)] hover:brightness-110",
  secondary:
    "border border-card-border text-foreground hover:border-primary/40 hover:text-primary-light hover:bg-white/[0.03]",
  ghost:
    "text-text-muted hover:text-foreground hover:bg-white/5",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-1.5 text-sm rounded-md",
  md: "px-6 py-2.5 text-sm rounded-md",
  lg: "px-8 py-3 text-base rounded-md",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-medium transition-all duration-300 ease-out ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
