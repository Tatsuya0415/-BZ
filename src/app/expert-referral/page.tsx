import { Suspense } from "react";
import { ExpertReferralForm } from "./ExpertReferralForm";

export default function ExpertReferralPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-zinc-900">専門家への相談</h1>
          <p className="text-sm text-zinc-600">
            提携する司法書士・税理士のご案内を準備中です。ご相談内容を送っていただければ、
            準備が整い次第ご連絡します。
          </p>
        </div>
        <Suspense fallback={null}>
          <ExpertReferralForm />
        </Suspense>
      </div>
    </div>
  );
}
