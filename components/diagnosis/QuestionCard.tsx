"use client";

interface Option {
  value: string;
  label: string;
}

export function QuestionCard({
  title,
  helper,
  options,
  selectedValue,
  onSelect,
}: {
  title: string;
  helper?: string;
  options: Option[];
  selectedValue?: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      {helper && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
      <div className="mt-5 grid gap-3">
        {options.map((option) => {
          const isSelected = option.value === selectedValue;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                isSelected
                  ? "border-brand-500 bg-brand-50 text-brand-800"
                  : "border-gray-200 bg-white text-gray-700 hover:border-brand-300"
              }`}
              aria-pressed={isSelected}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
