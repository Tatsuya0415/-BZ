"use client";

import Link from "next/link";
import { Badge, Button } from "@/components/ui";
import { buildChecklist, countChecklistProgress, createDefaultChecklistInput, type ChecklistInput } from "@/lib/checklist";
import { diagnose, parseAnswers } from "@/lib/diagnosis";
import { ALL_STORAGE_KEYS, STORAGE_KEYS } from "@/lib/storageKeys";
import { useLocalStorageState } from "@/lib/useLocalStorageState";
import type { EstateDocumentInput } from "@/lib/estateDocuments";
import { createEmptyEstateDocumentInput } from "@/lib/estateDocuments";

const diagnosisTypeLabel = {
  self: "セルフ推奨",
  agent: "代行推奨",
  hybrid: "ハイブリッド推奨",
};

export function ProgressApp() {
  const [diagnosisAnswers] = useLocalStorageState<Record<string, string>>(
    STORAGE_KEYS.diagnosisAnswers,
    {},
  );
  const [checklistInput] = useLocalStorageState<ChecklistInput>(
    STORAGE_KEYS.checklistInput,
    createDefaultChecklistInput(),
  );
  const [checklistChecked] = useLocalStorageState<Record<string, boolean>>(
    STORAGE_KEYS.checklistChecked,
    {},
  );
  const [documentDraft] = useLocalStorageState<EstateDocumentInput>(
    STORAGE_KEYS.documentDraft,
    createEmptyEstateDocumentInput(),
  );

  const parsedAnswers = parseAnswers(diagnosisAnswers);
  const diagnosisResult = parsedAnswers ? diagnose(parsedAnswers) : null;
  const diagnosisQuery = parsedAnswers
    ? new URLSearchParams(diagnosisAnswers as Record<string, string>).toString()
    : "";

  const checklistGroups = buildChecklist(checklistInput);
  const { done, total } = countChecklistProgress(checklistGroups, checklistChecked);

  const hasDocumentDraft = Boolean(documentDraft.decedent.name.trim());

  function handleResetAll() {
    if (!window.confirm("保存されている診断結果・チェックリスト・書式の入力内容をすべて削除します。よろしいですか?")) {
      return;
    }
    for (const key of ALL_STORAGE_KEYS) {
      window.localStorage.removeItem(key);
    }
    window.location.reload();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-zinc-900">1. 診断</h2>
          {diagnosisResult && <Badge tone="info">{diagnosisTypeLabel[diagnosisResult.type]}</Badge>}
        </div>
        {diagnosisResult ? (
          <>
            <p className="text-sm text-zinc-600">診断は完了しています。</p>
            <Link href={`/diagnosis/result?${diagnosisQuery}`} className="w-fit">
              <Button variant="secondary" size="small">
                結果を見る
              </Button>
            </Link>
          </>
        ) : (
          <>
            <p className="text-sm text-zinc-600">まだ診断を行っていません。</p>
            <Link href="/diagnosis" className="w-fit">
              <Button size="small">診断をはじめる</Button>
            </Link>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-zinc-900">2. 必要書類チェックリスト</h2>
          <Badge tone={done === total && total > 0 ? "success" : "neutral"}>
            {done} / {total} 件
          </Badge>
        </div>
        <p className="text-sm text-zinc-600">
          {total === 0 ? "チェック対象の項目がまだありません。" : "チェックリストの進捗状況です。"}
        </p>
        <Link href="/self-guide/checklist" className="w-fit">
          <Button variant="secondary" size="small">
            続きから確認する
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-zinc-900">3. 書式ひな形の入力</h2>
          <Badge tone={hasDocumentDraft ? "success" : "neutral"}>
            {hasDocumentDraft ? "保存済み" : "未入力"}
          </Badge>
        </div>
        <p className="text-sm text-zinc-600">
          {hasDocumentDraft
            ? `被相続人「${documentDraft.decedent.name}」の入力が保存されています。`
            : "まだ入力していません。"}
        </p>
        <Link href="/self-guide/documents" className="w-fit">
          <Button variant="secondary" size="small">
            続きから入力する
          </Button>
        </Link>
      </div>

      <button
        type="button"
        onClick={handleResetAll}
        className="mt-2 text-xs text-red-600 hover:underline"
      >
        保存データをすべて削除して最初からやり直す
      </button>
    </div>
  );
}
