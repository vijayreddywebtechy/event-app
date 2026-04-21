"use client";

import * as React from "react";
import { QrCode, UserCircle2, Plus, Info } from "lucide-react";
import Image from "next/image";
import bgOne from "@/assets/images/background/bg_one.png";

interface Guest {
  id: string;
  name: string;
  email: string;
}

interface CheckedInGuest extends Guest {
  checkedInAt: string;
}

const MOCK_GUESTS: Guest[] = Array.from({ length: 16 }, (_, i) => ({
  id: `g${i + 1}`,
  name: "Full Name",
  email: "Username@company.name",
}));

export default function QRCheckInView() {
  const [guests, setGuests] = React.useState<Guest[]>(MOCK_GUESTS);
  const [checkedIn, setCheckedIn] = React.useState<CheckedInGuest[]>([
    {
      id: "c1",
      name: "Full Name",
      email: "Username@company.name",
      checkedInAt: "12:33:00,  March 24 2026",
    },
    {
      id: "c2",
      name: "Full Name",
      email: "Username@company.name",
      checkedInAt: "12:33:00,  March 24 2026",
    },
    {
      id: "c3",
      name: "Full Name",
      email: "Username@company.name",
      checkedInAt: "12:33:00,  March 24 2026",
    },
    {
      id: "c4",
      name: "Full Name",
      email: "Username@company.name",
      checkedInAt: "12:33:00,  March 24 2026",
    },
    {
      id: "c5",
      name: "Full Name",
      email: "Username@company.name",
      checkedInAt: "12:33:00,  March 24 2026",
    },
    {
      id: "c6",
      name: "Full Name",
      email: "Username@company.name",
      checkedInAt: "12:33:00,  March 24 2026",
    },
  ]);

  const checkIn = (guest: Guest) => {
    setGuests((prev) => prev.filter((g) => g.id !== guest.id));
    setCheckedIn((prev) => [
      ...prev,
      {
        ...guest,
        id: `ci-${guest.id}`,
        checkedInAt: new Date().toLocaleString("en-ZA", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      },
    ]);
  };

  return (
    <div className="relative min-h-screen bg-primary py-8 md:py-16">
      <Image src={bgOne} alt="" className="absolute inset-0 z-0 object-cover" fill priority />
      <div className="relative z-10 page-container">
        {/* QR Card */}
        <div className="mb-6 rounded-xl bg-white px-8 py-6 text-center shadow-md">
          <QrCode className="mx-auto mb-2 h-10 w-10 text-neutral-900" />
          <p className="text-sm font-medium text-neutral-900">Scan QR code</p>
        </div>

        {/* Info note */}
        <div className="mb-8 flex items-start gap-2 text-white/90">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="text-sm">
            please use your mobile to do the QR check-in. You can make manual
            checkin{" "}
            <button
              type="button"
              className="underline underline-offset-2 font-medium"
            >
              here
            </button>
          </p>
        </div>

        {/* Two-column lists */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Guest List */}
          <div className="space-y-3">
            <h2 className="text-base font-medium text-white">Guest List</h2>
            <div className="space-y-2">
              {guests.map((guest) => (
                <div
                  key={guest.id}
                  className="flex items-center justify-between rounded-xl border border-white/20 bg-white px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <UserCircle2 className="h-9 w-9 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        {guest.name}
                      </p>
                      <p className="text-xs text-neutral-500">{guest.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => checkIn(guest)}
                    aria-label={`Check in ${guest.name}`}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {guests.length === 0 && (
                <p className="rounded-xl bg-white/10 px-4 py-6 text-center text-sm text-white/70">
                  All guests have checked in
                </p>
              )}
            </div>
          </div>

          {/* Checked-in */}
          <div className="space-y-3">
            <h2 className="text-base font-medium text-blue-200">
              Checked-in
            </h2>
            <div className="space-y-2">
              {checkedIn.map((guest) => (
                <div
                  key={guest.id}
                  className="flex items-center gap-3 rounded-xl border border-white/20 bg-white px-4 py-3"
                >
                  <UserCircle2 className="h-9 w-9 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {guest.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {guest.checkedInAt}
                    </p>
                  </div>
                </div>
              ))}
              {checkedIn.length === 0 && (
                <p className="rounded-xl bg-white/10 px-4 py-6 text-center text-sm text-white/70">
                  No guests checked in yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
