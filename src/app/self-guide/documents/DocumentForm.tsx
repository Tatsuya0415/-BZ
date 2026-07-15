"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui";
import {
  createEmptyEstateDocumentInput,
  createEmptyHeir,
  createEmptyRealEstateItem,
  validateEstateDocumentInput,
  type EstateDocumentInput,
  type RealEstateType,
} from "@/lib/estateDocuments";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import { useLocalStorageState } from "@/lib/useLocalStorageState";

type DocumentKind = "family-relation" | "division-agreement" | "registration-application";

const documentLabels: Record<DocumentKind, { label: string; filename: string }> = {
  "family-relation": { label: "相続関係説明図", filename: "family-relation-chart.pdf" },
  "division-agreement": { label: "遺産分割協議書", filename: "division-agreement.pdf" },
  "registration-application": { label: "登記申請書", filename: "registration-application.pdf" },
};

export function DocumentForm() {
  const [input, setInput] = useLocalStorageState<EstateDocumentInput>(
    STORAGE_KEYS.documentDraft,
    createEmptyEstateDocumentInput(),
  );
  const [errors, setErrors] = useState<string[]>([]);
  const [downloading, setDownloading] = useState<DocumentKind | null>(null);

  function updateDecedent<K extends keyof EstateDocumentInput["decedent"]>(
    field: K,
    value: EstateDocumentInput["decedent"][K],
  ) {
    setInput((prev) => ({ ...prev, decedent: { ...prev.decedent, [field]: value } }));
  }

  function updateHeir<K extends keyof EstateDocumentInput["heirs"][number]>(
    index: number,
    field: K,
    value: EstateDocumentInput["heirs"][number][K],
  ) {
    setInput((prev) => ({
      ...prev,
      heirs: prev.heirs.map((heir, i) => (i === index ? { ...heir, [field]: value } : heir)),
    }));
  }

  function updateRealEstate<K extends keyof EstateDocumentInput["realEstate"][number]>(
    index: number,
    field: K,
    value: EstateDocumentInput["realEstate"][number][K],
  ) {
    setInput((prev) => ({
      ...prev,
      realEstate: prev.realEstate.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function addHeir() {
    setInput((prev) => ({ ...prev, heirs: [...prev.heirs, createEmptyHeir()] }));
  }

  function removeHeir(index: number) {
    setInput((prev) => ({ ...prev, heirs: prev.heirs.filter((_, i) => i !== index) }));
  }

  function addRealEstate() {
    setInput((prev) => ({
      ...prev,
      realEstate: [...prev.realEstate, createEmptyRealEstateItem()],
    }));
  }

  function removeRealEstate(index: number) {
    setInput((prev) => ({
      ...prev,
      realEstate: prev.realEstate.filter((_, i) => i !== index),
    }));
  }

  async function handleDownload(kind: DocumentKind) {
    const validationErrors = validateEstateDocumentInput(input);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);
    setDownloading(kind);
    try {
      const response = await fetch(`/api/documents/${kind}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setErrors(data?.errors ?? ["PDFの生成に失敗しました。時間をおいて再度お試しください。"]);
        return;
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = documentLabels[kind].filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(null);
    }
  }

  function handleReset() {
    if (!window.confirm("入力内容をすべて削除します。よろしいですか?")) return;
    setInput(createEmptyEstateDocumentInput());
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between rounded-lg bg-tone-self-bg px-4 py-2 text-xs text-tone-self">
        <span>入力内容はこの端末のブラウザに自動保存されます</span>
        <button type="button" onClick={handleReset} className="font-medium hover:underline">
          入力をクリア
        </button>
      </div>

      {errors.length > 0 && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          <ul className="list-disc space-y-1 pl-5">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="text-base font-bold text-zinc-900">被相続人(亡くなった方)</h2>
        <Input
          label="氏名"
          value={input.decedent.name}
          onChange={(e) => updateDecedent("name", e.target.value)}
        />
        <Input
          label="死亡年月日"
          placeholder="例: 令和8年1月1日"
          value={input.decedent.deathDate}
          onChange={(e) => updateDecedent("deathDate", e.target.value)}
        />
        <Input
          label="最後の住所"
          value={input.decedent.lastAddress}
          onChange={(e) => updateDecedent("lastAddress", e.target.value)}
        />
        <Input
          label="本籍"
          value={input.decedent.lastDomicile}
          onChange={(e) => updateDecedent("lastDomicile", e.target.value)}
        />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-zinc-900">相続人</h2>
          <Button variant="secondary" size="small" type="button" onClick={addHeir}>
            相続人を追加
          </Button>
        </div>
        {input.heirs.map((heir, index) => (
          <div key={index} className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500">相続人 {index + 1}</span>
              {input.heirs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeHeir(index)}
                  className="text-xs text-red-600 hover:underline"
                >
                  削除
                </button>
              )}
            </div>
            <Input
              label="氏名"
              value={heir.name}
              onChange={(e) => updateHeir(index, "name", e.target.value)}
            />
            <Input
              label="続柄(例: 長男・配偶者)"
              value={heir.relationship}
              onChange={(e) => updateHeir(index, "relationship", e.target.value)}
            />
            <Input
              label="生年月日"
              value={heir.birthDate}
              onChange={(e) => updateHeir(index, "birthDate", e.target.value)}
            />
            <Input
              label="住所"
              value={heir.address}
              onChange={(e) => updateHeir(index, "address", e.target.value)}
            />
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-zinc-900">不動産</h2>
          <Button variant="secondary" size="small" type="button" onClick={addRealEstate}>
            不動産を追加
          </Button>
        </div>
        {input.realEstate.map((item, index) => (
          <div key={index} className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500">不動産 {index + 1}</span>
              {input.realEstate.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRealEstate(index)}
                  className="text-xs text-red-600 hover:underline"
                >
                  削除
                </button>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-zinc-700">種別</label>
              <select
                value={item.type}
                onChange={(e) =>
                  updateRealEstate(index, "type", e.target.value as RealEstateType)
                }
                className="h-12 rounded-lg border border-zinc-300 px-4 text-sm"
              >
                <option value="land">土地</option>
                <option value="building">建物</option>
              </select>
            </div>
            <Input
              label="所在"
              value={item.address}
              onChange={(e) => updateRealEstate(index, "address", e.target.value)}
            />
            <Input
              label={item.type === "land" ? "地番" : "家屋番号"}
              value={item.lotNumber}
              onChange={(e) => updateRealEstate(index, "lotNumber", e.target.value)}
            />
            <Input
              label={item.type === "land" ? "地目" : "種類"}
              value={item.category}
              onChange={(e) => updateRealEstate(index, "category", e.target.value)}
            />
            <Input
              label={item.type === "land" ? "地積(平方メートル)" : "床面積(平方メートル)"}
              value={item.area}
              onChange={(e) => updateRealEstate(index, "area", e.target.value)}
            />
            <Input
              label="取得する相続人の氏名(遺産分割協議書用)"
              value={item.acquiringHeirName}
              onChange={(e) => updateRealEstate(index, "acquiringHeirName", e.target.value)}
            />
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-base font-bold text-zinc-900">書類の作成日</h2>
        <Input
          value={input.documentDate}
          onChange={(e) => setInput((prev) => ({ ...prev, documentDate: e.target.value }))}
          placeholder="例: 令和8年7月吉日"
        />
      </section>

      <section className="flex flex-col gap-3 rounded-lg bg-white p-6">
        <h2 className="text-base font-bold text-zinc-900">書式をダウンロード</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          {(Object.keys(documentLabels) as DocumentKind[]).map((kind) => (
            <Button
              key={kind}
              variant="secondary"
              loading={downloading === kind}
              onClick={() => handleDownload(kind)}
              className="w-full sm:w-auto"
            >
              {documentLabels[kind].label}
            </Button>
          ))}
        </div>
        <p className="text-xs text-zinc-400">
          生成されるPDFはセルフ作成用のひな形であり、法的助言・税務助言には該当しません。
          提出前に法務局・専門家への確認をおすすめします。
        </p>
      </section>
    </div>
  );
}
