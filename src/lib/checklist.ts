export interface ChecklistInput {
  heirCount: number;
  hasRealEstate: boolean;
  hasOverseasHeir: boolean;
}

export interface ChecklistItem {
  id: string;
  label: string;
  note?: string;
  /** trueの項目はチェック対象外の案内(進捗の分母から除く) */
  informational?: boolean;
}

export interface ChecklistGroup {
  category: string;
  items: ChecklistItem[];
}

export function createDefaultChecklistInput(): ChecklistInput {
  return { heirCount: 1, hasRealEstate: true, hasOverseasHeir: false };
}

export function buildChecklist(input: ChecklistInput): ChecklistGroup[] {
  const groups: ChecklistGroup[] = [
    {
      category: "戸籍関係(共通)",
      items: [
        { id: "koseki-decedent-all", label: "被相続人の出生から死亡までの戸籍謄本一式" },
        { id: "juminhyo-jyohyo", label: "被相続人の住民票の除票(または戸籍の附票)" },
        { id: "koseki-heirs", label: "相続人全員の戸籍謄本" },
      ],
    },
    {
      category: "相続人情報(共通)",
      items: [{ id: "juminhyo-heirs", label: "相続人全員の住民票" }],
    },
  ];

  if (input.heirCount >= 2) {
    groups.push({
      category: "遺産分割協議関連",
      items: [
        { id: "division-agreement", label: "遺産分割協議書(相続人全員の実印押印)" },
        { id: "inkan-shomei", label: "相続人全員の印鑑証明書" },
      ],
    });
  } else {
    groups.push({
      category: "遺産分割協議関連",
      items: [
        {
          id: "division-agreement-not-needed",
          label: "相続人が1人のため、遺産分割協議書は不要です",
          informational: true,
        },
      ],
    });
  }

  if (input.hasRealEstate) {
    groups.push({
      category: "不動産関係",
      items: [
        { id: "hyoka-shomei", label: "固定資産評価証明書(登記対象の不動産のもの)" },
        { id: "toki-shinsei", label: "登記申請書" },
        {
          id: "souzoku-kankei",
          label: "相続関係説明図",
          note: "必須ではありませんが、戸籍謄本一式の原本還付を受けるために提出するのが一般的です。",
        },
      ],
    });
  }

  if (input.hasOverseasHeir) {
    groups.push({
      category: "海外在住の相続人がいる場合",
      items: [
        { id: "zairyu-shomei", label: "在留証明書(住民票の代わり)" },
        { id: "shomei-shomei", label: "署名(サイン)証明書(印鑑証明書の代わり)" },
      ],
    });
  }

  return groups;
}

export function countChecklistProgress(
  groups: ChecklistGroup[],
  checked: Record<string, boolean>,
): { done: number; total: number } {
  let done = 0;
  let total = 0;
  for (const group of groups) {
    for (const item of group.items) {
      if (item.informational) continue;
      total += 1;
      if (checked[item.id]) done += 1;
    }
  }
  return { done, total };
}
