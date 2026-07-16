import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | かんたん相続BZ",
};

const rows: { label: string; value: string }[] = [
  { label: "販売事業者", value: "[要記入: 氏名または屋号]" },
  { label: "運営統括責任者", value: "[要記入: 氏名]" },
  {
    label: "所在地",
    value: "[要記入。請求があれば遅滞なく開示します]",
  },
  {
    label: "連絡先",
    value: "[要記入: メールアドレス。請求に応じ遅滞なく開示します]",
  },
  { label: "販売価格", value: "[要記入: 有料プランの価格(消費税込み)]" },
  { label: "商品代金以外の必要料金", value: "[要記入: 通信費等、利用者負担が発生するもの]" },
  { label: "支払方法", value: "[要記入: クレジットカード等]" },
  { label: "支払時期", value: "[要記入]" },
  { label: "サービス提供時期", value: "[要記入: 決済完了後即時 等]" },
  { label: "返品・キャンセルについて", value: "[要記入: デジタルサービスの性質上返金不可とする場合はその旨]" },
  { label: "動作環境", value: "[要記入: 推奨ブラウザ等]" },
];

export default function TokushohoPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16">
      <div className="flex w-full max-w-2xl flex-col gap-6">
        <h1 className="text-xl font-bold text-zinc-900">特定商取引法に基づく表記</h1>
        <p className="text-sm text-zinc-600">
          本サービスは現在、無料の情報提供・診断のみを提供しており、特定商取引法上の表記義務は
          生じていません。有料プランの提供開始時には、以下の項目を正式に記載します。
        </p>
        <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
          <table className="w-full text-sm">
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-zinc-200 last:border-0">
                  <th className="w-40 whitespace-nowrap bg-zinc-50 p-3 text-left font-medium text-zinc-700">
                    {row.label}
                  </th>
                  <td className="p-3 text-zinc-800">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400">
          本サービスは「セルフヘルプ支援ツール」であり、司法書士・税理士としての有償独占業務(登記申請
          書類の作成代理、税務書類の作成代理)は行いません。
        </p>
      </div>
    </div>
  );
}
