"use client";

import * as React from "react";
import {
  Trash2,
  Upload,
  FileText,
  XCircle,
  UserPlus,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomSelect, { type SelectOption } from "@/components/dynamic/CustomSelect";
import { cn } from "@/lib/utils";
import type { SingleValue, MultiValue, ActionMeta } from "react-select";

const TITLE_OPTIONS = [
  { value: "mr", label: "Mr" },
  { value: "mrs", label: "Mrs" },
  { value: "ms", label: "Ms" },
  { value: "dr", label: "Dr" },
  { value: "prof", label: "Prof" },
];

interface SpeakerFile {
  name: string;
  status: "success" | "error";
  dataUrl?: string;
}

export interface Speaker {
  id: string;
  title: SelectOption | null;
  firstName: string;
  lastName: string;
  bio: string;
  link: string;
  file: SpeakerFile | null;
}

export function createSpeaker(): Speaker {
  return {
    id: crypto.randomUUID(),
    title: null,
    firstName: "",
    lastName: "",
    bio: "",
    link: "",
    file: null,
  };
}

interface SpeakerCardProps {
  speaker: Speaker;
  index: number;
  onUpdate: (updates: Partial<Speaker>) => void;
  onRemove: () => void;
}

function SpeakerCard({ speaker, index, onUpdate, onRemove }: SpeakerCardProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) =>
      onUpdate({ file: { name: file.name, status: "success", dataUrl: e.target?.result as string } });
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="rounded-xl border border-neutral-300 bg-white px-6 py-6 shadow-sm">
      {/* Card header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-medium text-neutral-950">
          Speaker {index + 1}
        </h3>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove Speaker ${index + 1}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary text-primary transition-colors hover:bg-primary/10"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Title / First Name / Last Name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[112px_1fr_1fr]">
          <div className="space-y-1.5">
            <Label className="text-sm text-neutral-800">Title</Label>
            <CustomSelect
              options={TITLE_OPTIONS}
              placeholder="Select"
              value={speaker.title}
              onChange={(newValue: SingleValue<SelectOption> | MultiValue<SelectOption>, _meta: ActionMeta<SelectOption>) =>
                onUpdate({ title: newValue as SelectOption | null })
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm text-neutral-800">First Name</Label>
            <Input
              placeholder="Please enter"
              value={speaker.firstName}
              onChange={(e) => onUpdate({ firstName: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm text-neutral-800">Last Name</Label>
            <Input
              placeholder="Please enter"
              value={speaker.lastName}
              onChange={(e) => onUpdate({ lastName: e.target.value })}
            />
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-1.5">
          <Label className="text-sm text-neutral-800">Bio</Label>
          <textarea
            placeholder="Please enter"
            rows={4}
            value={speaker.bio}
            onChange={(e) => onUpdate({ bio: e.target.value })}
            className="flex w-full resize-none rounded-lg border border-neutral-700 bg-background px-3 py-3 text-sm text-secondary placeholder:text-sm placeholder:text-neutral-700 transition-colors hover:border-primary focus:border-primary focus:outline-none md:text-base md:placeholder:text-base"
          />
        </div>

        {/* Link */}
        <div className="space-y-1.5">
          <Label className="text-sm text-neutral-800">Link</Label>
          <Input
            placeholder="Please enter"
            value={speaker.link}
            onChange={(e) => onUpdate({ link: e.target.value })}
          />
        </div>

        {/* Note */}
        <div className="flex items-start gap-2 rounded-r-lg border-l-4 border-primary bg-primary/5 px-4 py-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="text-sm text-neutral-800">
            <span className="font-medium">Note:</span> Upload formats PNG, JPG,
            JPEG, TIFF
          </p>
        </div>

        {/* Drop zone */}
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-10 transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-neutral-300 hover:border-primary hover:bg-primary/5",
          )}
        >
          <Upload className="h-8 w-8 text-primary" />
          <p className="text-center text-sm text-neutral-800">
            <span className="font-medium">Drag a file</span> or{" "}
            <span className="font-medium text-primary">click here</span> to
            upload a file
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.tiff"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Uploaded file row */}
        {speaker.file && (
          <div className="flex items-center justify-between rounded-lg border border-neutral-300 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100">
                <FileText className="h-4 w-4 text-neutral-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-950">
                  {speaker.file.name}
                </p>
                <p className="text-xs text-green-600">Upload successful</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onUpdate({ file: null })}
              aria-label="Remove file"
              className="ml-4 text-neutral-400 transition-colors hover:text-neutral-600"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface SpeakersStepProps {
  speakers: Speaker[];
  onChange: (speakers: Speaker[]) => void;
}

export function SpeakersStep({ speakers, onChange }: SpeakersStepProps) {
  const updateSpeaker = (id: string, updates: Partial<Speaker>) => {
    onChange(speakers.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const removeSpeaker = (id: string) => {
    onChange(speakers.filter((s) => s.id !== id));
  };

  const addSpeaker = () => {
    onChange([...speakers, createSpeaker()]);
  };

  return (
    <div className="space-y-6">

      {speakers.length > 0 && (
        <h2 className="text-lg font-medium text-neutral-950">Speakers</h2>
      )}
      {speakers.map((speaker, index) => (
        <SpeakerCard
          key={speaker.id}
          speaker={speaker}
          index={index}
          onUpdate={(updates) => updateSpeaker(speaker.id, updates)}
          onRemove={() => removeSpeaker(speaker.id)}
        />
      ))}

      <div className="flex justify-center py-5">
        <Button type="button" variant="outline" onClick={addSpeaker}>
          <UserPlus className="h-4 w-4" />
          ADD A SPEAKER
        </Button>
      </div>
    </div>
  );
}
