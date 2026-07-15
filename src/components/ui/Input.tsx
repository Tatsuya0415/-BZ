import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className = "", id, ...props },
  ref,
) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-zinc-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        className={`h-12 rounded-lg border px-4 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 ${
          error ? "border-red-500" : "border-zinc-300"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
});
