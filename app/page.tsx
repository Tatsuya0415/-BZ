import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";

const FEATURES = [
  {
    title: "3分診断",
    description:
      "不動産の有無、相続人の人数、遺言書の有無などいくつかの質問に答えるだけで、自分で手続きできるかを判定します。",
  },
  {
    title: "必要書類の自動リスト化",
    description:
      "診断結果に応じて、集める書類・作る書類をケース別に自動で一覧化。印刷してそのまま使えます。",
  },
  {
    title: "難しい場合は専門家へ",
    description:
      "相続人同士で意見が分かれている、財産構成が複雑などのケースは、司法書士・税理士・弁護士への相談をご案内します。",
  },
];

const FAQ_ITEMS = [
  {
    question: "本当に自分で相続登記はできますか？",
    answer:
      "相続人が少なく、争いがなく、財産構成がシンプルな場合は自分で手続きを進められるケースが多くあります。診断結果でご自身のケースの難易度を確認してください。",
  },
  {
    question: "費用はかかりますか？",
    answer:
      "診断・必要書類リストの作成は無料でご利用いただけます。実際の登記申請には登録免許税など法定の実費が別途かかります。",
  },
  {
    question: "難しいケースの場合はどうすればいいですか？",
    answer:
      "相続人間の争い、海外在住の相続人がいる場合などは、診断結果で弁護士・司法書士への相談をおすすめする案内を表示します。",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
            相続の手続き、
            <br className="sm:hidden" />
            まず自分でできるか3分でわかる。
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
            相続登記・相続手続きの「何から始めればいいかわからない」を解消。
            質問に答えるだけで、自分でできるケースかどうか、必要な書類が何かがわかります。
          </p>
          <div className="mt-8">
            <LinkButton href="/diagnosis" className="px-8 py-4 text-base">
              無料で3分診断をはじめる
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="text-center text-lg font-bold text-gray-900">
          できること
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card key={feature.title}>
              <h3 className="text-sm font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="text-center text-lg font-bold text-gray-900">
          よくある質問
        </h2>
        <div className="mt-8">
          <Accordion items={FAQ_ITEMS} />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 text-center">
        <LinkButton href="/diagnosis" className="px-8 py-4 text-base">
          無料で3分診断をはじめる
        </LinkButton>
      </section>
    </div>
  );
}
