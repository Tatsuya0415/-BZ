"use client";

import { useState, type ReactNode } from "react";

export function Accordion({
  items,
}: {
  items: { question: string; answer: ReactNode }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-gray-900"
              aria-expanded={isOpen}
            >
              {item.question}
              <span className="ml-4 text-gray-400">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm leading-relaxed text-gray-600">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
