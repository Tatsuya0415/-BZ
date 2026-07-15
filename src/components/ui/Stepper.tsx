export interface StepperProps {
  totalSteps: number;
  currentStep: number;
}

export function Stepper({ totalSteps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center gap-2" role="progressbar" aria-valuemin={1} aria-valuemax={totalSteps} aria-valuenow={currentStep}>
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
        const isCurrent = step === currentStep;
        const isDone = step < currentStep;
        return (
          <span
            key={step}
            className={`rounded-full transition-colors ${
              isCurrent
                ? "h-3 w-3 bg-zinc-900"
                : isDone
                  ? "h-2 w-2 bg-zinc-500"
                  : "h-2 w-2 bg-zinc-200"
            }`}
          />
        );
      })}
      <span className="ml-2 text-xs text-zinc-500">
        {currentStep} / {totalSteps}
      </span>
    </div>
  );
}
