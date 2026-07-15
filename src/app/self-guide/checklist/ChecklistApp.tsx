"use client";

import {
  buildChecklist,
  countChecklistProgress,
  createDefaultChecklistInput,
  type ChecklistInput,
} from "@/lib/checklist";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import { useLocalStorageState } from "@/lib/useLocalStorageState";

export function ChecklistApp() {
  const [input, setInput] = useLocalStorageState<ChecklistInput>(
    STORAGE_KEYS.checklistInput,
    createDefaultChecklistInput(),
  );
  const [checked, setChecked] = useLocalStorageState<Record<string, boolean>>(
    STORAGE_KEYS.checklistChecked,
    {},
  );

  const groups = buildChecklist(input);
  const { done, total } = countChecklistProgress(groups, checked);

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-4">
        <h2 className="text-sm font-bold text-zinc-900">あなたのケースを教えてください</h2>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-700">相続人の人数</label>
          <input
            type="number"
            min={1}
            value={input.heirCount}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                heirCount: Math.max(1, Number(e.target.value) || 1),
              }))
            }
            className="h-11 w-32 rounded-lg border border-zinc-300 px-4 text-sm"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={input.hasRealEstate}
            onChange={(e) => setInput((prev) => ({ ...prev, hasRealEstate: e.target.checked }))}
            className="h-4 w-4"
          />
          相続財産に不動産が含まれる
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={input.hasOverseasHeir}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, hasOverseasHeir: e.target.checked }))
            }
            className="h-4 w-4"
          />
          海外在住の相続人がいる
        </label>
      </section>

      <div className="flex items-center justify-between rounded-lg bg-tone-hybrid-bg px-4 py-3">
        <span className="text-sm font-medium text-tone-hybrid">進捗</span>
        <span className="text-sm font-bold text-tone-hybrid">
          {done} / {total} 件完了
        </span>
      </div>

      {groups.map((group) => (
        <section key={group.category} className="flex flex-col gap-2">
          <h3 className="text-sm font-bold text-zinc-900">{group.category}</h3>
          {group.items.map((item) => (
            <div
              key={item.id}
              className={`rounded-lg border p-4 ${
                item.informational
                  ? "border-zinc-200 bg-zinc-100 text-zinc-500"
                  : "border-zinc-200 bg-white"
              }`}
            >
              {item.informational ? (
                <p className="text-sm">{item.label}</p>
              ) : (
                <label className="flex items-start gap-3 text-sm text-zinc-800">
                  <input
                    type="checkbox"
                    checked={!!checked[item.id]}
                    onChange={() => toggle(item.id)}
                    className="mt-0.5 h-4 w-4"
                  />
                  <span>
                    <span className={checked[item.id] ? "line-through text-zinc-400" : ""}>
                      {item.label}
                    </span>
                    {item.note && <span className="mt-1 block text-xs text-zinc-500">{item.note}</span>}
                  </span>
                </label>
              )}
            </div>
          ))}
        </section>
      ))}

      <p className="text-xs text-zinc-400">
        本チェックリストは一般的なケースを想定した目安であり、個別の事情により必要書類が異なる場合があります。
        最終的な要否は法務局・専門家にご確認ください。入力内容・チェック状況はこの端末のブラウザに保存されます。
      </p>
    </div>
  );
}
