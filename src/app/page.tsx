import Link from "next/link";
import { Accordion, Badge, Button, CTABlock } from "@/components/ui";

const steps = [
  {
    number: "1",
    title: "30秒診断",
    description: "不動産の有無・相続人の人数など、いくつかの質問に答えるだけ。",
  },
  {
    number: "2",
    title: "診断結果を確認",
    description:
      "「セルフ推奨」「代行推奨」「ハイブリッド」の3パターンで、あなたに合った進め方を提示します。",
  },
  {
    number: "3",
    title: "自分のペースで進める",
    description:
      "セルフ登記ガイド(チェックリスト・書式自動作成)、または提携専門家への相談へ進めます。",
  },
];

const features: { title: string; description: string; href: string; tone: "self" | "info" | "hybrid" | "neutral" }[] = [
  {
    title: "状況診断",
    description: "質問に答えるだけで、セルフ対応・代行・ハイブリッドの3パターンから最適な進め方を提示。",
    href: "/diagnosis",
    tone: "self",
  },
  {
    title: "必要書類チェックリスト",
    description: "相続人の人数や不動産の有無から、一般的に必要となる書類の目安を自動で表示。",
    href: "/self-guide/checklist",
    tone: "info",
  },
  {
    title: "書式ひな形の自動作成",
    description: "相続関係説明図・遺産分割協議書・登記申請書のひな形を、入力内容からPDFで出力。",
    href: "/self-guide/documents",
    tone: "info",
  },
  {
    title: "進捗管理",
    description: "ログイン不要。診断結果や入力内容は、この端末のブラウザに保存され、いつでも再開できます。",
    href: "/progress",
    tone: "neutral",
  },
  {
    title: "専門家への相談",
    description: "自分で進めるのが難しいケースは、提携予定の司法書士・税理士への相談導線をご案内します。",
    href: "/expert-referral",
    tone: "hybrid",
  },
];

const featureToneClasses: Record<string, string> = {
  self: "bg-tone-self-bg text-tone-self",
  info: "bg-tone-hybrid-bg text-tone-hybrid",
  hybrid: "bg-tone-agent-bg text-tone-agent",
  neutral: "bg-tone-neutral-bg text-tone-neutral",
};

const faqs = [
  {
    question: "本当に無料ですか?",
    answer:
      "はい。現在提供している診断・必要書類チェックリスト・書式ひな形作成・進捗管理は、すべて無料でご利用いただけます。将来的に有料オプションを追加する可能性がありますが、その際は事前に明示します。",
  },
  {
    question: "セルフでできるか不安です",
    answer:
      "診断結果が「代行推奨」「ハイブリッド」の場合は、提携予定の専門家への相談導線をご案内します。無理にすべてを自分だけで進める必要はありません。",
  },
  {
    question: "専門家に相談するといくらかかりますか?",
    answer:
      "現時点では提携専門家のご案内を準備中です。相談内容をお送りいただければ、準備が整い次第ご連絡します。",
  },
  {
    question: "入力した個人情報は安全に扱われますか?",
    answer:
      "通信は暗号化(TLS)されており、進捗保存機能はお使いの端末のブラウザ内にのみ保存されます。詳しくはプライバシーポリシーをご覧ください。",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center bg-gradient-to-b from-zinc-50 to-white px-6 py-20 text-center sm:py-28">
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <Badge tone="success">セルフ登記</Badge>
          <Badge tone="info">相続税シミュレーター</Badge>
          <Badge tone="warning">専門家紹介</Badge>
        </div>
        <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          かんたん相続BZ
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">
          相続登記・相続税申告、何から始めればいいか分からない人へ。
          30秒の診断で、自分で進められるか・専門家に相談すべきかがわかります。
        </p>
        <Link href="/diagnosis" className="mt-8">
          <Button size="large">30秒で診断をはじめる</Button>
        </Link>
        <p className="mt-3 text-xs font-medium text-zinc-500">無料・登録不要ですぐに使えます</p>
      </section>

      {/* 課題喚起 */}
      <section className="border-t border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto flex max-w-2xl flex-col gap-4 text-center">
          <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
            相続登記、実は「期限」があるのをご存知ですか?
          </h2>
          <p className="text-sm leading-7 text-zinc-600 sm:text-base">
            2024年4月、相続登記の申請が義務化されました。正当な理由なく期限内(不動産の取得を
            知った日から3年以内)に登記しないと、10万円以下の過料の対象になることがあります。
            ただ、制度は知っていても「何から手をつければいいか分からない」という方は少なくありません。
          </p>
        </div>
      </section>

      {/* 使い方 */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16">
        <div className="mx-auto flex max-w-4xl flex-col gap-10">
          <h2 className="text-center text-xl font-bold text-zinc-900 sm:text-2xl">
            使い方はシンプルです
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center gap-3 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-base font-bold text-white">
                  {step.number}
                </span>
                <h3 className="text-sm font-bold text-zinc-900">{step.title}</h3>
                <p className="text-sm leading-6 text-zinc-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 差別化 */}
      <section className="border-t border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto flex max-w-2xl flex-col gap-4 text-center">
          <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
            「自分でできるか、専門家に頼むべきか」から一緒に考えます
          </h2>
          <p className="text-sm leading-7 text-zinc-600 sm:text-base">
            多くのサービスは「セルフ専用」か「代行専用」のどちらかです。かんたん相続BZは
            診断からはじめることで、あなたのケースに合った進め方を無理なく選べます。
          </p>
        </div>
      </section>

      {/* 機能一覧 */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-10">
          <h2 className="text-center text-xl font-bold text-zinc-900 sm:text-2xl">できること</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-400"
              >
                <span
                  className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-medium ${featureToneClasses[feature.tone]}`}
                >
                  {feature.title}
                </span>
                <p className="text-sm leading-6 text-zinc-600">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          <h2 className="text-center text-xl font-bold text-zinc-900 sm:text-2xl">
            よくある質問
          </h2>
          <div>
            {faqs.map((faq) => (
              <Accordion key={faq.question} title={faq.question}>
                {faq.answer}
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* 最終CTA */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <CTABlock
            title="まずは30秒、診断からはじめましょう"
            description="質問に答えるだけで、あなたに合った相続登記の進め方がわかります。"
            primary={{ href: "/diagnosis", label: "診断をはじめる" }}
          />
        </div>
      </section>

      <p className="bg-zinc-50 px-6 pb-16 text-center text-xs text-zinc-400">
        本サービスは一般的な情報提供・セルフヘルプ支援を目的としており、法的助言・税務助言には該当しません。
      </p>
    </div>
  );
}
