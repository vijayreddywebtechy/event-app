"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, CalendarClock, ChevronRight, ImageOff } from "lucide-react";
import avatarFallback from "@/assets/images/icons/icn_people_profile_primary.png";

export interface EventOrganizer {
  name: string;
  avatar: string;
}

export interface EventCardData {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  coverImage?: string;
  organizers: EventOrganizer[];
  href: string;
}

interface EventCardProps {
  event: EventCardData;
  ctaLabel?: string;
}

export function EventCard({ event, ctaLabel = "Manage Event" }: EventCardProps) {
  return (
    <div className="relative flex flex-col rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow mt-4">
      {/* Category badge — half outside top-left */}
      <span className="absolute top-0 left-0 -translate-y-1/2 z-10 bg-primary-dark text-white text-xs font-medium px-4 min-w-24 py-1 rounded-br-xl">
        {event.category}
      </span>

      {/* Image */}
      <div className="relative">
        <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-neutral-100">
          {event.coverImage ? (
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center gap-2 text-neutral-400">
              <ImageOff className="h-10 w-10" strokeWidth={1.5} />
              <span className="text-xs">No image available</span>
            </div>
          )}
        </div>

        {/* Organizer avatars */}
        <div className="absolute -bottom-5 left-4 md:left-10 flex gap-0.5">
          {event.organizers.map((org, i) => (
            <div key={i} className="relative h-10 w-10 shrink-0">
              <Image
                src={org.avatar || avatarFallback}
                alt={org.name}
                title={org.name}
                fill
                className="rounded-full border-2 border-white object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 py-8 px-4 md:px-10">
        <h3 className="text-lg md:text-[28px] text-neutral-900 leading-snug line-clamp-2">
          {event.title}
        </h3>
        <p className="text-sm text-neutral-900 leading-relaxed line-clamp-3 flex-1 mt-3">
          {event.description}
        </p>

        <div className="space-y-1.5 mt-8">
          <div className="flex items-center gap-2 text-sm md:text-base font-medium text-neutral-900">
            <CalendarDays className="h-5 w-5 shrink-0 text-neutral-900" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-base font-medium text-neutral-900">
            <MapPin className="h-5 w-5 shrink-0 text-neutral-900" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-10">
          <Link
            href={event.href}
            className="flex items-center gap-1 text-sm font-bold text-primary-medium uppercase tracking-wide hover:underline underline-offset-4"
          >
            {ctaLabel}
            <ChevronRight className="h-5 w-5 -mt-1" />
          </Link>
          <CalendarClock className="h-7 w-7 text-primary-medium" strokeWidth={1} />
        </div>
      </div>
    </div>
  );
}
