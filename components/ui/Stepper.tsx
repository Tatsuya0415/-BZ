export function Stepper({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between text-xs font-medium text-gray-500">
        <span>
          質問 {current} / {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
