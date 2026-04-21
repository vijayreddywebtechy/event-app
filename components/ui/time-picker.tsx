"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface TimePickerProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

function TimePicker({ value, onChange, placeholder = "Select", className, disabled }: TimePickerProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <div
      className={cn("relative flex items-center w-full cursor-pointer", className)}
      onClick={() => inputRef.current?.showPicker?.()}
    >
      <Input
        ref={inputRef}
        type="time"
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "pr-9",
          "[&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
          value ? "text-foreground" : "[color:transparent]"
        )}
      />
      {!value && (
        <span className="pointer-events-none absolute left-3 text-sm md:text-base text-neutral-700 select-none">
          {placeholder}
        </span>
      )}
      <Clock className="pointer-events-none absolute right-3 h-4 w-4 shrink-0 text-neutral-700" />
    </div>
  )
}

export { TimePicker }
