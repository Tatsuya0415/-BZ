import { DocumentForm } from "./DocumentForm";

export default function DocumentsPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-zinc-900">書式ひな形の作成</h1>
          <p className="text-sm text-zinc-600">
            入力内容から、相続関係説明図・遺産分割協議書・登記申請書のひな形をPDFで出力します。
          </p>
        </div>
        <DocumentForm />
      </div>
    </div>
  );
}
