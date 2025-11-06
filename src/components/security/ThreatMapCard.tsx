export default function ThreatMapCard() {
  const threatSources = [
    { country: "United States", threats: 1247, percentage: 35 },
    { country: "China", threats: 892, percentage: 25 },
    { country: "Russia", threats: 534, percentage: 15 },
    { country: "Brazil", threats: 356, percentage: 10 },
    { country: "India", threats: 267, percentage: 8 },
    { country: "Others", threats: 248, percentage: 7 },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-dark">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Threat Geographic Distribution
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Attack sources by geographic region
        </p>
      </div>

      <div className="mb-6 flex h-48 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800/50">
        <div className="text-center">
          <div className="mb-2 text-6xl">🌍</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Geographic threat visualization
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {threatSources.map((source) => (
          <div key={source.country} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-xs">
                {source.country.substring(0, 2)}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {source.country}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full bg-brand-500"
                  style={{ width: `${source.percentage}%` }}
                />
              </div>
              <span className="w-16 text-right text-sm font-semibold text-gray-900 dark:text-white">
                {source.threats}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
