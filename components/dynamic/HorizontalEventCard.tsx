"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ChevronRight, ImageOff } from "lucide-react";
import avatarFallback from "@/assets/images/icons/icn_people_profile_primary.png";

export interface HorizontalEventCardData {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  coverImage?: string;
  organizers: { name: string; avatar: string }[];
  href: string;
}

interface HorizontalEventCardProps {
  event: HorizontalEventCardData;
  ctaLabel?: string;
}

export function HorizontalEventCard({
  event,
  ctaLabel = "READ MORE",
}: HorizontalEventCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col sm:flex-row border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
      {/* Content */}
      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="text-lg md:text-[28px] text-neutral-900 leading-snug line-clamp-2">
            {event.title}
          </h3>
          <p className="text-sm text-neutral-900 leading-relaxed line-clamp-2 mt-3">
            {event.description}
          </p>

          {/* Organizer avatars */}
          {event.organizers.length > 0 && (
            <div className="flex gap-0.5 mt-4">
              {event.organizers.map((org, i) => (
                <div key={i} className="relative h-10 w-10 shrink-0">
                  <Image
                    src={org.avatar || avatarFallback}
                    alt={org.name}
                    title={org.name}
                    fill
                    className="rounded-full border-2 border-white object-cover bg-neutral-200"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-2 text-sm md:text-base font-medium text-neutral-900">
              <CalendarDays className="h-5 w-5 shrink-0 text-neutral-900" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base font-medium text-neutral-900">
              <MapPin className="h-5 w-5 shrink-0 text-neutral-900" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>

        <Link
          href={event.href}
          className="flex items-center gap-1 text-sm font-bold text-primary-medium uppercase tracking-wide hover:underline underline-offset-4 mt-10"
        >
          {ctaLabel}
          <ChevronRight className="h-5 w-5 -mt-1" />
        </Link>
      </div>

      {/* Image — consistent fixed height across all breakpoints */}
      <div className="relative sm:w-[260px] md:w-[340px] lg:w-[420px] shrink-0 h-52 sm:h-auto order-first sm:order-last">
        {event.coverImage ? (
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 260px, (max-width: 1024px) 340px, 420px"
          />
        ) : (
          <div className="h-full w-full bg-neutral-100 flex flex-col items-center justify-center gap-2 text-neutral-400">
            <ImageOff className="h-10 w-10" strokeWidth={1.5} />
            <span className="text-xs">No image available</span>
          </div>
        )}
      </div>
    </div>
  );
}
