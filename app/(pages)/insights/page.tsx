import MainLayout from "@/components/layout/MainLayout";
import { OverviewCard, type OverviewCardData } from "@/components/dynamic/OverviewCard";
import { RevenueChart } from "@/components/dynamic/RevenueChart";
import { EngagementMetricsChart } from "@/components/dynamic/EngagementMetricsChart";
import { TopPerformingEvents } from "@/components/dynamic/TopPerformingEvents";
import { InsightsSummarySection, type InsightsSummaryRow } from "@/components/dynamic/InsightsSummarySection";
import dashboardBg from "@/assets/images/background/bg_one.png";

// ─── Data ────────────────────────────────────────────────────────────────────

const overviewCards: OverviewCardData[] = [
  { id: "ov-1", label: "Total Events", value: "5", trend: "up" },
  { id: "ov-2", label: "Engagement Score", value: "80", trend: "down" },
  { id: "ov-3", label: "Total Revenue Generated", value: "R 5,15,821.00", trend: "up" },
  { id: "ov-4", label: "Sales Leads Generated", value: "23", trend: "up" },
];

const topEvents = [
  { id: "tp-1", name: "Q4 Financial Review Conference", score: 78, outOf: 100 },
  { id: "tp-2", name: "Q4 Financial Review Conference", score: 78, outOf: 100 },
  { id: "tp-3", name: "Q4 Financial Review Conference", score: 78, outOf: 100 },
];

const summaryRows: InsightsSummaryRow[] = [
  { id: "es-1", eventName: "The Compound Effect Conference", engagementScore: 80, leadsGenerated: 65, revenueGenerated: "R 1 000 234.01", href: "/insights/compound-effect-conference" },
  { id: "es-2", eventName: "Capital Clarity", engagementScore: 27, leadsGenerated: 47, revenueGenerated: "R 2 452 100.95", href: "/insights/capital-clarity" },
  { id: "es-3", eventName: "ProsperLab", engagementScore: 68, leadsGenerated: 0, revenueGenerated: "R 1 000 234.01", href: "/insights/prosperlab" },
  { id: "es-4", eventName: "The Wealth Blueprint", engagementScore: 89, leadsGenerated: "08", revenueGenerated: "-R 2 452 100.95", href: "/insights/wealth-blueprint" },
  { id: "es-5", eventName: "MoneyMind Summit", engagementScore: 90, leadsGenerated: 24, revenueGenerated: "R 2 452 100.95", href: "/insights/moneymind-summit" },
  { id: "es-6", eventName: "Capital Clarity II", engagementScore: 55, leadsGenerated: 30, revenueGenerated: "R 800 000.00", href: "/insights/capital-clarity-ii" },
  { id: "es-7", eventName: "Digital Banking Summit", engagementScore: 72, leadsGenerated: 88, revenueGenerated: "R 3 100 000.00", href: "/insights/digital-banking-summit" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InsightsPage() {
  return (
    <MainLayout>
      <div
        className="bg-primary"
        style={{
          backgroundImage: `url(${dashboardBg.src})`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="page-container py-10 md:py-14 space-y-10">
          {/* Heading */}
          <h1 className="text-white text-3xl md:text-4xl font-medium">Insights</h1>

          {/* Overview Cards */}
          <section className="space-y-5">
            <h2 className="text-white text-xl font-medium">Overview of March</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {overviewCards.map((card) => (
                <OverviewCard key={card.id} card={card} />
              ))}
            </div>
          </section>

          {/* Revenue Trends */}
          <section className="space-y-5">
            <h2 className="text-white text-xl font-medium">Revenue Trends</h2>
            <RevenueChart />
          </section>

          {/* Engagement Metrics + Top Performing Events */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <section className="flex flex-col gap-5">
              <h2 className="text-white text-xl font-medium">Engagement Metrics</h2>
              <div className="flex-1"><EngagementMetricsChart /></div>
            </section>
            <section className="flex flex-col gap-5">
              <h2 className="text-white text-xl font-medium">Top Performing Events</h2>
              <div className="flex-1"><TopPerformingEvents events={topEvents} /></div>
            </section>
          </div>

          {/* Event Summary */}
          <section className="space-y-5">
            <h2 className="text-white text-xl font-medium">Event Summary</h2>
            <InsightsSummarySection rows={summaryRows} />
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
