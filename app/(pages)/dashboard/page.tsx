import Link from "next/link";
import { Megaphone, QrCode, BarChart2, CalendarDays } from "lucide-react";

import MainLayout from "@/components/layout/MainLayout";
import {
  OverviewCard,
  type OverviewCardData,
} from "@/components/dynamic/OverviewCard";
import { EventCard, type EventCardData } from "@/components/dynamic/EventCard";
import { FeaturedEventCard } from "@/components/dynamic/FeaturedEventCard";
import {
  EventSummaryTable,
  type EventSummaryRow,
} from "@/components/dynamic/EventSummaryTable";
import dashboardBg from "@/assets/images/background/dashboard_welcome_banner_bg.png";
import workshopBanner from "@/assets/images/background/workshop_event_banner.png";

// ─── Data ────────────────────────────────────────────────────────────────────

const overviewCards: OverviewCardData[] = [
  { id: "ov-1", label: "Total Events", value: "5", trend: "up" },
  { id: "ov-2", label: "Engagement Score", value: "80", trend: "down" },
  {
    id: "ov-3",
    label: "Total Revenue Generated",
    value: "R 5,15,821.00",
    trend: "up",
  },
  { id: "ov-4", label: "Sales Leads Generated", value: "23", trend: "up" },
];

const quickActions = [
  {
    id: "qa-1",
    label: "Create an event",
    href: "/events/new",
    Icon: CalendarDays,
  },
  {
    id: "qa-2",
    label: "Create a campaign",
    href: "/campaigns/new",
    Icon: Megaphone,
  },
  { id: "qa-3", label: "QR Check-in", href: "/qr-check-in", Icon: QrCode },
  { id: "qa-4", label: "View Insights", href: "/insights", Icon: BarChart2 },
];

const featuredEvent = {
  title: "Digital Banking Skills Workshop",
  description:
    "Comprehensive training workshop for staff on new digital banking features, customer support protocols, and compliance requirements.",
  date: "22 March",
  location: "Online",
  coverImage: workshopBanner.src,
  organizers: [
    {
      name: "Thandiwe Nkosi",
      avatar:
        "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    },
    {
      name: "James Okafor",
      avatar:
        "https://images.pexels.com/photos/3783725/pexels-photo-3783725.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    },
  ],
  href: "/events/digital-banking-skills-workshop",
};

const upcomingEvents: EventCardData[] = [
  {
    id: "evt-1",
    title: "The Compound Effect Conference",
    description:
      "A multi-session event focused on how small, consistent financial decisions compound over time to create lasting wealth.",
    date: "28 March 2026",
    location: "Johannesburg",
    category: "Online",
    coverImage:
      "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    organizers: [
      {
        name: "Amara Diallo",
        avatar:
          "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      },
      {
        name: "Sipho Dlamini",
        avatar:
          "https://images.pexels.com/photos/3783725/pexels-photo-3783725.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      },
    ],
    href: "/events/compound-effect-conference",
  },
  {
    id: "evt-2",
    title: "The Wealth Blueprint",
    description:
      "A hands-on workshop guiding participants through building a personalized financial roadmap — from budgeting basics to long-term investment strategies.",
    date: "28 March 2026",
    location: "Johannesburg",
    category: "Workshop",
    coverImage:
      "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    organizers: [
      {
        name: "Kwame Asante",
        avatar:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      },
    ],
    href: "/events/wealth-blueprint",
  },
  {
    id: "evt-3",
    title: "MoneyMind Summit",
    description:
      "A full-day event exploring the psychology of money, helping attendees break limiting beliefs and develop a wealth-driven mindset.",
    date: "28 March 2026",
    location: "Johannesburg",
    category: "Online",
    coverImage:
      "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    organizers: [
      {
        name: "Nadia Ferreira",
        avatar:
          "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      },
    ],
    href: "/events/moneymind-summit",
  },
];

const eventSummaryRows: EventSummaryRow[] = [
  {
    id: "es-1",
    eventName: "The Compound Effect Conference",
    engagementScore: 80,
    leadsGenerated: 65,
    revenueGenerated: "R 1 000 234.01",
    href: "/events/compound-effect-conference",
  },
  {
    id: "es-2",
    eventName: "Capital Clarity",
    engagementScore: 27,
    leadsGenerated: 47,
    revenueGenerated: "R 2 452 100.95",
    href: "/events/capital-clarity",
  },
  {
    id: "es-3",
    eventName: "ProsperLab",
    engagementScore: 68,
    leadsGenerated: 0,
    revenueGenerated: "R 1 000 234.01",
    href: "/events/prosperlab",
  },
  {
    id: "es-4",
    eventName: "The Wealth Blueprint",
    engagementScore: 89,
    leadsGenerated: "08",
    revenueGenerated: "-R 2 452 100.95",
    href: "/events/wealth-blueprint",
  },
  {
    id: "es-5",
    eventName: "MoneyMind Summit",
    engagementScore: 90,
    leadsGenerated: 24,
    revenueGenerated: "R 2 452 100.95",
    href: "/events/moneymind-summit",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <MainLayout>
      {/* ── Welcome Banner ── */}
      <div
        className="relative w-full bg-primary-dark overflow-hidden"
        style={{
          backgroundImage: `url(${dashboardBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      >
        <div className="page-container py-10 md:py-14">
          <p className="text-white/90 text-base md:text-lg font-normal">
            Welcome back
          </p>
          <h1 className="text-white text-3xl md:text-4xl font-medium mt-1 mb-8">
            Ashley!
          </h1>

          <div className="flex flex-wrap gap-3">
            {quickActions.map(({ id, label, href, Icon }) => (
              <Link
                key={id}
                href={href}
                className="inline-flex items-center gap-2.5 bg-white text-neutral-900 text-sm font-normal px-5 py-3.5 rounded-lg hover:bg-neutral-100 transition-colors shadow-sm"
              >
                <Icon
                  className="h-5 w-5 text-primary shrink-0"
                  strokeWidth={1.5}
                />
                {label}
              </Link>
            ))}
          </div>
          {/* ── Overview Cards ── */}
          <section className="mt-10 md:mt-14">
            <h2 className="text-xl font-medium text-white mb-5">
              Overview of March
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {overviewCards.map((card) => (
                <OverviewCard key={card.id} card={card} />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ── Page Body ── */}
      <div className="page-container py-10 space-y-12">
        {/* ── Overview Cards ── */}
        <section>
          <h2 className="text-xl font-medium text-neutral-900 mb-5">
            Overview of March
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {overviewCards.map((card) => (
              <OverviewCard key={card.id} card={card} />
            ))}
          </div>
        </section>

        {/* ── Upcoming Events ── */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-neutral-900">
              Upcoming Events
            </h2>
            <Link
              href="/events"
              className="border border-primary text-primary text-xs font-bold uppercase tracking-wider px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
            >
              VIEW ALL
            </Link>
          </div>

          {/* Featured hero event */}
          <FeaturedEventCard event={featuredEvent} />

          {/* Events grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* ── Event Summary ── */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-neutral-900">
              Event Summary
            </h2>
            <Link
              href="/insights"
              className="border border-primary text-primary text-xs font-bold uppercase tracking-wider px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
            >
              VIEW INSIGHTS
            </Link>
          </div>
          <EventSummaryTable rows={eventSummaryRows} />
        </section>
      </div>
    </MainLayout>
  );
}
