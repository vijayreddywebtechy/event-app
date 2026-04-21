"use client";

import * as React from "react";
import { Stepper, type StepConfig } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { CampaignTypeStep, type CampaignType } from "@/components/dynamic/CampaignTypeStep";
import { CampaignDetailsStep, createCampaignDetails, type CampaignDetailsForm } from "@/components/dynamic/CampaignDetailsStep";

const STEPS: StepConfig[] = [
  { id: 1, label: "Step 1", description: "Type" },
  { id: 2, label: "Step 2", description: "Campaign Details" },
];

export default function NewCampaignForm() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [campaignType, setCampaignType] = React.useState<CampaignType>("email");
  const [details, setDetails] = React.useState<CampaignDetailsForm>(createCampaignDetails());

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === STEPS.length;

  return (
    <div className="page-container py-14">
      <h1 className="text-2xl text-neutral-950 mb-9">New Campaign</h1>

      {/* Stepper */}
      <div className="rounded-xl border border-neutral-300 bg-white px-4 py-4 mb-5 shadow-sm">
        <div className="mx-auto md:max-w-md"><Stepper steps={STEPS} currentStep={currentStep} /></div>
      </div>

      {/* Step content */}
      <div className="rounded-xl border border-neutral-300 bg-white px-6 py-6 mb-5 shadow-sm">
        {currentStep === 1 && (
          <CampaignTypeStep selected={campaignType} onChange={setCampaignType} />
        )}
        {currentStep === 2 && (
          <CampaignDetailsStep
            type={campaignType}
            data={details}
            onChange={(updates) => setDetails((prev) => ({ ...prev, ...updates }))}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="rounded-xl border border-neutral-300 bg-white px-6 py-4 shadow-sm flex items-center justify-between">
        <Button
          variant="primarySoft"
          onClick={() => setCurrentStep((s) => s - 1)}
          disabled={isFirstStep}
          className="text-primary bg-transparent disabled:opacity-30"
        >
          BACK
        </Button>
        <Button
          onClick={() => { if (!isLastStep) setCurrentStep((s) => s + 1); }}
          className="min-w-28"
        >
          {isLastStep ? "SUBMIT" : "NEXT"}
        </Button>
      </div>
    </div>
  );
}
