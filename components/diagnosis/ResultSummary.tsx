import { Card } from "@/components/ui/Card";
import { LevelBadge } from "@/components/ui/Badge";
import { Alert } from "@/components/ui/Alert";
import { DocumentChecklist } from "./DocumentChecklist";
import type { DiagnosisResult } from "@/lib/types";

export function ResultSummary({ result }: { result: DiagnosisResult }) {
  return (
    <div className="grid gap-6">
      <Card>
        <LevelBadge level={result.level} label={result.badgeLabel} />
        <h1 className="mt-4 text-xl font-bold text-gray-900">
          {result.headline}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          {result.summary}
        </p>

        {result.taxConsultRecommended && (
          <div className="mt-4">
            <Alert>
              遺産総額が基礎控除（3,000万円＋600万円×法定相続人数）を超える可能性があります。相続税申告が必要かどうか、税理士に一度確認することをおすすめします。
            </Alert>
          </div>
        )}

        <div className="mt-5">
          <h3 className="text-sm font-semibold text-gray-900">
            おすすめの進め方
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
            {result.recommendations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-semibold text-gray-900">
            次にやること
          </h3>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-gray-600">
            {result.nextActions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-gray-900">
          必要書類チェックリスト
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          チェックを入れて収集の進み具合を管理できます。印刷してそのまま持ち歩くこともできます。
        </p>
        <div className="mt-3">
          <DocumentChecklist documents={result.documents} />
        </div>
      </Card>

      <p className="text-xs leading-relaxed text-gray-400">
        本診断は一般的な情報提供を目的としたセルフチェックであり、法律・税務上の助言ではありません。個別の法律相談は弁護士、登記手続きの代理は司法書士、税務相談・申告代理は税理士にご相談ください。
      </p>
    </div>
  );
}
