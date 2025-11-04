import { ReactNode } from "react";
import Spinner from "./Spinner";

interface LoadingOverlayProps {
  isLoading: boolean; // Whether to show the overlay
  children: ReactNode; // Content to render underneath
  message?: string; // Optional loading message
  spinnerSize?: "sm" | "md" | "lg" | "xl"; // Spinner size
  blur?: boolean; // Whether to blur the background content
  fullScreen?: boolean; // Whether to cover the entire screen
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  children,
  message,
  spinnerSize = "lg",
  blur = true,
  fullScreen = false,
}) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div className={fullScreen ? "fixed inset-0" : "relative"}>
      {children}
      <div
        className={`${
          fullScreen ? "fixed" : "absolute"
        } inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 ${
          blur ? "backdrop-blur-sm" : ""
        }`}
      >
        <Spinner size={spinnerSize} variant="circular" color="brand" />
        {message && (
          <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
