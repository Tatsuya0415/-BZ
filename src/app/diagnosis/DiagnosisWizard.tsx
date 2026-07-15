"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SelectableCard, Stepper } from "@/components/ui";
import { questions, type Answers, type QuestionId } from "@/lib/diagnosis";

export function DiagnosisWizard() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<QuestionId, string>>>({});

  const question = questions[stepIndex];
  const isLastStep = stepIndex === questions.length - 1;

  function handleSelect(value: string) {
    const nextAnswers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);

    if (isLastStep) {
      const params = new URLSearchParams(nextAnswers as Record<string, string>);
      router.push(`/diagnosis/result?${params.toString()}`);
      return;
    }
    setStepIndex((prev) => prev + 1);
  }

  function handleBack() {
    setStepIndex((prev) => Math.max(0, prev - 1));
  }

  return (
    <div className="flex w-full max-w-lg flex-col gap-8">
      <Stepper totalSteps={questions.length} currentStep={stepIndex + 1} />
      <h1 className="text-xl font-bold text-zinc-900">{question.text}</h1>
      <div className="flex flex-col gap-3">
        {question.options.map((option) => (
          <SelectableCard
            key={option.value}
            selected={answers[question.id] === option.value}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </SelectableCard>
        ))}
      </div>
      {stepIndex > 0 && (
        <button
          type="button"
          onClick={handleBack}
          className="text-sm text-zinc-500 hover:underline"
        >
          ← 前の質問に戻る
        </button>
      )}
    </div>
  );
}

export type { Answers };
