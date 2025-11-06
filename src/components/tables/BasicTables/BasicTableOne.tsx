import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import UserAvatar from "../../common/UserAvatar";

interface SecurityScan {
  id: number;
  analyst: {
    name: string;
    role: string;
  };
  projectName: string;
  team: {
    names: string[];
  };
  status: string;
  findings: string;
}

// Define the table data with cybersecurity scans
const tableData: SecurityScan[] = [
  {
    id: 1,
    analyst: {
      name: "Analyst 1",
      role: "Security Researcher",
    },
    projectName: "Production Docker Scan",
    team: {
      names: ["Analyst 2", "Analyst 3", "Analyst 4"],
    },
    findings: "23 Critical",
    status: "Completed",
  },
  {
    id: 2,
    analyst: {
      name: "Analyst 2",
      role: "Penetration Tester",
    },
    projectName: "Web Server Port Scan",
    team: {
      names: ["Analyst 5", "Analyst 6"],
    },
    findings: "8 High",
    status: "In Progress",
  },
  {
    id: 3,
    analyst: {
      name: "Analyst 3",
      role: "Vulnerability Analyst",
    },
    projectName: "API Gateway Assessment",
    team: {
      names: ["Analyst 1"],
    },
    findings: "15 Medium",
    status: "Completed",
  },
  {
    id: 4,
    analyst: {
      name: "Analyst 4",
      role: "Security Auditor",
    },
    projectName: "Database Security Audit",
    team: {
      names: ["Analyst 7", "Analyst 8", "Analyst 9"],
    },
    findings: "42 Low",
    status: "Failed",
  },
  {
    id: 5,
    analyst: {
      name: "Analyst 5",
      role: "Network Analyst",
    },
    projectName: "Infrastructure Scan",
    team: {
      names: ["Analyst 10", "Analyst 2", "Analyst 3"],
    },
    findings: "5 Critical",
    status: "Completed",
  },
];

export default function BasicTableOne() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Analyst
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Scan Project
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Team
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Findings
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((scan) => (
              <TableRow key={scan.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <UserAvatar name={scan.analyst.name} size="sm" />
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {scan.analyst.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {scan.analyst.role}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {scan.projectName}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex -space-x-2">
                    {scan.team.names.map((name, index) => (
                      <div
                        key={index}
                        className="border-2 border-white rounded-full dark:border-gray-900"
                        title={name}
                      >
                        <UserAvatar name={name} size="sm" className="h-6 w-6 text-xs" />
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      scan.status === "Completed"
                        ? "success"
                        : scan.status === "In Progress"
                        ? "warning"
                        : "error"
                    }
                  >
                    {scan.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span className={`font-semibold ${
                    scan.findings.includes("Critical")
                      ? "text-error-600 dark:text-error-400"
                      : scan.findings.includes("High")
                      ? "text-warning-600 dark:text-warning-400"
                      : scan.findings.includes("Medium")
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}>
                    {scan.findings}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
