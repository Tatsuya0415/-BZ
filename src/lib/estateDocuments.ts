export interface Decedent {
  name: string;
  deathDate: string;
  lastAddress: string;
  lastDomicile: string;
}

export interface Heir {
  name: string;
  birthDate: string;
  address: string;
  relationship: string;
}

export type RealEstateType = "land" | "building";

export interface RealEstateItem {
  type: RealEstateType;
  address: string;
  lotNumber: string;
  category: string;
  area: string;
  acquiringHeirName: string;
}

export interface EstateDocumentInput {
  decedent: Decedent;
  heirs: Heir[];
  realEstate: RealEstateItem[];
  documentDate: string;
}

export function createEmptyHeir(): Heir {
  return { name: "", birthDate: "", address: "", relationship: "" };
}

export function createEmptyRealEstateItem(): RealEstateItem {
  return {
    type: "land",
    address: "",
    lotNumber: "",
    category: "",
    area: "",
    acquiringHeirName: "",
  };
}

export function createEmptyEstateDocumentInput(): EstateDocumentInput {
  return {
    decedent: { name: "", deathDate: "", lastAddress: "", lastDomicile: "" },
    heirs: [createEmptyHeir()],
    realEstate: [createEmptyRealEstateItem()],
    documentDate: "",
  };
}

export function validateEstateDocumentInput(input: EstateDocumentInput): string[] {
  const errors: string[] = [];

  if (!input.decedent.name.trim()) errors.push("被相続人の氏名を入力してください。");
  if (!input.decedent.deathDate.trim()) errors.push("被相続人の死亡年月日を入力してください。");
  if (!input.decedent.lastAddress.trim()) errors.push("被相続人の最後の住所を入力してください。");
  if (!input.decedent.lastDomicile.trim()) errors.push("被相続人の本籍を入力してください。");

  if (input.heirs.length === 0) {
    errors.push("相続人を1人以上入力してください。");
  }
  input.heirs.forEach((heir, i) => {
    if (!heir.name.trim()) errors.push(`相続人${i + 1}の氏名を入力してください。`);
    if (!heir.birthDate.trim()) errors.push(`相続人${i + 1}の生年月日を入力してください。`);
    if (!heir.address.trim()) errors.push(`相続人${i + 1}の住所を入力してください。`);
    if (!heir.relationship.trim()) errors.push(`相続人${i + 1}の続柄を入力してください。`);
  });

  input.realEstate.forEach((item, i) => {
    if (!item.address.trim()) errors.push(`不動産${i + 1}の所在を入力してください。`);
    if (!item.lotNumber.trim()) errors.push(`不動産${i + 1}の地番/家屋番号を入力してください。`);
    if (!item.area.trim()) errors.push(`不動産${i + 1}の地積/床面積を入力してください。`);
  });

  return errors;
}

export function isEstateDocumentInput(value: unknown): value is EstateDocumentInput {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.decedent === "object" &&
    Array.isArray(candidate.heirs) &&
    Array.isArray(candidate.realEstate) &&
    typeof candidate.documentDate === "string"
  );
}
