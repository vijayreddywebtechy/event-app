"use client"

import * as React from "react"
import { useId } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import type {
  SingleValue,
  StylesConfig,
  Props as SelectProps,
  DropdownIndicatorProps,
} from "react-select"
import { components as rsComponents } from "react-select"

import icnSelectArrowP from "@/assets/images/icons/icn_arrow_solid_down.svg"
import flagZA from "@/assets/images/flags/country_flag_south_africa.svg"
import flagUS from "@/assets/images/flags/country_flag_united_states.svg"

const ReactSelect = dynamic(() => import("react-select"), {
  ssr: false,
  loading: () => (
    <div className="flex h-12 w-full items-center rounded-lg border border-neutral-700 bg-background px-3 py-2 text-sm text-neutral-700 md:text-base">
      Loading...
    </div>
  ),
}) as <Option, IsMulti extends boolean = false>(
  props: SelectProps<Option, IsMulti>
) => React.JSX.Element

interface CountryOption {
  value: string
  label: string
  flagIcon?: typeof flagZA
}

const countries: CountryOption[] = [
  { value: "ZA", label: "South Africa", flagIcon: flagZA },
  { value: "US", label: "United States", flagIcon: flagUS },
  { value: "GB", label: "United Kingdom" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "NG", label: "Nigeria" },
  { value: "KE", label: "Kenya" },
  { value: "GH", label: "Ghana" },
  { value: "MZ", label: "Mozambique" },
  { value: "BW", label: "Botswana" },
  { value: "NA", label: "Namibia" },
  { value: "MU", label: "Mauritius" },
  { value: "SZ", label: "Eswatini" },
  { value: "LS", label: "Lesotho" },
  { value: "UG", label: "Uganda" },
  { value: "TZ", label: "Tanzania" },
  { value: "CN", label: "China" },
  { value: "IN", label: "India" },
  { value: "AU", label: "Australia" },
  { value: "BR", label: "Brazil" },
]

const DropdownIndicator = (props: DropdownIndicatorProps<CountryOption, false>) => (
  <rsComponents.DropdownIndicator {...props}>
    <Image src={icnSelectArrowP} alt="" width={24} height={24} />
  </rsComponents.DropdownIndicator>
)

const customStyles: StylesConfig<CountryOption, false> = {
  control: (base, state) => ({
    ...base,
    height: "48px",
    minHeight: "48px",
    borderRadius: "8px",
    borderColor: state.isFocused ? "#0062E1" : "#5C6C80",
    boxShadow: "none",
    fontSize: "16px",
    "&:hover": {
      borderColor: "#0062E1",
    },
    "@media (max-width: 768px)": {
      fontSize: "14px",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    height: "48px",
    minHeight: "48px",
    padding: "0 8px",
    display: "grid",
    alignItems: "center",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#1A314D",
    padding: "0 8px 0 0",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#5C6C80",
    fontSize: "16px",
    gridArea: "1 / 1 / 2 / 3",
    "@media (max-width: 768px)": {
      fontSize: "14px",
    },
  }),
  input: (base) => ({
    ...base,
    color: "#1A314D",
    fontSize: "16px",
    gridArea: "1 / 1 / 2 / 3",
    "@media (max-width: 768px)": {
      fontSize: "14px",
    },
  }),
  singleValue: (base) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#1A314D",
    fontSize: "16px",
    gridArea: "1 / 1 / 2 / 3",
    "@media (max-width: 768px)": {
      fontSize: "14px",
    },
  }),
  option: (base, state) => ({
    ...base,
    color: "#1A314D",
    fontSize: "15px",
    backgroundColor: state.isFocused ? "#f3f4f6" : "#ffffff",
    cursor: "pointer",
    padding: "8px 12px",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 50,
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
}

function FlagBadge({ option }: { option: CountryOption }) {
  if (option.flagIcon) {
    return (
      <Image
        src={option.flagIcon}
        alt={option.label}
        width={20}
        height={20}
        className="shrink-0 rounded-full object-cover"
      />
    )
  }
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-[9px] font-bold text-secondary">
      {option.value}
    </span>
  )
}

function formatOptionLabel(option: CountryOption) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <FlagBadge option={option} />
      <span>{option.label}</span>
    </div>
  )
}

interface CountrySelectProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}

function CountrySelect({
  value,
  onChange,
  placeholder = "Select",
  className,
}: CountrySelectProps) {
  const selectId = useId()
  const selectedOption = countries.find((c) => c.value === value) || null

  return (
    <div className={className}>
      <ReactSelect<CountryOption, false>
        instanceId={selectId}
        options={countries}
        value={selectedOption}
        onChange={(option: SingleValue<CountryOption>) => {
          onChange?.(option?.value || "")
        }}
        formatOptionLabel={formatOptionLabel}
        styles={customStyles}
        placeholder={placeholder}
        isSearchable
        classNamePrefix="react-select"
        components={{
          DropdownIndicator,
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  )
}

export { CountrySelect, countries }
