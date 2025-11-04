interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"; // Spinner size
  variant?: "circular" | "dots" | "bars" | "pulse"; // Spinner variant
  color?: "brand" | "white" | "gray" | "success" | "error" | "warning"; // Spinner color
  className?: string; // Additional classes
  label?: string; // Accessibility label
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  variant = "circular",
  color = "brand",
  className = "",
  label = "Loading...",
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  // Color Classes
  const colorClasses = {
    brand: "border-brand-500",
    white: "border-white",
    gray: "border-gray-500 dark:border-gray-400",
    success: "border-success-500",
    error: "border-error-500",
    warning: "border-warning-500",
  };

  // Dots size classes
  const dotSizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3",
    xl: "w-4 h-4",
  };

  // Bars size classes
  const barHeightClasses = {
    sm: "h-4",
    md: "h-6",
    lg: "h-8",
    xl: "h-12",
  };

  const barWidthClasses = {
    sm: "w-1",
    md: "w-1.5",
    lg: "w-2",
    xl: "w-3",
  };

  // Color fill classes for dots and bars
  const fillColorClasses = {
    brand: "bg-brand-500",
    white: "bg-white",
    gray: "bg-gray-500 dark:bg-gray-400",
    success: "bg-success-500",
    error: "bg-error-500",
    warning: "bg-warning-500",
  };

  // Circular Spinner (Default)
  if (variant === "circular") {
    return (
      <div
        role="status"
        aria-label={label}
        className={`inline-block ${sizeClasses[size]} ${className}`}
      >
        <div
          className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-t-transparent ${colorClasses[color]}`}
        />
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  // Dots Spinner
  if (variant === "dots") {
    return (
      <div
        role="status"
        aria-label={label}
        className={`inline-flex items-center gap-1 ${className}`}
      >
        <div
          className={`${dotSizeClasses[size]} ${fillColorClasses[color]} animate-bounce rounded-full`}
          style={{ animationDelay: "0ms" }}
        />
        <div
          className={`${dotSizeClasses[size]} ${fillColorClasses[color]} animate-bounce rounded-full`}
          style={{ animationDelay: "150ms" }}
        />
        <div
          className={`${dotSizeClasses[size]} ${fillColorClasses[color]} animate-bounce rounded-full`}
          style={{ animationDelay: "300ms" }}
        />
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  // Bars Spinner
  if (variant === "bars") {
    return (
      <div
        role="status"
        aria-label={label}
        className={`inline-flex items-end gap-1 ${className}`}
      >
        <div
          className={`${barWidthClasses[size]} ${barHeightClasses[size]} ${fillColorClasses[color]} animate-pulse rounded`}
          style={{ animationDelay: "0ms", animationDuration: "1s" }}
        />
        <div
          className={`${barWidthClasses[size]} ${barHeightClasses[size]} ${fillColorClasses[color]} animate-pulse rounded`}
          style={{ animationDelay: "150ms", animationDuration: "1s" }}
        />
        <div
          className={`${barWidthClasses[size]} ${barHeightClasses[size]} ${fillColorClasses[color]} animate-pulse rounded`}
          style={{ animationDelay: "300ms", animationDuration: "1s" }}
        />
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  // Pulse Spinner (Ring pulse effect)
  if (variant === "pulse") {
    return (
      <div
        role="status"
        aria-label={label}
        className={`relative inline-flex ${sizeClasses[size]} ${className}`}
      >
        <div
          className={`absolute inline-flex ${sizeClasses[size]} animate-ping rounded-full opacity-75 ${fillColorClasses[color]}`}
        />
        <div
          className={`relative inline-flex ${sizeClasses[size]} rounded-full ${fillColorClasses[color]}`}
        />
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  return null;
};

export default Spinner;
