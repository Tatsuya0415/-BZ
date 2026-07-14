import type {
  DiagnosisAnswers,
  DiagnosisResult,
  RequiredDocument,
} from "./types";

const COMMON_DOCUMENTS: RequiredDocument[] = [
  {
    name: "被相続人の戸籍謄本（出生〜死亡まで連続したもの）",
    obtainFrom: "本籍地の市区町村役場",
  },
  {
    name: "被相続人の住民票の除票（または戸籍の附票）",
    obtainFrom: "最後の住所地の市区町村役場",
  },
  {
    name: "相続人全員の戸籍謄本",
    obtainFrom: "各相続人の本籍地の市区町村役場",
  },
  {
    name: "相続人全員の印鑑証明書",
    obtainFrom: "各相続人の住所地の市区町村役場",
    note: "遺産分割協議書に添付するため必要",
  },
];

function buildDocuments(answers: DiagnosisAnswers): RequiredDocument[] {
  const documents = [...COMMON_DOCUMENTS];

  if (answers.hasRealEstate === "yes") {
    documents.push(
      {
        name: "固定資産評価証明書",
        obtainFrom: "不動産所在地の市区町村役場（東京23区は都税事務所）",
      },
      {
        name: "登記事項証明書（登記簿謄本）",
        obtainFrom: "法務局",
      },
    );
  }

  if (answers.hasBankAssets === "yes") {
    documents.push({
      name: "残高証明書・通帳の写し",
      obtainFrom: "取引先の金融機関・証券会社",
    });
  }

  if (answers.hasWill === "yes") {
    documents.push({
      name: "遺言書（自筆証書の場合は検認調書、または法務局の保管証明）",
      obtainFrom: "家庭裁判所または法務局（自筆証書遺言書保管制度）",
      note: "公正証書遺言の場合は検認不要",
    });
  } else {
    documents.push({
      name: "遺産分割協議書",
      obtainFrom: "相続人全員で作成",
      note: "相続人が1人の場合は不要",
    });
  }

  if (answers.estateValue !== "under_30m") {
    documents.push({
      name: "財産目録・相続税申告書一式",
      obtainFrom: "税理士、または国税庁の申告書作成コーナー",
      note: "基礎控除を超える場合に必要",
    });
  }

  return documents;
}

export function diagnose(answers: DiagnosisAnswers): DiagnosisResult {
  const taxConsultRecommended =
    answers.estateValue === "over_50m" || answers.estateValue === "unknown";

  if (answers.hasDispute === "yes") {
    return {
      level: "hard",
      badgeLabel: "代行・専門家相談推奨",
      headline: "相続人同士の話し合いが必要な状況です",
      summary:
        "相続人間で意見が分かれている、またはその可能性がある場合、書類作成だけでは解決できません。弁護士への相談を優先してください。",
      recommendations: [
        "弁護士への相談を検討してください（交渉・調停が必要な場合があります）",
        "書類の準備は並行して進められます",
      ],
      nextActions: [
        "弁護士への無料相談を予約する",
        "必要書類の収集だけ先に始める",
      ],
      documents: buildDocuments(answers),
      taxConsultRecommended,
    };
  }

  if (answers.hasOverseasOrMissingHeir === "yes") {
    return {
      level: "hard",
      badgeLabel: "代行推奨",
      headline: "相続人に海外在住者・行方不明の方がいます",
      summary:
        "海外在住者のサイン証明（署名証明）取得や、行方不明者の不在者財産管理人選任など、通常より手続きが複雑になります。専門家への依頼を推奨します。",
      recommendations: [
        "司法書士・行政書士への相談を推奨します",
        "海外在住の相続人がいる場合はサイン証明（在留証明）の取得が必要です",
      ],
      nextActions: [
        "司法書士へ相談する",
        "海外在住の相続人に必要書類を案内する",
      ],
      documents: buildDocuments(answers),
      taxConsultRecommended,
    };
  }

  const isComplexHeirCount = answers.heirCount === "four_plus";
  const hasMultipleAssetTypes =
    answers.hasRealEstate === "yes" && answers.hasBankAssets === "yes";

  if (isComplexHeirCount || (hasMultipleAssetTypes && answers.hasWill !== "yes")) {
    return {
      level: "medium",
      badgeLabel: "セルフ＋サポート推奨",
      headline: "自分で進められますが、サポートがあると安心です",
      summary:
        "相続人の人数が多い、または不動産と預貯金の両方があり遺言書がないケースです。書類収集の量が多くなるため、チェックリストとサポートを併用することをおすすめします。",
      recommendations: [
        "必要書類のチェックリストに沿って収集を進めましょう",
        "不安な場合は司法書士への部分的なサポート依頼も検討できます",
      ],
      nextActions: [
        "必要書類チェックリストをダウンロードする",
        "書類収集を開始する",
      ],
      documents: buildDocuments(answers),
      taxConsultRecommended,
    };
  }

  return {
    level: "easy",
    badgeLabel: "自分でできる",
    headline: "自分で手続きを進められるケースです",
    summary:
      "相続人が少なく、争いもなく、財産構成もシンプルです。チェックリストに沿って書類を集めれば、自分で相続登記・手続きを進められます。",
    recommendations: [
      "必要書類チェックリストに沿って収集を進めましょう",
      "法務局のオンライン申請も利用できます",
    ],
    nextActions: [
      "必要書類チェックリストをダウンロードする",
      "法務局の相談窓口を予約する（任意）",
    ],
    documents: buildDocuments(answers),
    taxConsultRecommended,
  };
}
