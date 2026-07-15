import { ButtonHTMLAttributes, HTMLAttributes } from "react";

export function Card({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-lg border border-zinc-200 p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface SelectableCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export function SelectableCard({
  selected = false,
  className = "",
  children,
  ...props
}: SelectableCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={`w-full rounded-lg p-4 text-left transition-colors ${
        selected
          ? "border-2 border-zinc-900"
          : "border border-zinc-200 hover:border-zinc-400"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
