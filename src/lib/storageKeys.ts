export const STORAGE_KEYS = {
  diagnosisAnswers: "kantan-souzoku:diagnosis-answers",
  checklistInput: "kantan-souzoku:checklist-input",
  checklistChecked: "kantan-souzoku:checklist-checked",
  documentDraft: "kantan-souzoku:document-draft",
} as const;

export const ALL_STORAGE_KEYS = Object.values(STORAGE_KEYS);
