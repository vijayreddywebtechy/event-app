"use client";

import * as React from "react";
import { ChevronRight, User2 } from "lucide-react";

export interface SpeakerCardData {
  id: string;
  name: string;
  bio?: string;
  link?: string;
  photoSrc?: string;
}

export function SpeakerCard({ speaker }: { speaker: SpeakerCardData }) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="h-56 w-full overflow-hidden bg-neutral-100">
        {speaker.photoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={speaker.photoSrc}
            alt={speaker.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-100">
            <User2 className="h-14 w-14 text-neutral-300" />
          </div>
        )}
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-medium text-neutral-950">{speaker.name}</h3>
        {speaker.bio && (
          <p className="text-sm leading-relaxed text-neutral-600">{speaker.bio}</p>
        )}
        {speaker.link && (
          <a
            href={speaker.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-primary hover:underline"
          >
            Link to Bio
            <ChevronRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
