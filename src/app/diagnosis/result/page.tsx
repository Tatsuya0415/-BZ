import { redirect } from "next/navigation";
import { Accordion, Badge, CTABlock, SummaryPanel } from "@/components/ui";
import { diagnose, parseAnswers, type DiagnosisType } from "@/lib/diagnosis";

const summaryCopy: Record<DiagnosisType, { title: string; description: string }> = {
  self: {
    title: "あなたはセルフ登記向きです",
    description:
      "必要書類チェックリストや書式ひな形を使って、ご自身で手続きを進められる可能性が高いケースです。",
  },
  agent: {
    title: "専門家への相談をおすすめします",
    description:
      "個別の交渉や複雑な財産評価が伴うため、提携する司法書士・税理士へのご相談をおすすめします。",
  },
  hybrid: {
    title: "セルフ対応と専門家サポートのハイブリッドがおすすめです",
    description:
      "基本的な部分はセルフ対応しつつ、複雑な部分だけ専門家のサポートを受ける進め方が適しています。",
  },
};

const ctaCopy: Record<DiagnosisType, { title: string; description: string }> = {
  self: {
    title: "セルフ登記ガイドで手続きを進めましょう",
    description: "必要書類チェックリストと書式ひな形の作成に進めます。",
  },
  agent: {
    title: "提携専門家にご相談ください",
    description: "着手金なしで相談できる提携司法書士・税理士をご案内します。",
  },
  hybrid: {
    title: "セルフ登記ガイドと専門家相談、両方をご案内します",
    description: "まずはセルフ登記ガイドで進め、必要な部分だけ専門家に相談することもできます。",
  },
};

export default async function DiagnosisResultPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const answers = parseAnswers(params);

  if (!answers) {
    redirect("/diagnosis");
  }

  const result = diagnose(answers);
  const summary = summaryCopy[result.type];
  const cta = ctaCopy[result.type];

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <SummaryPanel tone={result.type} title={summary.title} description={summary.description} />

        {result.procedureTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {result.procedureTags.map((tag) => (
              <Badge key={tag} tone="neutral">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div>
          <Accordion title="診断理由の詳細" defaultOpen>
            <ul className="list-disc space-y-1 pl-5">
              {result.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </Accordion>
        </div>

        {result.type === "hybrid" ? (
          <CTABlock
            title={cta.title}
            description={cta.description}
            primary={{ href: "/self-guide", label: "セルフ登記ガイドへ進む" }}
            secondary={{ href: `/expert-referral?type=${result.type}`, label: "提携専門家に相談する" }}
          />
        ) : (
          <CTABlock
            title={cta.title}
            description={cta.description}
            primary={
              result.type === "self"
                ? { href: "/self-guide", label: "セルフ登記ガイドへ進む" }
                : { href: `/expert-referral?type=${result.type}`, label: "提携専門家に相談する" }
            }
          />
        )}

        <p className="text-xs text-zinc-400">
          本診断結果は一般的な情報提供を目的としたものであり、法的助言・税務助言には該当しません。
          個別具体的な判断が必要な場合は、司法書士・税理士等の専門家にご相談ください。
        </p>
      </div>
    </div>
  );
}
