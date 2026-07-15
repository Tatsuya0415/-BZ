import Link from "next/link";
import { Button } from "@/components/ui";

export default function SelfGuidePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-zinc-50 px-6 py-16 text-center">
      <h1 className="text-xl font-bold text-zinc-900">セルフ登記ガイド</h1>
      <p className="max-w-md text-sm text-zinc-600">
        必要書類チェックリストは開発中です(docs/09-launch-workflow.md フェーズ1参照)。
        まずは書式ひな形の作成からお試しいただけます。
      </p>
      <Link href="/self-guide/documents">
        <Button>書式ひな形を作成する</Button>
      </Link>
      <Link href="/">
        <Button variant="text">トップへ戻る</Button>
      </Link>
    </div>
  );
}
