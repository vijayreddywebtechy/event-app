"use client";

import * as React from "react";
import { Upload, FileText, XCircle, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import CustomSelect, { type SelectOption } from "@/components/dynamic/CustomSelect";
import { cn } from "@/lib/utils";
import type { SingleValue, MultiValue, ActionMeta } from "react-select";
import type { CampaignType } from "@/components/dynamic/CampaignTypeStep";

export interface CampaignDetailsForm {
  name: string;
  event: SelectOption | null;
  targetAudience: SelectOption | null;
  subject: string;
  description: string;
  message: string;
  date: Date | undefined;
  time: string;
  file: { name: string; dataUrl?: string } | null;
}

export function createCampaignDetails(): CampaignDetailsForm {
  return {
    name: "",
    event: null,
    targetAudience: null,
    subject: "",
    description: "",
    message: "",
    date: undefined,
    time: "",
    file: null,
  };
}

const EVENT_OPTIONS: SelectOption[] = [
  { value: "compound-effect", label: "The Compound Effect Conference" },
  { value: "wealth-blueprint", label: "The Wealth Blueprint Summit" },
  { value: "moneymind", label: "MoneyMind Summit" },
];

const AUDIENCE_OPTIONS: SelectOption[] = [
  { value: "self_registered", label: "Self-Registered" },
  { value: "host_invited", label: "Host-Invited" },
];

interface CampaignDetailsStepProps {
  type: CampaignType;
  data: CampaignDetailsForm;
  onChange: (updates: Partial<CampaignDetailsForm>) => void;
}

export function CampaignDetailsStep({ type, data, onChange }: CampaignDetailsStepProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleSelectChange =
    (field: keyof CampaignDetailsForm) =>
    (
      newValue: SingleValue<SelectOption> | MultiValue<SelectOption>,
      _meta: ActionMeta<SelectOption>,
    ) => {
      onChange({ [field]: newValue as SelectOption | null });
    };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) =>
      onChange({ file: { name: file.name, dataUrl: e.target?.result as string } });
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
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-neutral-950">Campaign Details</h2>

      {/* Campaign name */}
      <div className="space-y-1.5">
        <Label className="text-sm text-neutral-800">Campaign name</Label>
        <Input
          placeholder="Please enter"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
      </div>

      {/* Event + Target Audience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm text-neutral-800">Select an Event</Label>
          <CustomSelect
            options={EVENT_OPTIONS}
            value={data.event}
            onChange={handleSelectChange("event")}
            placeholder="Select"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-neutral-800">Target Audience</Label>
          <CustomSelect
            options={AUDIENCE_OPTIONS}
            value={data.targetAudience}
            onChange={handleSelectChange("targetAudience")}
            placeholder="Select from Self-Registered or Host-Invited"
          />
        </div>
      </div>

      {/* Email-only: Subject */}
      {type === "email" && (
        <div className="space-y-1.5">
          <Label className="text-sm text-neutral-800">Subject</Label>
          <Input
            placeholder="Please enter"
            value={data.subject}
            onChange={(e) => onChange({ subject: e.target.value })}
          />
        </div>
      )}

      {/* Email: Description | SMS: Message */}
      <div className="space-y-1.5">
        <Label className="text-sm text-neutral-800">
          {type === "email" ? "Description" : "Message"}
        </Label>
        <textarea
          placeholder="Please enter"
          rows={4}
          value={type === "email" ? data.description : data.message}
          onChange={(e) =>
            onChange(type === "email" ? { description: e.target.value } : { message: e.target.value })
          }
          className="flex w-full resize-none rounded-lg border border-neutral-700 bg-background px-3 py-3 text-sm text-secondary placeholder:text-sm placeholder:text-neutral-700 transition-colors hover:border-primary focus:border-primary focus:outline-none md:text-base md:placeholder:text-base"
        />
      </div>

      {/* Date + Time */}
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
          <Label className="text-sm text-neutral-800">Time</Label>
          <TimePicker
            value={data.time}
            onChange={(time) => onChange({ time })}
          />
        </div>
      </div>

      {/* Email-only: Upload Template */}
      {type === "email" && (
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-medium text-neutral-950">Upload Template</h3>

          <div className="flex items-start gap-2 rounded-r-lg border-l-4 border-neutral-900 bg-neutral-50 px-4 py-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-neutral-700" />
            <p className="text-sm text-neutral-800">
              <span className="font-medium">Note:</span> Please upload a template for the email campaign
            </p>
          </div>

          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-14 transition-colors",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-neutral-300 hover:border-primary hover:bg-primary/5",
            )}
          >
            <Upload className="h-8 w-8 text-primary" />
            <p className="text-center text-sm text-neutral-800">
              <span className="font-medium">Drag a file</span> or{" "}
              <span className="font-medium text-primary">click here</span> to upload a file
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.html,.htm,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {data.file && (
            <div className="flex items-center justify-between rounded-lg border border-neutral-300 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100">
                  <FileText className="h-4 w-4 text-neutral-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-950">{data.file.name}</p>
                  <p className="text-xs text-green-600">Upload successful</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onChange({ file: null })}
                aria-label="Remove file"
                className="ml-4 text-neutral-400 transition-colors hover:text-neutral-600"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
