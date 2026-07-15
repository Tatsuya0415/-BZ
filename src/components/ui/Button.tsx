import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "text";
type Size = "large" | "medium" | "small";

const variantClasses: Record<Variant, string> = {
  primary: "bg-zinc-900 text-white hover:bg-zinc-700 disabled:bg-zinc-300",
  secondary:
    "bg-white text-zinc-900 border border-zinc-300 hover:bg-zinc-50 disabled:text-zinc-300 disabled:border-zinc-200",
  text: "bg-transparent text-zinc-900 hover:underline disabled:text-zinc-300",
};

const sizeClasses: Record<Size, string> = {
  large: "h-14 px-6 text-base rounded-lg gap-2",
  medium: "h-11 px-6 text-sm rounded-lg gap-2",
  small: "h-9 px-4 text-sm rounded-lg gap-1.5",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "medium",
      loading = false,
      disabled,
      className = "",
      children,
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        className={`inline-flex items-center justify-center font-medium transition-colors disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {loading ? "処理中…" : children}
      </button>
    );
  },
);
