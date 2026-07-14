import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 disabled:bg-brand-200",
  secondary:
    "bg-white text-brand-700 border border-brand-300 hover:bg-brand-50",
  ghost: "text-brand-700 hover:bg-brand-50",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed";

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  children,
  className = "",
  href,
}: CommonProps & { href: string }) {
  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
