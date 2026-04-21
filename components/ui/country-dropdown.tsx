"use client"

import * as React from "react"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { countries } from "@/components/ui/country-select"

interface CountryDropdownProps {
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export function CountryDropdown({ value = "ZA", onChange, className }: CountryDropdownProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selected = countries.find((c) => c.value === value) ?? countries[0]

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleSelect(code: string) {
    onChange?.(code)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 bg-transparent outline-none cursor-pointer select-none"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {/* Flag */}
        <FlagCircle option={selected} size={24} />

        {/* Label */}
        <span className="text-base font-normal text-secondary whitespace-nowrap">
          {selected.label}
        </span>

        {/* Chevron */}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-primary transition-transform duration-200 shrink-0",
            open && "rotate-180"
          )}
          strokeWidth={3}
        />
      </button>

      {/* Dropdown list */}
      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-[calc(100%+6px)] z-50 w-52 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg max-h-60 overflow-y-auto"
        >
          {countries.map((country) => (
            <li
              key={country.value}
              role="option"
              aria-selected={country.value === value}
              onClick={() => handleSelect(country.value)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 cursor-pointer text-sm text-secondary transition-colors hover:bg-neutral-100",
                country.value === value && "bg-primary/5 font-medium"
              )}
            >
              <FlagCircle option={country} size={24} />
              <span>{country.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── Internal ────────────────────────────────────────────────────────────────

interface CountryOption {
  value: string
  label: string
  flagIcon?: { src: string }
}

function FlagCircle({ option, size }: { option: CountryOption; size: number }) {
  if (option.flagIcon) {
    return (
      <span
        className="shrink-0 overflow-hidden rounded-full"
        style={{ width: size, height: size }}
      >
        <Image
          src={option.flagIcon.src}
          alt={option.label}
          width={size}
          height={size}
          className="h-full w-full object-cover"
        />
      </span>
    )
  }
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-neutral-200 text-[10px] font-bold text-secondary"
      style={{ width: size, height: size }}
    >
      {option.value}
    </span>
  )
}
