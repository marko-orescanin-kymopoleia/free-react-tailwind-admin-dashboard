interface CircularProgressProps {
  value: number; // 0-100
  max?: number;
  size?: number; // Size in pixels
  strokeWidth?: number;
  color?: "brand" | "success" | "error" | "warning" | "info";
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = "brand",
  showLabel = true,
  label,
  className = "",
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Color Classes
  const colorClasses = {
    brand: "stroke-brand-500",
    success: "stroke-success-500",
    error: "stroke-error-500",
    warning: "stroke-warning-500",
    info: "stroke-blue-500",
  };

  const textColorClasses = {
    brand: "text-brand-700 dark:text-brand-400",
    success: "text-success-700 dark:text-success-400",
    error: "text-error-700 dark:text-error-400",
    warning: "text-warning-700 dark:text-warning-400",
    info: "text-blue-700 dark:text-blue-400",
  };

  return (
    <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={size}
          height={size}
          className="rotate-[-90deg] transform"
        >
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${colorClasses[color]} transition-all duration-500 ease-in-out`}
          />
        </svg>

        {/* Center Label */}
        {showLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={`text-2xl font-bold ${textColorClasses[color]}`}
            >
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>

      {/* Bottom Label */}
      {label && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
    </div>
  );
};

export default CircularProgress;
