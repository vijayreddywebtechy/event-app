"use client";

import * as React from "react";
import { UserCircle, X, Upload, FileText, XCircle, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface InviteeFile {
  name: string;
  status: "success" | "error";
}

export interface InviteesData {
  emails: string[];
  file: InviteeFile | null;
}

export function createInviteesData(): InviteesData {
  return { emails: [], file: null };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface InviteesStepProps {
  data: InviteesData;
  onChange: (data: InviteesData) => void;
}

export function InviteesStep({ data, onChange }: InviteesStepProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const addEmail = (raw: string) => {
    const trimmed = raw.trim().replace(/,+$/, "");
    if (EMAIL_RE.test(trimmed) && !data.emails.includes(trimmed)) {
      onChange({ ...data, emails: [...data.emails, trimmed] });
    }
    setInputValue("");
  };

  const removeEmail = (email: string) => {
    onChange({ ...data, emails: data.emails.filter((e) => e !== email) });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
      e.preventDefault();
      addEmail(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && data.emails.length > 0) {
      onChange({ ...data, emails: data.emails.slice(0, -1) });
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    const candidates = pasted.split(/[,;\s]+/).map((s) => s.trim()).filter(Boolean);
    if (candidates.length > 1) {
      const valid = candidates.filter(
        (c) => EMAIL_RE.test(c) && !data.emails.includes(c),
      );
      if (valid.length) onChange({ ...data, emails: [...data.emails, ...valid] });
    } else {
      setInputValue(pasted);
    }
  };

  const handleFile = (file: File) => {
    onChange({ ...data, file: { name: file.name, status: "success" } });
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
      <h2 className="text-lg font-medium text-neutral-950">Invitees</h2>

      {/* Email tag input */}
      <div className="space-y-1.5">
        <Label className="text-sm text-neutral-800">Invitees</Label>
        <div
          onClick={() => inputRef.current?.focus()}
          className="min-h-[72px] w-full cursor-text rounded-lg border border-neutral-700 bg-background px-3 py-2.5 transition-colors hover:border-primary focus-within:border-primary"
        >
          <div className="flex flex-wrap gap-2">
            {data.emails.map((email) => (
              <span
                key={email}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 py-1 pl-2 pr-1.5 text-sm text-primary"
              >
                <UserCircle className="h-4 w-4 shrink-0" />
                <span>{email}</span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeEmail(email); }}
                  aria-label={`Remove ${email}`}
                  className="flex h-4 w-4 items-center justify-center rounded-full text-primary/60 transition-colors hover:text-primary"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <input
              ref={inputRef}
              type="email"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              onBlur={() => inputValue && addEmail(inputValue)}
              placeholder={data.emails.length === 0 ? "Username@company.com" : ""}
              className="min-w-[200px] flex-1 bg-transparent text-sm text-secondary outline-none placeholder:text-neutral-700 md:text-base"
            />
          </div>
        </div>
      </div>

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
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
          <span className="font-medium text-primary">click here</span> to upload a file
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xls,.xlsx"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Uploaded file row */}
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
            onClick={() => onChange({ ...data, file: null })}
            aria-label="Remove file"
            className="ml-4 text-neutral-400 transition-colors hover:text-neutral-600"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Note */}
      <div className="flex items-start gap-2 rounded-r-lg border-l-4 border-neutral-900 bg-neutral-50 px-4 py-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-neutral-700" />
        <p className="text-sm text-neutral-800">
          <span className="font-medium">Note:</span> Please upload a XLS file for bulk invites
        </p>
      </div>
    </div>
  );
}
