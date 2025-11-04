interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: "brand" | "success" | "error" | "warning" | "info";
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  striped?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = "md",
  color = "brand",
  showLabel = false,
  label,
  animated = false,
  striped = false,
  className = "",
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Size Classes
  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  // Color Classes
  const colorClasses = {
    brand: "bg-brand-500",
    success: "bg-success-500",
    error: "bg-error-500",
    warning: "bg-warning-500",
    info: "bg-blue-500",
  };

  const textColorClasses = {
    brand: "text-brand-700 dark:text-brand-400",
    success: "text-success-700 dark:text-success-400",
    error: "text-error-700 dark:text-error-400",
    warning: "text-warning-700 dark:text-warning-400",
    info: "text-blue-700 dark:text-blue-400",
  };

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="mb-2 flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
          {showLabel && (
            <span
              className={`text-sm font-medium ${textColorClasses[color]}`}
            >
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        className={`w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 ${sizeClasses[size]}`}
      >
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} transition-all duration-300 ${
            animated ? "animate-pulse" : ""
          } ${
            striped
              ? "bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:40px_40px] animate-shimmer"
              : ""
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
