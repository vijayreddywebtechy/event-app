"use client";

import * as React from "react";
import { Upload, FileText, XCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface CoverFile {
  name: string;
  status: "success" | "error";
  dataUrl?: string;
}

export interface CoverImageData {
  file: CoverFile | null;
}

export function createCoverImageData(): CoverImageData {
  return { file: null };
}

interface CoverImageStepProps {
  data: CoverImageData;
  onChange: (data: CoverImageData) => void;
}

export function CoverImageStep({ data, onChange }: CoverImageStepProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) =>
      onChange({ file: { name: file.name, status: "success", dataUrl: e.target?.result as string } });
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
      <h2 className="text-lg font-medium text-neutral-950">Cover Image</h2>

      {/* Note */}
      <div className="flex items-start gap-2 rounded-r-lg border-l-4 border-neutral-900 bg-neutral-50 px-4 py-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-neutral-700" />
        <p className="text-sm text-neutral-800">
          <span className="font-medium">Note:</span> Upload formats PNG, JPG, JPEG, TIFF
        </p>
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
          accept=".png,.jpg,.jpeg,.tiff"
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
            onClick={() => onChange({ file: null })}
            aria-label="Remove file"
            className="ml-4 text-neutral-400 transition-colors hover:text-neutral-600"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
