"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  CalendarDays,
  MapPin,
} from "lucide-react";
import type { SingleValue, MultiValue, ActionMeta } from "react-select";
import MainLayout from "@/components/layout/MainLayout";
import {
  FeaturedEventCard,
  type FeaturedEventCardData,
} from "@/components/dynamic/FeaturedEventCard";
import { EventCard, type EventCardData } from "@/components/dynamic/EventCard";
import CustomSelect, { type SelectOption } from "@/components/dynamic/CustomSelect";

import workshopBanner from "@/assets/images/background/workshop_event_banner.png";
import dashboardBg from "@/assets/images/background/dashboard_welcome_banner_bg.png";
import bgOne from "@/assets/images/background/bg_one.png";
import profileIcon from "@/assets/images/icons/icn_people_profile.svg";

const TOPIC_OPTIONS: SelectOption[] = [
  { value: "finance", label: "Finance" },
  { value: "technology", label: "Technology" },
  { value: "banking", label: "Banking" },
];

const SORT_OPTIONS: SelectOption[] = [
  { value: "date", label: "Date" },
  { value: "name", label: "Name" },
];

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
  href: "/events/digital-banking-skills-workshop",
  ctaLabel: "JOIN NOW",
};

const eventsForYou: EventCardData[] = [
  {
    id: "1",
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
    href: "/events/compound-effect-conference",
  },
  {
    id: "2",
    title: "The Wealth Blueprint",
    description:
      "A hands-on workshop guiding participants through building a personalized financial roadmap — from budgeting basics to long-term investment strategies.",
    date: "28 march 2026",
    location: "Johannesburg",
    category: "Workshop",
    coverImage: dashboardBg.src,
    organizers: [
      { name: "Sarah Johnson", avatar: profileIcon.src },
    ],
    href: "/events/wealth-blueprint",
  },
  {
    id: "3",
    title: "MoneyMind Summit",
    description:
      "A full-day event exploring the psychology of money, helping attendees break limiting beliefs and develop a wealth-driven mindset.",
    date: "28 march 2026",
    location: "Johannesburg",
    category: "Online",
    coverImage: workshopBanner.src,
    organizers: [
      { name: "Sarah Johnson", avatar: profileIcon.src },
    ],
    href: "/events/moneymind-summit",
  },
];

interface UpcomingEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  coverImage: string;
  organizers: { name: string; avatar: string }[];
  href: string;
}

const EVENT_IMAGES = [workshopBanner.src, bgOne.src, dashboardBg.src];

const allUpcomingEvents: UpcomingEvent[] = Array.from({ length: 9 }, (_, i) => ({
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
  href: `/events/upcoming-${i + 1}`,
}));

const ITEMS_PER_PAGE = 3;

export default function AttendeeDashboard() {
  const [search, setSearch] = useState("");
  const [filterTopic, setFilterTopic] = useState<SelectOption | null>(null);
  const [sortBy, setSortBy] = useState<SelectOption | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = allUpcomingEvents.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function handleSearch(val: string) {
    setSearch(val);
    setCurrentPage(1);
  }

  function handleTopicChange(
    newValue: SingleValue<SelectOption> | MultiValue<SelectOption>,
    _meta: ActionMeta<SelectOption>
  ) {
    setFilterTopic(newValue as SingleValue<SelectOption>);
    setCurrentPage(1);
  }

  function handleSortChange(
    newValue: SingleValue<SelectOption> | MultiValue<SelectOption>,
    _meta: ActionMeta<SelectOption>
  ) {
    setSortBy(newValue as SingleValue<SelectOption>);
  }

  return (
    <MainLayout>
      {/* Hero — full-width banner */}
      <FeaturedEventCard
        event={featuredEvent}
        height="h-[300px] md:h-[450px]"
        ctaButton
        fullWidth
      />

      {/* Events for You */}
      <section className="page-container py-8 md:py-12">
        <p className="text-sm text-neutral-500">Event to you</p>
        <h2 className="text-3xl font-medium text-secondary mt-1 mb-8 md:mb-10">
          John Smith
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsForYou.map((event) => (
            <EventCard key={event.id} event={event} ctaLabel="FIND OUT MORE" />
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-primary-medium py-10 mt-4">
        <div className="page-container">
          <h2 className="text-2xl font-medium text-white mb-6">
            Upcoming Events
          </h2>

          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Search — matches CampaignsView pattern */}
            <div className="flex flex-1 overflow-hidden rounded-lg border border-neutral-300 bg-white transition-colors hover:border-primary focus-within:border-primary">
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Enter your search here"
                className="flex-1 bg-transparent px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-500 outline-none"
              />
              <button
                type="button"
                aria-label="Search"
                className="flex items-center justify-center bg-primary px-4 text-white hover:bg-primary/90 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>

            <div className="sm:w-[180px]">
              <CustomSelect
                options={TOPIC_OPTIONS}
                value={filterTopic}
                onChange={handleTopicChange}
                placeholder="Filter by topic"
                transparentMenu={false}
              />
            </div>

            <div className="sm:w-[150px]">
              <CustomSelect
                options={SORT_OPTIONS}
                value={sortBy}
                onChange={handleSortChange}
                placeholder="Sort by"
                transparentMenu={false}
              />
            </div>
          </div>

          {/* Event List */}
          <div className="space-y-4">
            {paginated.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl overflow-hidden flex flex-col sm:flex-row"
              >
                <div className="flex-1 p-6 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="text-lg md:text-xl font-medium text-neutral-900">
                      {event.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="flex -space-x-2 mt-4">
                      {event.organizers.map((org, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={i}
                          src={org.avatar}
                          alt={org.name}
                          title={org.name}
                          className="h-8 w-8 rounded-full border-2 border-white object-cover bg-neutral-200"
                        />
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-neutral-900 mt-3">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4 shrink-0" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 shrink-0" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={event.href}
                    className="inline-flex items-center gap-1 text-sm font-bold text-primary-medium uppercase tracking-wide hover:underline underline-offset-4 mt-5"
                  >
                    READ MORE
                    <ChevronRight className="h-4 w-4 -mt-0.5" />
                  </Link>
                </div>
                <div className="sm:w-[260px] md:w-[320px] shrink-0 bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={event.coverImage}
                    alt={event.title}
                    className="h-48 sm:h-full w-full object-cover"
                  />
                </div>
              </div>
            ))}

            {paginated.length === 0 && (
              <p className="text-white/80 text-sm py-8 text-center">
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
                className="p-2 text-white disabled:opacity-40 hover:text-white/80 transition-opacity"
                aria-label="First page"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 text-white disabled:opacity-40 hover:text-white/80 transition-opacity"
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
                      ? "bg-white text-primary-medium font-medium"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-white disabled:opacity-40 hover:text-white/80 transition-opacity"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 text-white disabled:opacity-40 hover:text-white/80 transition-opacity"
                aria-label="Last page"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
