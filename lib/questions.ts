import type { DiagnosisAnswers } from "./types";

type QuestionKey = keyof DiagnosisAnswers;

interface QuestionOption<K extends QuestionKey> {
  value: DiagnosisAnswers[K];
  label: string;
}

interface QuestionConfig<K extends QuestionKey> {
  key: K;
  title: string;
  helper?: string;
  options: QuestionOption<K>[];
}

type AnyQuestionConfig = {
  [K in QuestionKey]: QuestionConfig<K>;
}[QuestionKey];

export const QUESTIONS: AnyQuestionConfig[] = [
  {
    key: "hasRealEstate",
    title: "亡くなった方（被相続人）の不動産はありますか？",
    helper: "土地・建物・マンションなど",
    options: [
      { value: "yes", label: "ある" },
      { value: "no", label: "ない" },
      { value: "unknown", label: "わからない" },
    ],
  },
  {
    key: "hasBankAssets",
    title: "預貯金や株式・証券はありますか？",
    options: [
      { value: "yes", label: "ある" },
      { value: "no", label: "ない" },
      { value: "unknown", label: "わからない" },
    ],
  },
  {
    key: "heirCount",
    title: "相続人は何人ですか？",
    options: [
      { value: "one", label: "1人" },
      { value: "two_to_three", label: "2〜3人" },
      { value: "four_plus", label: "4人以上" },
    ],
  },
  {
    key: "hasWill",
    title: "遺言書はありますか？",
    options: [
      { value: "yes", label: "ある" },
      { value: "no", label: "ない" },
      { value: "unknown", label: "わからない" },
    ],
  },
  {
    key: "hasDispute",
    title: "相続人同士で意見が分かれそう、または揉めていますか？",
    options: [
      { value: "no", label: "ない（円満に進みそう）" },
      { value: "yes", label: "ある、またはその可能性がある" },
      { value: "unknown", label: "わからない" },
    ],
  },
  {
    key: "estateValue",
    title: "遺産総額の目安はどれくらいですか？",
    helper: "不動産・預貯金など全て含めたおおよその金額",
    options: [
      { value: "under_30m", label: "3,000万円未満" },
      { value: "30m_to_50m", label: "3,000万〜5,000万円" },
      { value: "over_50m", label: "5,000万円以上" },
      { value: "unknown", label: "わからない" },
    ],
  },
  {
    key: "hasOverseasOrMissingHeir",
    title: "相続人の中に海外在住の方・連絡が取れない方はいますか？",
    options: [
      { value: "no", label: "いない" },
      { value: "yes", label: "いる" },
      { value: "unknown", label: "わからない" },
    ],
  },
];
