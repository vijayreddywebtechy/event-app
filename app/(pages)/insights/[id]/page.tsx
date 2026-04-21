import Link from "next/link";
import { ChevronRight } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { OverviewCard, type OverviewCardData } from "@/components/dynamic/OverviewCard";
import { EngagementMetricsChart } from "@/components/dynamic/EngagementMetricsChart";
import { FeedbackBars } from "@/components/dynamic/FeedbackBars";
import { AttendeesList } from "@/components/dynamic/AttendeesList";
import dashboardBg from "@/assets/images/background/bg_one.png";

// ─── Mock data (replace with real fetch by id) ────────────────────────────────

const event = {
  title: "The Compound Effect Conference",
};

const overviewCards: OverviewCardData[] = [
  { id: "ov-1", label: "Registered", value: "200", trend: "up" },
  { id: "ov-2", label: "Attendance", value: "167", trend: "up" },
  { id: "ov-3", label: "Leads generated", value: "45", trend: "up" },
  { id: "ov-4", label: "Revenue generated", value: "R 12,000.00", trend: "up" },
];

const attendees = Array.from({ length: 33 }, (_, i) => ({
  id: `att-${i + 1}`,
  name: "Full Name",
}));

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InsightDetailPage() {
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
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-white/70">
            <Link href="/insights" className="hover:text-white transition-colors">
              Insights
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{event.title}</span>
          </nav>

          {/* Title */}
          <h1 className="text-white text-2xl md:text-3xl font-medium -mt-4">
            {event.title}
          </h1>

          {/* Overview Cards */}
          <section className="space-y-5">
            <h2 className="text-white text-xl font-medium">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {overviewCards.map((card) => (
                <OverviewCard key={card.id} card={card} />
              ))}
            </div>
          </section>

          {/* Engagement Metrics + Feedback */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <section className="flex flex-col gap-5">
              <h2 className="text-white text-xl font-medium">Engagement Metrics</h2>
              <div className="flex-1"><EngagementMetricsChart /></div>
            </section>
            <section className="flex flex-col gap-5">
              <h2 className="text-white text-xl font-medium">Feedback</h2>
              <div className="flex-1"><FeedbackBars /></div>
            </section>
          </div>

          {/* Attendees */}
          <section className="space-y-5">
            <h2 className="text-white text-xl font-medium">Attendees</h2>
            <AttendeesList attendees={attendees} />
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
