export function getContactEmail(): string {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@example.com";
}

export interface ExpertInquiry {
  name: string;
  contact: string;
  diagnosisType?: string;
  message: string;
}

export function isExpertInquiry(value: unknown): value is ExpertInquiry {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return typeof v.name === "string" && typeof v.contact === "string" && typeof v.message === "string";
}

export function buildInquiryMailto(inquiry: ExpertInquiry, contactEmail: string): string {
  const subject = encodeURIComponent("【かんたん相続BZ】専門家紹介のご相談");
  const body = encodeURIComponent(
    `お名前: ${inquiry.name}\n連絡先: ${inquiry.contact}\n診断結果: ${
      inquiry.diagnosisType ?? "未実施"
    }\n\n相談内容:\n${inquiry.message}`,
  );
  return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
}
