import { CircularProgress } from "../ui/progress";

export default function ThreatSeverityCard() {
  const threats = [
    { severity: "Critical", count: 23, color: "error" as const, percentage: 15 },
    { severity: "High", count: 63, color: "warning" as const, percentage: 42 },
    { severity: "Medium", count: 112, color: "info" as const, percentage: 73 },
    { severity: "Low", count: 182, color: "success" as const, percentage: 95 },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-dark">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Threat Severity Distribution
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Current vulnerability breakdown by severity
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <CircularProgress
          value={87}
          size={160}
          strokeWidth={12}
          color="brand"
          label="Security Score"
        />
      </div>

      <div className="space-y-4">
        {threats.map((threat) => (
          <div key={threat.severity} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`h-3 w-3 rounded-full ${
                  threat.severity === "Critical"
                    ? "bg-error-500"
                    : threat.severity === "High"
                      ? "bg-warning-500"
                      : threat.severity === "Medium"
                        ? "bg-blue-500"
                        : "bg-success-500"
                }`}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {threat.severity}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className={`h-full ${
                    threat.severity === "Critical"
                      ? "bg-error-500"
                      : threat.severity === "High"
                        ? "bg-warning-500"
                        : threat.severity === "Medium"
                          ? "bg-blue-500"
                          : "bg-success-500"
                  }`}
                  style={{ width: `${threat.percentage}%` }}
                />
              </div>
              <span className="w-8 text-right text-sm font-semibold text-gray-900 dark:text-white">
                {threat.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
