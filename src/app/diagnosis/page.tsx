import Link from "next/link";
import { Button, Stepper } from "@/components/ui";

export default function DiagnosisPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16">
      <div className="flex w-full max-w-lg flex-col gap-8">
        <Stepper totalSteps={5} currentStep={1} />
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-xl font-bold text-zinc-900">診断機能は準備中です</h1>
          <p className="text-sm text-zinc-600">
            質問フロー・診断ロジックは開発中です(docs/09-launch-workflow.md フェーズ1参照)。
          </p>
          <Link href="/" className="mx-auto">
            <Button variant="secondary">トップへ戻る</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
