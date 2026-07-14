"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/ui/Stepper";
import { QuestionCard } from "./QuestionCard";
import { ResultSummary } from "./ResultSummary";
import { QUESTIONS } from "@/lib/questions";
import { diagnose } from "@/lib/diagnosis-logic";
import type { DiagnosisAnswers } from "@/lib/types";

const STORAGE_KEY = "souzoku-diagnosis-v1";

interface StoredState {
  step: number;
  answers: Partial<DiagnosisAnswers>;
}

export function DiagnosisFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<DiagnosisAnswers>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredState;
        setStep(parsed.step ?? 0);
        setAnswers(parsed.answers ?? {});
      }
    } catch {
      // localStorage が使えない環境では無視して最初から開始する
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload: StoredState = { step, answers };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [step, answers, hydrated]);

  const isFinished = step >= QUESTIONS.length;

  if (!hydrated) {
    return null;
  }

  if (isFinished) {
    const result = diagnose(answers as DiagnosisAnswers);
    return (
      <div className="grid gap-6">
        <ResultSummary result={result} />
        <div className="flex flex-wrap gap-3 print:hidden">
          <Button onClick={() => window.print()}>PDFとして保存・印刷</Button>
          <Button
            variant="secondary"
            onClick={() => {
              setStep(0);
              setAnswers({});
              window.localStorage.removeItem(STORAGE_KEY);
            }}
          >
            最初からやり直す
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[step];
  const currentValue = answers[currentQuestion.key] as string | undefined;

  return (
    <Card>
      <Stepper current={step + 1} total={QUESTIONS.length} />
      <div className="mt-6">
        <QuestionCard
          title={currentQuestion.title}
          helper={currentQuestion.helper}
          options={currentQuestion.options}
          selectedValue={currentValue}
          onSelect={(value) => {
            setAnswers((prev) => ({
              ...prev,
              [currentQuestion.key]: value,
            }));
          }}
        />
      </div>
      <div className="mt-6 flex justify-between">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          戻る
        </Button>
        <Button
          onClick={() => setStep((s) => s + 1)}
          disabled={!currentValue}
        >
          {step === QUESTIONS.length - 1 ? "診断結果を見る" : "次へ"}
        </Button>
      </div>
    </Card>
  );
}
