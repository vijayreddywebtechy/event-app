import { Info } from "lucide-react";
import { CalendarDays, MapPin } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import {
  SpeakerCard,
  type SpeakerCardData,
} from "@/components/dynamic/SpeakerCard";
import { EventCard, type EventCardData } from "@/components/dynamic/EventCard";

import workshopBanner from "@/assets/images/background/workshop_event_banner.png";
import bgOne from "@/assets/images/background/bg_one.png";
import dashboardBg from "@/assets/images/background/dashboard_welcome_banner_bg.png";
import profileIcon from "@/assets/images/icons/icn_people_profile.svg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const event = {
  title: "Digital Banking Skills Workshop",
  date: "22 March",
  location: "Online",
  coverImage: workshopBanner.src,
  overview:
    "The Compound Effect Conference is a transformative multi-session event built around one powerful idea: that small, consistent financial decisions — made daily — compound over time into extraordinary wealth. Whether you're just starting your financial journey or looking to accelerate your existing strategy, this conference gives you the tools, mindset, and community to make every dollar work harder.",
  whoItsFor: [
    "Young professionals starting to take control of their finances",
    "Individuals looking to break the paycheck-to-paycheck cycle",
    "Aspiring investors who want to grow wealth steadily and sustainably",
    "Anyone who feels behind financially and wants a clear path forward",
  ],
};

const speaker: SpeakerCardData = {
  id: "sp1",
  name: "Thandiwe Nkosi",
  bio: "A Johannesburg-based entrepreneur who built her catering business from scratch at 24. Thandiwe believes that financial freedom starts in the kitchen — and in the mind.",
  photoSrc: profileIcon.src,
  link: "#",
};

const similarEvents: EventCardData[] = [
  {
    id: "se1",
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
    href: "/attendee/preview",
  },
  {
    id: "se2",
    title: "The Wealth Blueprint",
    description:
      "A hands-on workshop guiding participants through building a personalized financial roadmap — from budgeting basics to long-term investment strategies.",
    date: "28 march 2026",
    location: "Johannesburg",
    category: "Workshop",
    coverImage: dashboardBg.src,
    organizers: [{ name: "Sarah Johnson", avatar: profileIcon.src }],
    href: "/attendee/preview",
  },
  {
    id: "se3",
    title: "MoneyMind Summit",
    description:
      "A full-day event exploring the psychology of money, helping attendees break limiting beliefs and develop a wealth-driven mindset.",
    date: "28 march 2026",
    location: "Johannesburg",
    category: "Online",
    coverImage: workshopBanner.src,
    organizers: [{ name: "Sarah Johnson", avatar: profileIcon.src }],
    href: "/attendee/preview",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function EventPreviewPage() {
  return (
    <MainLayout>
      {/* Hero Banner */}
      <div className="w-full h-[280px] md:h-[380px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.coverImage}
          alt={event.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Title + Register row */}
      <div className="page-container py-8 flex flex-col sm:flex-row sm:items-start gap-6">
        {/* Left: title + meta */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-medium text-neutral-900 leading-snug">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-neutral-700 mt-3">
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

        {/* Right: register */}
        <div className="shrink-0 flex flex-col items-start gap-2">
          <button
            type="button"
            className="bg-primary text-white text-sm font-medium uppercase tracking-widest px-10 py-3 rounded hover:bg-primary-dark transition-colors"
          >
            REGISTER
          </button>
          <span className="flex items-center gap-1.5 text-xs text-neutral-500">
            <Info className="h-3.5 w-3.5 shrink-0" />
            Limited slot only
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="page-container pb-12 space-y-10">
        {/* Overview */}
        <div>
          <h2 className="text-base font-bold text-neutral-900 mb-3">
            Overview
          </h2>
          <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
            {event.overview}
          </p>
        </div>

        {/* Who It's For */}
        <div>
          <h2 className="text-base font-bold text-neutral-900 mb-3">
            Who It&apos;s For
          </h2>
          <ul className="space-y-2">
            {event.whoItsFor.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm md:text-base text-neutral-700"
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-neutral-700 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Speaker */}
        <div>
          <h2 className="text-base font-bold text-neutral-900 mb-5">Speaker</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <SpeakerCard speaker={speaker} />
          </div>
        </div>
      </div>

      {/* Similar Events */}
      <div className="page-container pb-14">
        <h2 className="text-xl font-medium text-neutral-900 mb-6">
          Similar events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarEvents.map((ev) => (
            <EventCard key={ev.id} event={ev} ctaLabel="MANAGE EVENT" />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
