"use client";

import { useState } from "react";
import {
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  X,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import {
  FeaturedEventCard,
  type FeaturedEventCardData,
} from "@/components/dynamic/FeaturedEventCard";
import { EventCard, type EventCardData } from "@/components/dynamic/EventCard";
import {
  HorizontalEventCard,
  type HorizontalEventCardData,
} from "@/components/dynamic/HorizontalEventCard";

import workshopBanner from "@/assets/images/background/workshop_event_banner.png";
import dashboardBg from "@/assets/images/background/dashboard_welcome_banner_bg.png";
import bgOne from "@/assets/images/background/bg_one.png";
import profileIcon from "@/assets/images/icons/icn_people_profile.svg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const featuredEvent: FeaturedEventCardData = {
  title: "Digital Banking Skills Workshop",
  description:
    "Comprehensive training workshop for staff on new digital banking features, customer support protocols, and compliance requirements.",
  date: "22 March",
  location: "Online",
  coverImage: workshopBanner.src,
  organizers: [
    { name: "Sarah Johnson", avatar: profileIcon.src },
    { name: "Mike Chen", avatar: profileIcon.src },
  ],
  href: "/attendee/events/preview",
  ctaLabel: "JOIN NOW",
};

const TOPIC_FILTERS = [
  "Topic 1",
  "Topic 4",
  "Topic 3",
  "Topic 5",
  "Topic 6",
  "Topic 7",
  "Topic 8",
];

const EVENT_IMAGES = [workshopBanner.src, bgOne.src, dashboardBg.src];

const allListEvents: HorizontalEventCardData[] = Array.from(
  { length: 9 },
  (_, i) => ({
    id: String(i + 1),
    title: "The Compound Effect Conference",
    description:
      "A multi-session event focused on how small, consistent financial decisions compound over time to create lasting wealth.",
    date: "28 march 2026",
    location: "Johannesburg",
    coverImage: EVENT_IMAGES[i % 3],
    organizers: [
      { name: "Sarah Johnson", avatar: profileIcon.src },
      { name: "Mike Chen", avatar: profileIcon.src },
    ],
    href: "/attendee/events/preview",
  }),
);

const topicBasedEvents: EventCardData[] = [
  {
    id: "t1",
    title: "The Compound Effect Conference",
    description:
      "A multi-session event focused on how small, consistent financial decisions compound over time to create lasting wealth.",
    date: "28 march 2026",
    location: "Johannesburg",
    category: "Online",
    coverImage: bgOne.src,
    organizers: [
      { name: "Sarah Johnson", avatar: profileIcon.src },
      { name: "Mike Chen", avatar: profileIcon.src },
    ],
    href: "/attendee/events/preview",
  },
  {
    id: "t2",
    title: "The Wealth Blueprint",
    description:
      "A hands-on workshop guiding participants through building a personalized financial roadmap — from budgeting basics to long-term investment strategies.",
    date: "28 march 2026",
    location: "Johannesburg",
    category: "Workshop",
    coverImage: dashboardBg.src,
    organizers: [{ name: "Sarah Johnson", avatar: profileIcon.src }],
    href: "/attendee/events/preview",
  },
  {
    id: "t3",
    title: "MoneyMind Summit",
    description:
      "A full-day event exploring the psychology of money, helping attendees break limiting beliefs and develop a wealth-driven mindset.",
    date: "28 march 2026",
    location: "Johannesburg",
    category: "Online",
    coverImage: workshopBanner.src,
    organizers: [{ name: "Sarah Johnson", avatar: profileIcon.src }],
    href: "/attendee/events/preview",
  },
];

const specificForYouEvents: EventCardData[] = [
  {
    id: "s1",
    title: "The Compound Effect Conference",
    description:
      "A multi-session event focused on how small, consistent financial decisions compound over time to create lasting wealth.",
    date: "28 march 2026",
    location: "Johannesburg",
    category: "Online",
    coverImage: bgOne.src,
    organizers: [
      { name: "Sarah Johnson", avatar: profileIcon.src },
      { name: "Mike Chen", avatar: profileIcon.src },
    ],
    href: "/attendee/events/preview",
  },
  {
    id: "s2",
    title: "The Wealth Blueprint",
    description:
      "A hands-on workshop guiding participants through building a personalized financial roadmap — from budgeting basics to long-term investment strategies.",
    date: "28 march 2026",
    location: "Johannesburg",
    category: "Workshop",
    coverImage: dashboardBg.src,
    organizers: [{ name: "Sarah Johnson", avatar: profileIcon.src }],
    href: "/attendee/events/preview",
  },
];

const ITEMS_PER_PAGE = 3;

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AttendeeEventsPage() {
  const [search, setSearch] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["Topic 7"]);
  const [currentPage, setCurrentPage] = useState(1);

  function toggleTopic(topic: string) {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
    setCurrentPage(1);
  }

  function handleSearch(val: string) {
    setSearch(val);
    setCurrentPage(1);
  }

  const filtered = allListEvents.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <MainLayout>
      {/* Hero — full-width banner */}
      <FeaturedEventCard
        event={featuredEvent}
        height="h-[300px] md:h-[380px]"
        ctaButton
        fullWidth
      />

      {/* All Events */}
      <section className="page-container py-10 md:py-14">
        <h2 className="text-2xl font-medium text-secondary mb-6">All Events</h2>

        {/* Search */}
        <div className="flex overflow-hidden rounded-xl border border-neutral-300 bg-white transition-colors hover:border-primary focus-within:border-primary mb-5">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Enter your search here"
            className="flex-1 bg-transparent px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-500 outline-none"
          />
          <button
            type="button"
            aria-label="Search"
            className="flex items-center justify-center bg-primary-medium px-4 text-white hover:bg-primary/90 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Topic chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TOPIC_FILTERS.map((topic) => {
            const active = selectedTopics.includes(topic);
            return (
              <button
                key={topic}
                type="button"
                onClick={() => toggleTopic(topic)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-colors border ${
                  active
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-primary border-primary hover:border-primary hover:text-primary"
                }`}
              >
                {topic}
                {active && (
                  <span className="inline-flex items-center justify-center h-4 w-4 rounded-full border border-white text-white">
                    <X className="h-3 w-3" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Event list */}
        <div className="space-y-4">
          {paginated.map((event) => (
            <HorizontalEventCard
              key={event.id}
              event={event}
              ctaLabel="READ MORE"
            />
          ))}

          {paginated.length === 0 && (
            <p className="text-neutral-900 text-base py-8 text-center">
              No events found.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 mt-8">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-2 text-neutral-500 disabled:opacity-40 hover:text-primary transition-colors"
              aria-label="First page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 text-neutral-500 disabled:opacity-40 hover:text-primary transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 text-sm rounded transition-colors ${
                  currentPage === page
                    ? "bg-primary text-white font-medium"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-neutral-500 disabled:opacity-40 hover:text-primary transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 text-neutral-500 disabled:opacity-40 hover:text-primary transition-colors"
              aria-label="Last page"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </section>

      {/* Topic Based + Specifically for You */}
      <section className="bg-primary-medium py-10">
        <div className="page-container space-y-12">
          {/* Topic Based Events */}
          <div>
            <h2 className="text-xl font-medium text-white mb-6">
              Topic Based Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topicBasedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  ctaLabel="FIND OUT MORE"
                />
              ))}
            </div>
          </div>

          {/* Specifically for You */}
          <div>
            <h2 className="text-xl font-medium text-white mb-6">
              Specifically for you
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {specificForYouEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  ctaLabel="FIND OUT MORE"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
