import Link from "next/link";
import avatarFallback from "@/assets/images/icons/icn_people_profile_primary.png";
import { CalendarDays, MapPin, ChevronRight } from "lucide-react";

export interface FeaturedEventOrganizer {
  name: string;
  avatar: string;
}

export interface FeaturedEventCardData {
  title: string;
  description: string;
  date: string;
  location: string;
  coverImage: string;
  organizers: FeaturedEventOrganizer[];
  href: string;
  ctaLabel?: string;
}

interface FeaturedEventCardProps {
  event: FeaturedEventCardData;
  height?: string;
  ctaButton?: boolean;
  fullWidth?: boolean;
}

export function FeaturedEventCard({
  event,
  height = "h-[280px] md:h-[380px]",
  ctaButton = false,
  fullWidth = false,
}: FeaturedEventCardProps) {
  return (
    <div className={`relative w-full overflow-hidden ${fullWidth ? "" : "rounded-xl"} ${height}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={event.coverImage}
        alt={event.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/10" />

      <div className={`relative flex flex-col justify-between h-full ${fullWidth ? "page-container py-6 md:py-8" : "p-6 md:p-8"}`}>
        <div className="flex-1 flex flex-col justify-center gap-4">
          <div className="flex gap-1.5">
            {event.organizers.map((org, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={org.avatar || avatarFallback.src}
                alt={org.name}
                title={org.name}
                className="h-9 w-9 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <div>
            <h3 className="text-xl md:text-[28px] text-white leading-snug max-w-xl">
              {event.title}
            </h3>
            <p className="text-sm md:text-base text-white/90 max-w-2xl leading-relaxed line-clamp-2 mt-2">
              {event.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-white mt-3">
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
        </div>

        {ctaButton ? (
          <Link
            href={event.href}
            className="inline-flex items-center gap-1 text-sm font-bold rounded bg-white text-primary-medium px-5 py-2 uppercase tracking-wide border border-primary-medium hover:bg-primary hover:text-white transition-colors w-fit"
          >
            {event.ctaLabel ?? "JOIN NOW"}
          </Link>
        ) : (
          <Link
            href={event.href}
            className="inline-flex items-center gap-1 text-sm font-bold text-white uppercase tracking-wide hover:underline underline-offset-4 w-fit"
          >
            {event.ctaLabel ?? "MANAGE EVENT"}
            <ChevronRight className="h-5 w-5 -mt-0.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
