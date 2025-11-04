import { ReactNode } from "react";

export interface Step {
  label: string;
  description?: string;
  icon?: ReactNode;
}

interface StepperProps {
  steps: Step[];
  currentStep: number; // 0-indexed
  orientation?: "horizontal" | "vertical";
  className?: string;
  onStepClick?: (index: number) => void;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  orientation = "horizontal",
  className = "",
  onStepClick,
}) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={`${
        isHorizontal ? "flex items-center" : "flex flex-col"
      } ${className}`}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isClickable = onStepClick && (isCompleted || isCurrent);

        return (
          <div
            key={index}
            className={`flex ${
              isHorizontal ? "flex-1 items-center" : "items-start"
            }`}
          >
            {/* Step Content */}
            <div
              className={`flex ${
                isHorizontal ? "flex-col items-center" : "flex-row items-start"
              } gap-3`}
            >
              {/* Step Circle */}
              <button
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 transition ${
                  isClickable ? "cursor-pointer" : "cursor-default"
                } ${
                  isCompleted
                    ? "border-success-500 bg-success-500 text-white"
                    : isCurrent
                      ? "border-brand-500 bg-brand-500 text-white"
                      : "border-gray-300 bg-white text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : step.icon ? (
                  step.icon
                ) : (
                  <span className="font-semibold">{index + 1}</span>
                )}
              </button>

              {/* Step Label */}
              <div
                className={`flex flex-col ${
                  isHorizontal ? "items-center text-center" : "items-start"
                } ${isHorizontal ? "mt-2" : ""}`}
              >
                <span
                  className={`text-sm font-medium ${
                    isCurrent || isCompleted
                      ? "text-gray-900 dark:text-gray-100"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {step.description}
                  </span>
                )}
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`${
                  isHorizontal
                    ? "mx-4 h-0.5 flex-1"
                    : "ml-5 mt-2 h-12 w-0.5"
                } ${
                  index < currentStep
                    ? "bg-success-500"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
