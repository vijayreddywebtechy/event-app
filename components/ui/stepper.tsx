"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StepConfig {
  id: number
  label: string
  description: string
}

interface StepperProps {
  steps: StepConfig[]
  currentStep: number
  className?: string
}

function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div className="flex items-start min-w-max px-2 py-1 gap-0">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep
          const isActive = step.id === currentStep

          return (
            <React.Fragment key={step.id}>
              {/* Step item */}
              <div className="flex items-center gap-3 shrink-0">
                {/* Circle */}
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors",
                    isCompleted && "bg-primary text-primary-foreground",
                    isActive && "bg-primary text-primary-foreground",
                    !isCompleted && !isActive && "bg-neutral-300 text-neutral-900"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>

                {/* Labels */}
                <div className="flex flex-col leading-tight">
                  <span
                    className="text-neutral-900 font-medium text-base"
                  >
                    Step {step.id}
                  </span>
                  <span
                    className="text-neutral-900 text-xs"
                  >
                    {step.description}
                  </span>
                </div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 min-w-8 mx-2 mt-4 self-start">
                  <div
                    className={cn(
                      "h-px w-full transition-colors",
                      step.id < currentStep ? "bg-primary" : "bg-neutral-300"
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export { Stepper }
