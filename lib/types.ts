export type YesNo = "yes" | "no" | "unknown";

export interface DiagnosisAnswers {
  hasRealEstate: YesNo;
  hasBankAssets: YesNo;
  heirCount: "one" | "two_to_three" | "four_plus";
  hasWill: YesNo;
  hasDispute: YesNo;
  estateValue: "under_30m" | "30m_to_50m" | "over_50m" | "unknown";
  hasOverseasOrMissingHeir: YesNo;
}

export type CaseLevel = "easy" | "medium" | "hard";

export interface RequiredDocument {
  name: string;
  obtainFrom: string;
  note?: string;
}

export interface DiagnosisResult {
  level: CaseLevel;
  badgeLabel: string;
  headline: string;
  summary: string;
  recommendations: string[];
  nextActions: string[];
  documents: RequiredDocument[];
  taxConsultRecommended: boolean;
}
