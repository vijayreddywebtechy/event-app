"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CountryDropdown } from "@/components/ui/country-dropdown";

import sbLogo from "@/assets/images/logos/standardbank_logo_vrtl.svg";
import eventBg from "@/assets/images/background/login_bg.png";

import { useState } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const platformConfig = {
  name: "Platform Name",
  subtext: "Subtext",
  greeting: "Hello",
  legalText:
    "Standard Bank is a licensed financial services provider in terms of the Financial Advisory and Intermediary Services Act and a registered credit provider in terms of the National Credit Act, registration number NCRCP15",
};

const featuredEvent = {
  category: "Workshop",
  title: "Digital Banking Skills Workshop",
  description:
    "Comprehensive training workshop for staff on new digital banking features, customer support protocols, and compliance requirements.",
  date: "26 March 2026",
  location: "Online seminar",
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [country, setCountry] = useState("ZA");

  return (
    <div className="flex min-h-screen">
      {/* ── Left panel: event banner ── */}
      <div className="relative hidden md:flex md:w-[55%] lg:w-[60%] flex-col justify-end overflow-hidden">
        <Image
          src={eventBg}
          alt={featuredEvent.title}
          fill
          className="object-cover object-center"
          priority
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* event meta */}
        <div className="relative z-10 p-8 md:p-12 lg:p-20 text-white">
          <p className="text-lg md:text-2xl font-medium mb-3 tracking-wide">
            {featuredEvent.category}
          </p>
          <h1 className="text-3xl lg:text-[42px] font-normal leading-tight mb-4 md:max-w-[500px]">
            {featuredEvent.title}
          </h1>
          <p className="text-sm md:text-base text-white mb-8 md:max-w-[500px]">
            {featuredEvent.description}
          </p>
          <div className="flex flex-wrap gap-5 text-sm text-white">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 shrink-0" />
              {featuredEvent.date}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              {featuredEvent.location}
            </span>
          </div>
        </div>
      </div>

      {/* ── Right panel: auth ── */}
      <div className="flex flex-col w-full md:w-[45%] lg:w-[40%] bg-white min-h-screen">
        {/* country selector */}
        <div className="flex justify-start p-4 md:p-6">
          <CountryDropdown value={country} onChange={setCountry} />
        </div>

        {/* centered auth content */}
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-10 md:px-12">
          <div className="w-full max-w-sm flex flex-col items-center">
            {/* logo */}
            <Image
              src={sbLogo}
              alt="Standard Bank"
              width={72}
              height={72}
              className="mb-6 md:mb-11"
            />

            {/* platform name */}
            <h2 className="text-2xl md:text-3xl lg:text-[40px] font-medium text-primary-dark text-center mb-2">
              {platformConfig.name}
            </h2>
            <p className="text-2xl md:text-3xl text-primary-dark font-normal text-center mb-8">
              {platformConfig.subtext}
            </p>

            {/* greeting */}
            <p className="text-xl sm:text-2xl md:text-3xl text-neutral-900 mb-6 md:mb-10">
              {platformConfig.greeting}
            </p>

            {/* action buttons */}
            <div className="w-full space-y-3">
              <Button asChild className="w-full font-medium tracking-widest">
                <Link href="/dashboard">Sign In</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full font-medium tracking-widest"
              >
                <Link href="/register">Register</Link>
              </Button>
            </div>

            {/* T&Cs */}
            <p className="py-6 text-xs text-neutral-500 text-center">
              By signing in, I agree to the{" "}
              <Link
                href="/terms"
                className="font-medium text-primary hover:underline"
              >
                T&amp;Cs
              </Link>
            </p>

            {/* admin login */}
            <div className="w-full py-6 border-y border-neutral-200">
              <Button
                asChild
                variant="outline"
                className="w-full font-medium tracking-widest"
              >
                <Link href="/admin/sign-in">Admin Login</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* legal footer */}
        <p className="px-8 pb-6 text-center text-[11px] text-neutral-400 leading-relaxed max-w-sm mx-auto">
          {platformConfig.legalText}
        </p>
      </div>
    </div>
  );
}
