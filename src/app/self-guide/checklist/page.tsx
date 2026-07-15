import { ChecklistApp } from "./ChecklistClientLoader";

export default function ChecklistPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-zinc-900">必要書類チェックリスト</h1>
          <p className="text-sm text-zinc-600">
            相続人の人数・不動産の有無などから、一般的に必要となる書類の目安を表示します。
          </p>
        </div>
        <ChecklistApp />
      </div>
    </div>
  );
}
