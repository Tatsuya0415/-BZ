"use client";

import { ReactNode, useState } from "react";

export interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-zinc-200">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-zinc-900"
      >
        {title}
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && <div className="pb-4 text-sm leading-6 text-zinc-600">{children}</div>}
    </div>
  );
}
