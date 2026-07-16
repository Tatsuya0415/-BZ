type Tone = "self" | "agent" | "hybrid";

const toneClasses: Record<Tone, string> = {
  self: "bg-tone-self-bg text-tone-self",
  agent: "bg-tone-agent-bg text-tone-agent",
  hybrid: "bg-tone-hybrid-bg text-tone-hybrid",
};

export interface SummaryPanelProps {
  tone: Tone;
  title: string;
  description: string;
}

export function SummaryPanel({ tone, title, description }: SummaryPanelProps) {
  return (
    <div className={`rounded-lg p-6 ${toneClasses[tone]}`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-zinc-700">{description}</p>
    </div>
  );
}
