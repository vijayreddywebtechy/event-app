"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Stepper, type StepConfig } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import CustomSelect, {
  type SelectOption,
} from "@/components/dynamic/CustomSelect";
import { SpeakersStep, createSpeaker, type Speaker } from "@/components/dynamic/SpeakersStep";
import { AgendaStep, createSession, type Session } from "@/components/dynamic/AgendaStep";
import { InviteesStep, createInviteesData, type InviteesData } from "@/components/dynamic/InviteesStep";
import { CoverImageStep, createCoverImageData, type CoverImageData } from "@/components/dynamic/CoverImageStep";
import { EventPreview } from "@/components/dynamic/EventPreview";
import type { SingleValue, MultiValue, ActionMeta } from "react-select";

const STEPS: StepConfig[] = [
  { id: 1, label: "Step 1", description: "Basic Information" },
  { id: 2, label: "Step 2", description: "Speakers" },
  { id: 3, label: "Step 3", description: "Agenda & Sessions" },
  { id: 4, label: "Step 4", description: "Invitees" },
  { id: 5, label: "Step 5", description: "Cover image" },
];

const EVENT_TYPE_OPTIONS: SelectOption[] = [
  { value: "conference", label: "Conference" },
  { value: "workshop", label: "Workshop" },
  { value: "seminar", label: "Seminar" },
  { value: "webinar", label: "Webinar" },
  { value: "networking", label: "Networking" },
];

const PARTICIPATION_MODE_OPTIONS: SelectOption[] = [
  { value: "self_registered", label: "Self-Registered" },
  { value: "host_invited", label: "Host-Invited" },
];

const MEETING_LINK_OPTIONS: SelectOption[] = [
  { value: "teams", label: "Microsoft Teams" },
  { value: "zoom", label: "Zoom" },
  { value: "meet", label: "Google Meet" },
  { value: "webex", label: "Cisco Webex" },
];

export interface BasicDetailsForm {
  eventName: string;
  description: string;
  eventType: SelectOption | null;
  participationMode: SelectOption | null;
  date: Date | undefined;
  startTime: string;
  endTime: string;
  allDayEvent: boolean;
  location: string;
  meetingLink: SelectOption | null;
}

function BasicDetailsStep({
  data,
  onChange,
}: {
  data: BasicDetailsForm;
  onChange: (updates: Partial<BasicDetailsForm>) => void;
}) {
  const handleSelectChange =
    (field: keyof BasicDetailsForm) =>
    (
      newValue: SingleValue<SelectOption> | MultiValue<SelectOption>,
      _meta: ActionMeta<SelectOption>,
    ) => {
      onChange({ [field]: newValue as SelectOption | null });
    };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-neutral-950">Basic Details</h2>

      {/* Event name */}
      <div className="space-y-1.5">
        <Label htmlFor="event-name" className="text-sm text-neutral-800">
          Event name
        </Label>
        <Input
          id="event-name"
          placeholder="Please enter"
          value={data.eventName}
          onChange={(e) => onChange({ eventName: e.target.value })}
        />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="description" className="text-sm text-neutral-800">
          Description
        </Label>
        <textarea
          id="description"
          placeholder="Please enter"
          rows={4}
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          className="flex w-full rounded-lg border border-neutral-700 bg-background px-3 py-3 text-sm md:text-base text-secondary placeholder:text-neutral-700 placeholder:text-sm md:placeholder:text-base hover:border-primary focus:border-primary focus:outline-none resize-none transition-colors"
        />
      </div>

      {/* Type of Event + Participation Mode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm text-neutral-800">Type of Event</Label>
          <CustomSelect
            options={EVENT_TYPE_OPTIONS}
            value={data.eventType}
            onChange={handleSelectChange("eventType")}
            placeholder="Select"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-neutral-800">Participation Mode</Label>
          <CustomSelect
            options={PARTICIPATION_MODE_OPTIONS}
            value={data.participationMode}
            onChange={handleSelectChange("participationMode")}
            placeholder="Select from Self-Registered or Host-Invited"
          />
        </div>
      </div>

      {/* Date + Start time + End time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm text-neutral-800">Date</Label>
          <DatePicker
            value={data.date}
            onChange={(date) => onChange({ date })}
            placeholder="Select"
          />
        </div>
        <div className="space-y-1.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm text-neutral-800">Start time</Label>
              <TimePicker
                value={data.startTime}
                onChange={(startTime) => onChange({ startTime })}
                disabled={data.allDayEvent}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm text-neutral-800">End time</Label>
              <TimePicker
                value={data.endTime}
                onChange={(endTime) => onChange({ endTime })}
                disabled={data.allDayEvent}
              />
            </div>
          </div>
        </div>
      </div>

      {/* All Day Event */}
      <div className="flex items-center gap-2.5">
        <Checkbox
          id="all-day"
          checked={data.allDayEvent}
          onCheckedChange={(checked) =>
            onChange({
              allDayEvent: !!checked,
              ...(checked ? { startTime: "", endTime: "" } : {}),
            })
          }
        />
        <Label
          htmlFor="all-day"
          className="text-sm text-neutral-800 cursor-pointer font-normal"
        >
          All Day Event
        </Label>
      </div>

      {/* Location + Meeting Link */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm text-neutral-800">Location</Label>
          <div className="relative">
            <Input
              placeholder="Select"
              value={data.location}
              onChange={(e) => onChange({ location: e.target.value })}
              className="pr-10"
            />
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-700" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-neutral-800">Meeting Link</Label>
          <CustomSelect
            options={MEETING_LINK_OPTIONS}
            value={data.meetingLink}
            onChange={handleSelectChange("meetingLink")}
            placeholder="Select"
          />
        </div>
      </div>
    </div>
  );
}

export default function NewEventForm() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isPreview, setIsPreview] = React.useState(false);
  const [speakers, setSpeakers] = React.useState<Speaker[]>([createSpeaker()]);
  const [sessions, setSessions] = React.useState<Session[]>([createSession()]);
  const [invitees, setInvitees] = React.useState<InviteesData>(createInviteesData());
  const [coverImage, setCoverImage] = React.useState<CoverImageData>(createCoverImageData());
  const [basicDetails, setBasicDetails] = React.useState<BasicDetailsForm>({
    eventName: "",
    description: "",
    eventType: null,
    participationMode: null,
    date: undefined,
    startTime: "",
    endTime: "",
    allDayEvent: false,
    location: "",
    meetingLink: null,
  });

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === STEPS.length;

  const handleNext = () => {
    if (isLastStep) setIsPreview(true);
    else setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    if (!isFirstStep) setCurrentStep((s) => s - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicDetailsStep
            data={basicDetails}
            onChange={(updates) =>
              setBasicDetails((prev) => ({ ...prev, ...updates }))
            }
          />
        );
      case 2:
        return <SpeakersStep speakers={speakers} onChange={setSpeakers} />;
      case 3: {
        const speakerOptions = speakers.map((s, i) => ({
          value: s.id,
          label: [s.firstName, s.lastName].filter(Boolean).join(" ") || `Speaker ${i + 1}`,
        }));
        return (
          <AgendaStep
            sessions={sessions}
            speakerOptions={speakerOptions}
            onChange={setSessions}
          />
        );
      }
      case 4:
        return <InviteesStep data={invitees} onChange={setInvitees} />;
      case 5:
        return <CoverImageStep data={coverImage} onChange={setCoverImage} />;
      default:
        return null;
    }
  };

  if (isPreview) {
    return (
      <EventPreview
        basicDetails={basicDetails}
        speakers={speakers}
        sessions={sessions}
        coverImage={coverImage}
        onBack={() => { setIsPreview(false); setCurrentStep(STEPS.length); }}
        onPublish={() => { /* TODO: submit */ }}
      />
    );
  }

  return (
    <div className="page-container py-14">
      <h1 className="text-2xl text-neutral-950 mb-9">New Event</h1>

      {/* Stepper */}
      <div className="rounded-xl border border-neutral-300 bg-white px-4 py-4 mb-5 shadow-sm">
        <Stepper steps={STEPS} currentStep={currentStep} />
      </div>

      {/* Step content */}
      <div className="rounded-xl border border-neutral-300 bg-white px-6 py-6 mb-5 shadow-sm">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="rounded-xl border border-neutral-300 bg-white px-6 py-4 shadow-sm flex items-center justify-between">
        <Button
          variant="primarySoft"
          onClick={handleBack}
          disabled={isFirstStep}
          className="text-primary bg-transparent disabled:opacity-30"
        >
          BACK
        </Button>
        <Button onClick={handleNext} className="min-w-28">
          {isLastStep ? "SUBMIT" : "NEXT"}
        </Button>
      </div>
    </div>
  );
}
