import { DiagnosisFlow } from "@/components/diagnosis/DiagnosisFlow";

export const metadata = {
  title: "3分診断｜そうぞくセルフナビ",
};

export default function DiagnosisPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-lg font-bold text-gray-900 print:hidden">
        相続手続き 3分診断
      </h1>
      <p className="mt-1 text-sm text-gray-500 print:hidden">
        質問に答えるだけで、自分でできるかどうか・必要な書類がわかります。
      </p>
      <div className="mt-6">
        <DiagnosisFlow />
      </div>
    </div>
  );
}
