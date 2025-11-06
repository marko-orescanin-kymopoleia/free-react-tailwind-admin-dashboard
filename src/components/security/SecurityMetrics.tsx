import { ArrowUpIcon } from "../../icons";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-dark">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </h3>
          <div className="mt-2 flex items-center gap-1">
            <span
              className={`flex items-center text-sm font-medium ${
                isPositive
                  ? "text-success-600 dark:text-success-400"
                  : "text-error-600 dark:text-error-400"
              }`}
            >
              <ArrowUpIcon
                className={`h-4 w-4 ${!isPositive ? "rotate-180" : ""}`}
              />
              {change}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              vs last month
            </span>
          </div>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
};

export default function SecurityMetrics() {
  const metrics = [
    {
      title: "Total Scans",
      value: "1,247",
      change: "12.5%",
      isPositive: true,
      icon: "🔍",
    },
    {
      title: "Critical Vulnerabilities",
      value: "23",
      change: "8.2%",
      isPositive: false, // Decrease is good for vulnerabilities
      icon: "🚨",
    },
    {
      title: "Assets Monitored",
      value: "342",
      change: "15.3%",
      isPositive: true,
      icon: "🖥️",
    },
    {
      title: "Security Score",
      value: "87%",
      change: "5.2%",
      isPositive: true,
      icon: "🛡️",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}
