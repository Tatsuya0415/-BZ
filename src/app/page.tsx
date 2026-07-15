import Link from "next/link";
import { Badge, Button } from "@/components/ui";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50">
      <main className="flex w-full max-w-2xl flex-1 flex-col items-center gap-8 px-6 py-24 text-center">
        <div className="flex gap-2">
          <Badge tone="success">セルフ登記</Badge>
          <Badge tone="info">相続税シミュレーター</Badge>
          <Badge tone="warning">専門家紹介</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          かんたん相続BZ
        </h1>
        <p className="max-w-md text-base leading-7 text-zinc-600">
          相続登記・相続税申告を自分で進めたい人のためのセルフヘルプ・プラットフォーム。
          30秒の診断で、セルフ対応できるか・専門家に相談すべきかがわかります。
        </p>
        <Link href="/diagnosis">
          <Button size="large">30秒で診断をはじめる</Button>
        </Link>
        <p className="text-xs text-zinc-400">
          本サービスは一般的な情報提供・セルフヘルプ支援を目的としており、法的助言・税務助言には該当しません。
        </p>
      </main>
    </div>
  );
}
