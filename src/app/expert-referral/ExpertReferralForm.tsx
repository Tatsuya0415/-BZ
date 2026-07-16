"use client";

import { useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import { Button, Input } from "@/components/ui";
import { buildInquiryMailto, getContactEmail, type ExpertInquiry } from "@/lib/contact";

const diagnosisTypeLabel: Record<string, string> = {
  self: "セルフ推奨",
  agent: "代行推奨",
  hybrid: "ハイブリッド推奨",
};

type Status = "idle" | "submitting" | "sent" | "fallback" | "error";

export function ExpertReferralForm() {
  const messageId = useId();
  const searchParams = useSearchParams();
  const diagnosisType = searchParams.get("type") ?? undefined;

  const [form, setForm] = useState<ExpertInquiry>({
    name: "",
    contact: "",
    message: "",
    diagnosisType,
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors: string[] = [];
    if (!form.name.trim()) validationErrors.push("お名前を入力してください。");
    if (!form.contact.trim()) validationErrors.push("連絡先(メールまたは電話番号)を入力してください。");
    if (!form.message.trim()) validationErrors.push("相談内容を入力してください。");
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);
    setStatus("submitting");

    try {
      const response = await fetch("/api/expert-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => null);
      if (response.ok && data?.delivered) {
        setStatus("sent");
      } else {
        setStatus("fallback");
      }
    } catch {
      setStatus("fallback");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg bg-tone-self-bg p-6 text-sm text-tone-self">
        送信しました。提携専門家の準備が整い次第、担当よりご連絡します。
      </div>
    );
  }

  if (status === "fallback") {
    const mailtoUrl = buildInquiryMailto(form, getContactEmail());
    return (
      <div className="flex flex-col gap-3 rounded-lg bg-tone-hybrid-bg p-6 text-sm text-tone-hybrid">
        <p>
          現在オンライン送信の窓口を準備中のため、下記ボタンからメールでお送りください
          (お使いのメールソフトが開きます)。
        </p>
        <a href={mailtoUrl}>
          <Button size="small">メールソフトで送信する</Button>
        </a>
        <p className="text-xs text-zinc-500">
          宛先: {getContactEmail()}(メールソフトが開かない場合は直接このアドレス宛にご連絡ください)
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {errors.length > 0 && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          <ul className="list-disc space-y-1 pl-5">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {diagnosisType && (
        <p className="text-xs text-zinc-500">
          診断結果: {diagnosisTypeLabel[diagnosisType] ?? diagnosisType}
        </p>
      )}
      <Input
        label="お名前"
        value={form.name}
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
      />
      <Input
        label="連絡先(メールまたは電話番号)"
        value={form.contact}
        onChange={(e) => setForm((prev) => ({ ...prev, contact: e.target.value }))}
      />
      <div className="flex flex-col gap-1">
        <label htmlFor={messageId} className="text-xs font-medium text-zinc-700">
          相談内容
        </label>
        <textarea
          id={messageId}
          value={form.message}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          rows={5}
          className="rounded-lg border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
        />
      </div>
      <Button type="submit" loading={status === "submitting"}>
        送信する
      </Button>
      <p className="text-xs text-zinc-400">
        現時点で提携専門家はまだいません。ご相談内容は今後の提携専門家紹介の準備のために利用します。
        個別の法律相談への回答ではありません。
      </p>
    </form>
  );
}
