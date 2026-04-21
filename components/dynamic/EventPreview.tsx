"use client";

import * as React from "react";
import { CalendarDays, Clock, MapPin, ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { SpeakerCard, type SpeakerCardData } from "@/components/dynamic/SpeakerCard";
import { AgendaTable, type AgendaRowData } from "@/components/dynamic/AgendaTable";
import type { BasicDetailsForm } from "@/components/dynamic/NewEventForm";
import type { Speaker } from "@/components/dynamic/SpeakersStep";
import type { Session } from "@/components/dynamic/AgendaStep";
import type { CoverImageData } from "@/components/dynamic/CoverImageStep";

interface EventPreviewProps {
  basicDetails: BasicDetailsForm;
  speakers: Speaker[];
  sessions: Session[];
  coverImage: CoverImageData;
  onBack: () => void;
  onPublish: () => void;
}

// --- Mock fallback data ---

const MOCK_BIO =
  "A Johannesburg-based entrepreneur who built her catering business from scratch at 24. Thandiwe believes that financial freedom starts in the kitchen — and in the mind.";

const MOCK_SPEAKERS: SpeakerCardData[] = [
  {
    id: "mock-1",
    name: "Thandiwe Nkosi",
    bio: MOCK_BIO,
    link: "#",
    photoSrc:
      "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400&h=560&fit=crop",
  },
  {
    id: "mock-2",
    name: "Thandiwe Nkosi",
    bio: MOCK_BIO,
    link: "#",
    photoSrc:
      "https://images.pexels.com/photos/3783725/pexels-photo-3783725.jpeg?auto=compress&cs=tinysrgb&w=400&h=560&fit=crop",
  },
];

const MOCK_AGENDA: AgendaRowData[] = [
  { id: "m1", session: "Introduction", description: "Intro by host", speaker: "N/A", date: "23 March 2026", time: "13:00-13:15" },
  { id: "m2", session: "Session 1", description: "The Wealth Blueprint", speaker: "Thandiwe Nkosi", date: "23 March 2026", time: "13:00-13:15" },
  { id: "m3", session: "Break", description: "Cafeteria", speaker: "N/A", date: "23 March 2026", time: "13:00-13:15" },
  { id: "m4", session: "Session 2", description: "The Wealth Blueprint", speaker: "Thandiwe Nkosi", date: "23 March 2026", time: "13:00-13:15" },
  { id: "m5", session: "Networking", description: "Conference hall", speaker: "N/A", date: "23 March 2026", time: "14:00" },
];

// --- Data normalizers ---

function normalizeSpeakers(speakers: Speaker[]): SpeakerCardData[] {
  return speakers
    .filter((s) => s.firstName || s.lastName)
    .map((s) => ({
      id: s.id,
      name: [s.title?.label, s.firstName, s.lastName].filter(Boolean).join(" "),
      bio: s.bio || undefined,
      link: s.link || undefined,
      photoSrc: s.file?.dataUrl || undefined,
    }));
}

function normalizeSessions(sessions: Session[]): AgendaRowData[] {
  return sessions
    .filter((s) => s.name)
    .map((s) => ({
      id: s.id,
      session: s.name,
      description: s.description,
      speaker: s.speaker?.label || "N/A",
      date: s.date ? format(s.date, "d MMMM yyyy") : "—",
      time:
        s.startTime && s.endTime
          ? `${s.startTime}-${s.endTime}`
          : s.startTime || s.endTime || "—",
    }));
}

// --- Component ---

export function EventPreview({
  basicDetails,
  speakers,
  sessions,
  coverImage,
  onBack,
  onPublish,
}: EventPreviewProps) {
  const { eventName, description, date, startTime, endTime, location, meetingLink } = basicDetails;

  const locationLabel = location || meetingLink?.label || null;
  const timeRange =
    startTime && endTime ? `${startTime} - ${endTime}` : startTime || endTime || null;

  const speakerCards = normalizeSpeakers(speakers);
  const agendaRows = normalizeSessions(sessions);

  const displaySpeakers = speakerCards.length > 0 ? speakerCards : MOCK_SPEAKERS;
  const displayAgenda = agendaRows.length > 0 ? agendaRows : MOCK_AGENDA;

  return (
    <div>
      {/* Hero cover image */}
      <div className="w-full h-64 md:h-[420px] overflow-hidden bg-neutral-200">
        {coverImage.file?.dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage.file.dataUrl}
            alt="Event cover"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-100">
            <ImageIcon className="h-14 w-14 text-neutral-300" />
          </div>
        )}
      </div>

      {/* Page content */}
      <div className="page-container py-10 space-y-10">

        {/* Title + metadata */}
        <div className="space-y-3 pb-6">
          <h1 className="text-2xl md:text-[28px] text-neutral-900">
            {eventName || "The Wealth Blueprint Summit"}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-neutral-900 md:text-base">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 shrink-0" />
              {date ? format(date, "d MMMM") : "23 March 2026"}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 shrink-0" />
              {timeRange || "13:00 - 17:00"}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0" />
              {locationLabel || "Conference Hall, Johannesburg"}
            </span>
          </div>
        </div>

        {/* Brief */}
        <div className="space-y-3 md:max-w-2xl">
          <h2 className="text-base md:text-xl font-medium text-neutral-900">Brief</h2>
          <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
            {description ||
              "A transformative one-day event designed to empower entrepreneurs and professionals with the financial tools, mindset strategies, and network connections needed to build lasting wealth."}
          </p>
        </div>

        {/* Who It's For */}
        <div className="space-y-3 md:max-w-2xl">
          <h2 className="text-base md:text-xl font-medium text-neutral-900">Who It&apos;s For</h2>
          <ul className="space-y-2">
            {[
              "Young professionals starting to take control of their finances",
              "Individuals looking to break the paycheck-to-paycheck cycle",
              "Aspiring investors who want to grow wealth steadily and sustainably",
              "Anyone who feels behind financially and wants a clear path forward",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-700 md:text-base">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-700" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Speakers */}
        <div className="space-y-5">
          <h2 className="text-base md:text-xl font-medium text-neutral-900">Speakers</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displaySpeakers.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
        </div>

        {/* Agenda */}
        <div className="space-y-5">
          <h2 className="text-base md:text-xl font-medium text-neutral-900">Agenda</h2>
          <AgendaTable rows={displayAgenda} />
        </div>

        {/* Bottom navigation */}
        <div className="rounded-xl border border-neutral-300 bg-white px-6 py-4 shadow-sm flex items-center justify-between">
          <Button variant="primarySoft" onClick={onBack} className="text-primary bg-transparent">
            BACK
          </Button>
          <Button onClick={onPublish} className="min-w-28">
            PUBLISH
          </Button>
        </div>

      </div>
    </div>
  );
}
