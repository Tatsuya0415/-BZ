import type { CaseLevel } from "@/lib/types";

const levelClasses: Record<CaseLevel, string> = {
  easy: "bg-emerald-100 text-emerald-800",
  medium: "bg-amber-100 text-amber-800",
  hard: "bg-rose-100 text-rose-800",
};

export function LevelBadge({
  level,
  label,
}: {
  level: CaseLevel;
  label: string;
}) {
  return (
    <span
      className={`inline-block rounded-full px-4 py-1.5 text-sm font-semibold ${levelClasses[level]}`}
    >
      {label}
    </span>
  );
}
