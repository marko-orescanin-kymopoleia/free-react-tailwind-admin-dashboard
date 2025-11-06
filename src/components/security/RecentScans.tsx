import { useState } from "react";

interface Scan {
  id: number;
  name: string;
  type: string;
  status: "completed" | "running" | "failed";
  findings: number;
  severity: "critical" | "high" | "medium" | "low";
  date: string;
  time: string;
}

export default function RecentScans() {
  const [filter, setFilter] = useState<string>("all");

  const scans: Scan[] = [
    {
      id: 1,
      name: "Production Docker Registry",
      type: "Trivy Container Scan",
      status: "completed",
      findings: 23,
      severity: "critical",
      date: "2025-01-20",
      time: "14:32",
    },
    {
      id: 2,
      name: "Web Server 192.168.1.10",
      type: "Nmap Port Scan",
      status: "completed",
      findings: 8,
      severity: "high",
      date: "2025-01-20",
      time: "13:15",
    },
    {
      id: 3,
      name: "API Gateway Cluster",
      type: "Metasploit Exploit Test",
      status: "running",
      findings: 0,
      severity: "medium",
      date: "2025-01-20",
      time: "12:45",
    },
    {
      id: 4,
      name: "Database Server",
      type: "Nmap Vulnerability Scan",
      status: "completed",
      findings: 15,
      severity: "high",
      date: "2025-01-20",
      time: "11:20",
    },
    {
      id: 5,
      name: "Frontend Application",
      type: "Trivy Image Scan",
      status: "completed",
      findings: 42,
      severity: "medium",
      date: "2025-01-20",
      time: "10:05",
    },
  ];

  const getStatusBadge = (status: Scan["status"]) => {
    const styles = {
      completed:
        "bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400",
      running: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      failed: "bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-400",
    };

    return (
      <span
        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getSeverityBadge = (severity: Scan["severity"]) => {
    const styles = {
      critical:
        "bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-400",
      high: "bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400",
      medium: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      low: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    };

    return (
      <span
        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${styles[severity]}`}
      >
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-dark">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Security Scans
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Latest vulnerability assessments and scan results
          </p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="all">All Scans</option>
          <option value="trivy">Trivy</option>
          <option value="nmap">Nmap</option>
          <option value="metasploit">Metasploit</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Target
              </th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Scan Type
              </th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Status
              </th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Findings
              </th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Severity
              </th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {scans.map((scan) => (
              <tr
                key={scan.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {scan.name}
                </td>
                <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                  {scan.type}
                </td>
                <td className="py-4">{getStatusBadge(scan.status)}</td>
                <td className="py-4 text-sm font-semibold text-gray-900 dark:text-white">
                  {scan.findings > 0 ? scan.findings : "—"}
                </td>
                <td className="py-4">{getSeverityBadge(scan.severity)}</td>
                <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                  {scan.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
