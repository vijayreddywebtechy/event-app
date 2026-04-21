"use client";

import * as React from "react";
import { Trash2, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import CustomSelect, { type SelectOption } from "@/components/dynamic/CustomSelect";
import type { SingleValue, MultiValue, ActionMeta } from "react-select";

export interface Session {
  id: string;
  name: string;
  description: string;
  speaker: SelectOption | null;
  date: Date | undefined;
  startTime: string;
  endTime: string;
}

export function createSession(): Session {
  return {
    id: crypto.randomUUID(),
    name: "",
    description: "",
    speaker: null,
    date: undefined,
    startTime: "",
    endTime: "",
  };
}

interface SessionCardProps {
  session: Session;
  index: number;
  speakerOptions: SelectOption[];
  onUpdate: (updates: Partial<Session>) => void;
  onRemove: () => void;
}

function SessionCard({
  session,
  index,
  speakerOptions,
  onUpdate,
  onRemove,
}: SessionCardProps) {
  return (
    <div className="rounded-xl border border-neutral-300 bg-white px-6 py-6 shadow-sm">
      {/* Card header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-medium text-neutral-950">
          Session {index + 1}
        </h3>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove Session ${index + 1}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary text-primary transition-colors hover:bg-primary/10"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Session Name */}
        <div className="space-y-1.5">
          <Label className="text-sm text-neutral-800">Session Name</Label>
          <Input
            placeholder="Please enter"
            value={session.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label className="text-sm text-neutral-800">Description</Label>
          <textarea
            placeholder="Please enter"
            rows={4}
            value={session.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            className="flex w-full resize-none rounded-lg border border-neutral-700 bg-background px-3 py-3 text-sm text-secondary placeholder:text-sm placeholder:text-neutral-700 transition-colors hover:border-primary focus:border-primary focus:outline-none md:text-base md:placeholder:text-base"
          />
        </div>

        {/* Speaker */}
        <div className="space-y-1.5">
          <Label className="text-sm text-neutral-800">Speaker</Label>
          <CustomSelect
            options={speakerOptions}
            value={session.speaker}
            placeholder="Select"
            onChange={(
              newValue: SingleValue<SelectOption> | MultiValue<SelectOption>,
              _meta: ActionMeta<SelectOption>,
            ) => onUpdate({ speaker: newValue as SelectOption | null })}
          />
        </div>

        {/* Date + Start time + End time */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-sm text-neutral-800">Date</Label>
            <DatePicker
              value={session.date}
              onChange={(date) => onUpdate({ date })}
              placeholder="Select"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm text-neutral-800">Start time</Label>
              <TimePicker
                value={session.startTime}
                onChange={(startTime) => onUpdate({ startTime })}
                placeholder="Select"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm text-neutral-800">End time</Label>
              <TimePicker
                value={session.endTime}
                onChange={(endTime) => onUpdate({ endTime })}
                placeholder="Select"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AgendaStepProps {
  sessions: Session[];
  speakerOptions: SelectOption[];
  onChange: (sessions: Session[]) => void;
}

export function AgendaStep({
  sessions,
  speakerOptions,
  onChange,
}: AgendaStepProps) {
  const updateSession = (id: string, updates: Partial<Session>) => {
    onChange(sessions.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const removeSession = (id: string) => {
    onChange(sessions.filter((s) => s.id !== id));
  };

  const addSession = () => {
    onChange([...sessions, createSession()]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-neutral-950">Agenda & Sessions</h2>

      {sessions.map((session, index) => (
        <SessionCard
          key={session.id}
          session={session}
          index={index}
          speakerOptions={speakerOptions}
          onUpdate={(updates) => updateSession(session.id, updates)}
          onRemove={() => removeSession(session.id)}
        />
      ))}

      <div className="flex justify-center pt-2">
        <Button type="button" variant="outline" onClick={addSession}>
          <CalendarPlus className="h-4 w-4" />
          ADD AGENDA
        </Button>
      </div>
    </div>
  );
}
