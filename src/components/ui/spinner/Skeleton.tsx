interface SkeletonProps {
  variant?: "text" | "circular" | "rectangular" | "rounded"; // Skeleton shape
  width?: string; // Custom width (e.g., "100px", "50%", "full")
  height?: string; // Custom height
  className?: string; // Additional classes
  count?: number; // Number of skeleton elements to render
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = "text",
  width,
  height,
  className = "",
  count = 1,
}) => {
  // Variant Classes
  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full aspect-square",
    rectangular: "rounded-none",
    rounded: "rounded-lg",
  };

  const baseClasses =
    "animate-pulse bg-gray-200 dark:bg-gray-700";

  // Build style object for custom dimensions
  const style: React.CSSProperties = {};
  if (width) {
    style.width = width === "full" ? "100%" : width;
  }
  if (height) {
    style.height = height;
  }

  // Render multiple skeleton elements if count > 1
  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            style={style}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

export default Skeleton;
