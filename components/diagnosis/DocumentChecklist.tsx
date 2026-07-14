"use client";

import { useState } from "react";
import type { RequiredDocument } from "@/lib/types";

export function DocumentChecklist({
  documents,
}: {
  documents: RequiredDocument[];
}) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  return (
    <ul className="divide-y divide-gray-100">
      {documents.map((doc, index) => (
        <li key={doc.name} className="flex items-start gap-3 py-3">
          <input
            type="checkbox"
            checked={Boolean(checked[index])}
            onChange={() =>
              setChecked((prev) => ({ ...prev, [index]: !prev[index] }))
            }
            className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-brand-600 print:hidden"
          />
          <div>
            <p
              className={`text-sm font-semibold ${
                checked[index] ? "text-gray-400 line-through" : "text-gray-900"
              }`}
            >
              {doc.name}
            </p>
            <p className="text-xs text-gray-500">取得先：{doc.obtainFrom}</p>
            {doc.note && (
              <p className="text-xs text-gray-400">{doc.note}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
