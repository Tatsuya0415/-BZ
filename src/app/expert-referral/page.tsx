import Link from "next/link";
import { Button } from "@/components/ui";

export default function ExpertReferralPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-zinc-50 px-6 py-16 text-center">
      <h1 className="text-xl font-bold text-zinc-900">専門家紹介フォームは準備中です</h1>
      <p className="max-w-md text-sm text-zinc-600">
        提携司法書士・税理士への問い合わせ導線は開発中です(docs/09-launch-workflow.md フェーズ1参照)。
        現時点で提携専門家はまだいません。
      </p>
      <Link href="/">
        <Button variant="secondary">トップへ戻る</Button>
      </Link>
    </div>
  );
}
