import { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

// Import new components
import { Spinner, Skeleton, LoadingOverlay } from "../../components/ui/spinner";
import { useToast } from "../../components/ui/toast";
import {
  Select,
  MultiSelect,
  ContextMenu,
  SelectOption,
  MultiSelectOption,
  ContextMenuItem,
} from "../../components/ui/dropdown";
import { DataTable, Column } from "../../components/ui/table";
import {
  ProgressBar,
  CircularProgress,
  Stepper,
  Step,
} from "../../components/ui/progress";

// Sample data for DataTable
interface SampleData {
  id: number;
  name: string;
  status: string;
  severity: string;
  date: string;
}

const sampleTableData: SampleData[] = [
  { id: 1, name: "Security Scan A", status: "Completed", severity: "High", date: "2025-01-15" },
  { id: 2, name: "Vulnerability Test", status: "Running", severity: "Medium", date: "2025-01-16" },
  { id: 3, name: "Penetration Test", status: "Pending", severity: "Critical", date: "2025-01-17" },
  { id: 4, name: "Network Scan", status: "Completed", severity: "Low", date: "2025-01-18" },
  { id: 5, name: "Code Analysis", status: "Failed", severity: "High", date: "2025-01-19" },
  { id: 6, name: "Database Audit", status: "Completed", severity: "Medium", date: "2025-01-20" },
  { id: 7, name: "API Security Check", status: "Running", severity: "High", date: "2025-01-21" },
  { id: 8, name: "Firewall Test", status: "Completed", severity: "Low", date: "2025-01-22" },
];

export default function NewComponents() {
  const toast = useToast();

  // Select states
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);

  // Progress states
  const [progress, setProgress] = useState(65);
  const [currentStep, setCurrentStep] = useState(1);
  const [showLoading, setShowLoading] = useState(false);

  // Select options
  const selectOptions: SelectOption[] = [
    { value: "high", label: "High Priority", icon: "🔴" },
    { value: "medium", label: "Medium Priority", icon: "🟡" },
    { value: "low", label: "Low Priority", icon: "🟢" },
  ];

  const multiSelectOptions: MultiSelectOption[] = [
    { value: "scan", label: "Security Scan", icon: "🔍" },
    { value: "audit", label: "Audit", icon: "📋" },
    { value: "test", label: "Penetration Test", icon: "🛡️" },
    { value: "monitor", label: "Monitoring", icon: "📊" },
  ];

  // Context menu items
  const contextMenuItems: ContextMenuItem[] = [
    { label: "View Details", icon: "👁️", onClick: () => toast.info("View details clicked") },
    { label: "Edit", icon: "✏️", onClick: () => toast.info("Edit clicked") },
    { label: "Download Report", icon: "⬇️", onClick: () => toast.info("Download clicked") },
    { divider: true, label: "", onClick: () => {} },
    { label: "Delete", icon: "🗑️", onClick: () => toast.error("Delete clicked"), danger: true },
  ];

  // Table columns
  const columns: Column<SampleData>[] = [
    { key: "name", header: "Name", sortable: true, filterable: true },
    {
      key: "status",
      header: "Status",
      sortable: true,
      filterable: true,
      render: (row) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
            row.status === "Completed"
              ? "bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400"
              : row.status === "Running"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                : row.status === "Failed"
                  ? "bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-400"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "severity",
      header: "Severity",
      sortable: true,
      filterable: true,
      render: (row) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
            row.severity === "Critical"
              ? "bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-400"
              : row.severity === "High"
                ? "bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400"
                : row.severity === "Medium"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {row.severity}
        </span>
      ),
    },
    { key: "date", header: "Date", sortable: true },
  ];

  // Stepper steps
  const steps: Step[] = [
    { label: "Configuration", description: "Set scan parameters" },
    { label: "Scanning", description: "Running security scan" },
    { label: "Analysis", description: "Analyzing results" },
    { label: "Report", description: "Generate report" },
  ];

  return (
    <div>
      <PageMeta
        title="New UI Components | Cyber Sentinel - Security Dashboard Platform"
        description="Showcase of new UI components including spinners, toasts, dropdowns, data tables, and progress indicators"
      />
      <PageBreadcrumb pageTitle="New UI Components" />

      <div className="space-y-5 sm:space-y-6">
        {/* Spinners */}
        <ComponentCard title="Loading Spinners">
          <div className="space-y-6">
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Circular Spinners
              </h4>
              <div className="flex items-center gap-6">
                <Spinner size="sm" color="brand" />
                <Spinner size="md" color="success" />
                <Spinner size="lg" color="error" />
                <Spinner size="xl" color="warning" />
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Dots Spinners
              </h4>
              <div className="flex items-center gap-6">
                <Spinner variant="dots" size="sm" color="brand" />
                <Spinner variant="dots" size="md" color="success" />
                <Spinner variant="dots" size="lg" color="error" />
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Bars Spinners
              </h4>
              <div className="flex items-center gap-6">
                <Spinner variant="bars" size="sm" color="brand" />
                <Spinner variant="bars" size="md" color="success" />
                <Spinner variant="bars" size="lg" color="error" />
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Pulse Spinner
              </h4>
              <div className="flex items-center gap-6">
                <Spinner variant="pulse" size="sm" color="brand" />
                <Spinner variant="pulse" size="md" color="success" />
                <Spinner variant="pulse" size="lg" color="error" />
              </div>
            </div>
          </div>
        </ComponentCard>

        {/* Skeleton Loaders */}
        <ComponentCard title="Skeleton Loaders">
          <div className="space-y-4">
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" count={3} />
            <div className="flex gap-4">
              <Skeleton variant="circular" width="60px" height="60px" />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="100%" />
              </div>
            </div>
          </div>
        </ComponentCard>

        {/* Loading Overlay */}
        <ComponentCard title="Loading Overlay">
          <div className="space-y-4">
            <button
              onClick={() => {
                setShowLoading(true);
                setTimeout(() => setShowLoading(false), 3000);
              }}
              className="rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600"
            >
              Show Loading Overlay (3s)
            </button>

            <LoadingOverlay
              isLoading={showLoading}
              message="Loading security data..."
              spinnerSize="lg"
            >
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 dark:border-gray-700 dark:bg-gray-800">
                <p className="text-gray-700 dark:text-gray-300">
                  This content will be overlaid with a loading spinner when you click the button above.
                </p>
              </div>
            </LoadingOverlay>
          </div>
        </ComponentCard>

        {/* Toast Notifications */}
        <ComponentCard title="Toast Notifications">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => toast.success("Security scan completed successfully!")}
              className="rounded-lg bg-success-500 px-4 py-2 text-white hover:bg-success-600"
            >
              Success Toast
            </button>
            <button
              onClick={() => toast.error("Failed to connect to server")}
              className="rounded-lg bg-error-500 px-4 py-2 text-white hover:bg-error-600"
            >
              Error Toast
            </button>
            <button
              onClick={() => toast.warning("High severity vulnerability detected")}
              className="rounded-lg bg-warning-500 px-4 py-2 text-white hover:bg-warning-600"
            >
              Warning Toast
            </button>
            <button
              onClick={() => toast.info("Scan started at 10:30 AM")}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Info Toast
            </button>
          </div>
        </ComponentCard>

        {/* Select Dropdown */}
        <ComponentCard title="Select Dropdown (Searchable)">
          <div className="space-y-4">
            <Select
              options={selectOptions}
              value={selectedOption}
              onChange={setSelectedOption}
              placeholder="Select priority level"
              searchable
              label="Priority Level"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Selected: {selectedOption || "None"}
            </p>
          </div>
        </ComponentCard>

        {/* Multi-Select */}
        <ComponentCard title="Multi-Select Dropdown">
          <div className="space-y-4">
            <MultiSelect
              options={multiSelectOptions}
              value={selectedMulti}
              onChange={setSelectedMulti}
              placeholder="Select scan types"
              searchable
              label="Scan Types"
              maxSelection={3}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Selected: {selectedMulti.length > 0 ? selectedMulti.join(", ") : "None"}
            </p>
          </div>
        </ComponentCard>

        {/* Context Menu */}
        <ComponentCard title="Context Menu (Right-click)">
          <ContextMenu items={contextMenuItems}>
            <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-600 dark:bg-gray-800">
              <p className="text-gray-700 dark:text-gray-300">
                Right-click anywhere in this box to see the context menu
              </p>
            </div>
          </ContextMenu>
        </ComponentCard>

        {/* Data Table */}
        <ComponentCard title="Advanced Data Table (Sortable, Filterable, Paginated)">
          <DataTable
            data={sampleTableData}
            columns={columns}
            keyExtractor={(row) => row.id}
            pagination
            pageSize={5}
            searchable
          />
        </ComponentCard>

        {/* Progress Bars */}
        <ComponentCard title="Progress Bars">
          <div className="space-y-6">
            <ProgressBar value={progress} showLabel label="Scan Progress" color="brand" />
            <ProgressBar value={85} showLabel color="success" />
            <ProgressBar value={45} showLabel color="warning" striped />
            <ProgressBar value={100} showLabel color="error" animated />

            <div className="flex gap-4">
              <button
                onClick={() => setProgress((p) => Math.max(0, p - 10))}
                className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
              >
                -10%
              </button>
              <button
                onClick={() => setProgress((p) => Math.min(100, p + 10))}
                className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
              >
                +10%
              </button>
            </div>
          </div>
        </ComponentCard>

        {/* Circular Progress */}
        <ComponentCard title="Circular Progress">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <CircularProgress value={75} label="CPU Usage" color="brand" />
            <CircularProgress value={90} label="Memory" color="warning" size={100} />
            <CircularProgress value={45} label="Disk" color="success" size={140} />
          </div>
        </ComponentCard>

        {/* Stepper */}
        <ComponentCard title="Stepper (Horizontal)">
          <div className="space-y-6">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              orientation="horizontal"
              onStepClick={setCurrentStep}
            />

            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                disabled={currentStep === 0}
                className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-800"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
                disabled={currentStep === steps.length - 1}
                className="rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </ComponentCard>

        {/* Vertical Stepper */}
        <ComponentCard title="Stepper (Vertical)">
          <Stepper steps={steps} currentStep={2} orientation="vertical" />
        </ComponentCard>
      </div>
    </div>
  );
}
