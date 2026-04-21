import Link from "next/link";
import { Plus } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { EventCard, type EventCardData } from "@/components/dynamic/EventCard";
import { FeaturedEventCard } from "@/components/dynamic/FeaturedEventCard";
import workshopBanner from "@/assets/images/background/workshop_event_banner.png";

// ─── Data ────────────────────────────────────────────────────────────────────

const featuredEvent = {
  id: "featured-1",
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

const allEvents: EventCardData[] = [
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

const upcomingEvents: EventCardData[] = allEvents;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EventsPage() {
  return (
    <MainLayout>
      <div className="page-container py-12 space-y-8">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-neutral-900">All Events</h1>
          <Link
            href="/events/new"
            className="inline-flex items-center gap-1.5 border border-primary text-primary text-sm font-bold uppercase tracking-wide px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
          >
            <Plus className="h-5 w-5" />
            Create an Event
          </Link>
        </div>

        {/* Featured / hero event */}
        <FeaturedEventCard event={featuredEvent} height="h-auto md:h-[436px]" />

        {/* All events grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
          {allEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Upcoming events */}
        <section className="space-y-5">
          <h2 className="text-xl font-medium text-neutral-900">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
