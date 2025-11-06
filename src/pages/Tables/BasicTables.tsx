import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="Security Scan Tables | Cyber Sentinel - Security Dashboard Platform"
        description="View security scan results and analyst assignments"
      />
      <PageBreadcrumb pageTitle="Security Scans" />
      <div className="space-y-6">
        <ComponentCard title="Active Security Scans">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
