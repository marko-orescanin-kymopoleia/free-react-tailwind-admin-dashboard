import SecurityMetrics from "../../components/security/SecurityMetrics";
import VulnerabilityTrendChart from "../../components/security/VulnerabilityTrendChart";
import ThreatDistributionChart from "../../components/security/ThreatDistributionChart";
import ThreatSeverityCard from "../../components/security/ThreatSeverityCard";
import RecentScans from "../../components/security/RecentScans";
import ThreatMapCard from "../../components/security/ThreatMapCard";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Security Dashboard | Cyber Sentinel - Vulnerability Management Platform"
        description="Comprehensive security dashboard for vulnerability scanning and threat monitoring"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <SecurityMetrics />

          <VulnerabilityTrendChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <ThreatSeverityCard />
        </div>

        <div className="col-span-12">
          <ThreatDistributionChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <ThreatMapCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentScans />
        </div>
      </div>
    </>
  );
}
