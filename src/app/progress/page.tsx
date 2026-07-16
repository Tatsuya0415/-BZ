import { ProgressApp } from "./ProgressClientLoader";

export default function ProgressPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-zinc-900">進捗管理</h1>
          <p className="text-sm text-zinc-600">
            診断結果・チェックリスト・書式の入力状況をこの端末で確認できます(ログイン不要)。
          </p>
        </div>
        <ProgressApp />
      </div>
    </div>
  );
}
