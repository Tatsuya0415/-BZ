import Link from "next/link";
import { Button } from "./Button";

export interface CTAAction {
  href: string;
  label: string;
}

export interface CTABlockProps {
  title: string;
  description: string;
  primary: CTAAction;
  secondary?: CTAAction;
}

export function CTABlock({ title, description, primary, secondary }: CTABlockProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-base font-bold text-zinc-900">{title}</h3>
        <p className="mt-1 text-sm text-zinc-600">{description}</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        {secondary && (
          <Link href={secondary.href}>
            <Button variant="secondary" className="w-full sm:w-auto">
              {secondary.label}
            </Button>
          </Link>
        )}
        <Link href={primary.href}>
          <Button className="w-full sm:w-auto">{primary.label}</Button>
        </Link>
      </div>
    </div>
  );
}
