import { HTMLAttributes } from "react";

type Tone = "info" | "success" | "warning" | "neutral";

const toneClasses: Record<Tone, string> = {
  info: "bg-tone-hybrid-bg text-tone-hybrid",
  success: "bg-tone-self-bg text-tone-self",
  warning: "bg-tone-agent-bg text-tone-agent",
  neutral: "bg-tone-neutral-bg text-tone-neutral",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ tone = "neutral", className = "", children, ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium ${toneClasses[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
