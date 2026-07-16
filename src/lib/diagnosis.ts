export type RealEstateAnswer = "yes" | "no";
export type HeirCountAnswer = "1" | "2-3" | "4+";
export type DisputeAnswer = "no" | "yes" | "unsure";
export type OverseasAnswer = "yes" | "no";
export type EstateValueAnswer = "under30m" | "30m-100m" | "over100m" | "unsure";

export interface Answers {
  hasRealEstate: RealEstateAnswer;
  heirCount: HeirCountAnswer;
  hasDispute: DisputeAnswer;
  hasOverseasHeir: OverseasAnswer;
  estateValue: EstateValueAnswer;
}

export type QuestionId = keyof Answers;

export interface QuestionOption {
  value: string;
  label: string;
}

export interface QuestionDef {
  id: QuestionId;
  text: string;
  helper?: string;
  options: QuestionOption[];
}

export const questions: QuestionDef[] = [
  {
    id: "hasRealEstate",
    text: "相続財産に不動産(土地・建物)は含まれますか?",
    options: [
      { value: "yes", label: "含まれる" },
      { value: "no", label: "含まれない" },
    ],
  },
  {
    id: "heirCount",
    text: "相続人は何人ですか?",
    options: [
      { value: "1", label: "1人" },
      { value: "2-3", label: "2〜3人" },
      { value: "4+", label: "4人以上" },
    ],
  },
  {
    id: "hasDispute",
    text: "相続人間で遺産分割について意見の相違はありますか?",
    options: [
      { value: "no", label: "ない" },
      { value: "yes", label: "ある" },
      { value: "unsure", label: "わからない" },
    ],
  },
  {
    id: "hasOverseasHeir",
    text: "海外在住の相続人はいますか?",
    options: [
      { value: "no", label: "いない" },
      { value: "yes", label: "いる" },
    ],
  },
  {
    id: "estateValue",
    text: "相続財産の総額はどのくらいですか?(概算で構いません)",
    options: [
      { value: "under30m", label: "3,000万円未満" },
      { value: "30m-100m", label: "3,000万円〜1億円" },
      { value: "over100m", label: "1億円超" },
      { value: "unsure", label: "わからない" },
    ],
  },
];

export type DiagnosisType = "self" | "agent" | "hybrid";

export interface DiagnosisResult {
  type: DiagnosisType;
  reasons: string[];
  procedureTags: string[];
}

const allowedValues: Record<QuestionId, readonly string[]> = {
  hasRealEstate: ["yes", "no"],
  heirCount: ["1", "2-3", "4+"],
  hasDispute: ["no", "yes", "unsure"],
  hasOverseasHeir: ["no", "yes"],
  estateValue: ["under30m", "30m-100m", "over100m", "unsure"],
};

export function parseAnswers(
  params: Record<string, string | string[] | undefined>,
): Answers | null {
  const result: Record<string, string> = {};
  for (const id of Object.keys(allowedValues) as QuestionId[]) {
    const raw = params[id];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (!value || !allowedValues[id].includes(value)) {
      return null;
    }
    result[id] = value;
  }
  return result as unknown as Answers;
}

export function diagnose(answers: Answers): DiagnosisResult {
  const reasons: string[] = [];
  const procedureTags: string[] = [];
  let type: DiagnosisType = "self";

  if (answers.hasRealEstate === "yes") {
    procedureTags.push("相続登記");
  }
  if (
    answers.estateValue === "30m-100m" ||
    answers.estateValue === "over100m" ||
    answers.estateValue === "unsure"
  ) {
    procedureTags.push("相続税申告");
  }

  if (answers.hasDispute === "yes") {
    type = "agent";
    reasons.push(
      "相続人間で遺産分割の意見が相違している場合、交渉には弁護士のサポートが必要になるため、専門家への相談をおすすめします。",
    );
  }

  if (answers.estateValue === "over100m") {
    type = "agent";
    reasons.push(
      "財産総額が大きい場合、相続税申告の財産評価が複雑になりやすいため、税理士への相談をおすすめします。",
    );
  }

  if (answers.hasOverseasHeir === "yes" && type === "self") {
    type = "hybrid";
    reasons.push(
      "海外在住の相続人がいる場合、書類収集や手続きが煩雑になりやすいため、部分的に専門家のサポートを受けるのが安心です。",
    );
  }

  if (answers.heirCount === "4+" && answers.hasRealEstate === "yes" && type === "self") {
    type = "hybrid";
    reasons.push(
      "相続人が多い場合、遺産分割協議書の作成が複雑になりやすいため、部分的な専門家サポートも検討の余地があります。",
    );
  }

  if (type === "self") {
    reasons.push(
      "現時点の回答からは、ご自身で手続きを進められる可能性が高いケースと考えられます。",
    );
  }

  return {
    type,
    reasons,
    procedureTags: Array.from(new Set(procedureTags)),
  };
}
