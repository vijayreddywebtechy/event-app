"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Lock, Menu, Search, UserRound, X } from "lucide-react";
import logo from "@/assets/images/logos/standardbank-logo.svg";

const globalLinks = [{ label: "Global label 1", href: "#" }];

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Events", href: "/events" },
  { label: "Insights", href: "/insights" },
  { label: "QR Check-in", href: "/qr-check-in" },
  { label: "Campaigns", href: "/campaigns" },
];

const navLinkClass =
  "px-4 py-2.5 text-sm text-white transition-colors hover:bg-primary-medium";
const navLinkActiveClass =
  "px-4 py-2.5 text-sm text-white font-medium bg-primary-medium";

function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = () => router.push("/");

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-white">
        <div className="flex items-center justify-between h-10 px-3 md:px-6">
          <Link href="/" className="text-primary text-sm">
            <span className="font-medium">Product</span>Name
          </Link>
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Global links"
          >
            {globalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-neutral-800 text-xs hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Bar */}
      <div className="bg-primary-dark">
        <div className="px-3 md:px-6 flex items-center justify-between h-16">
          <Link href="/" aria-label="Home">
            <Image src={logo} alt="Standard Bank" height={40} priority />
          </Link>

          {/* Desktop user actions */}
          <div className="hidden md:flex items-center h-full">
            <button
              type="button"
              aria-label="Search"
              className="h-full px-4 flex items-center text-white hover:text-neutral-200 transition-colors"
            >
              <Search className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <button
              type="button"
              className="h-full p-4 flex items-center gap-2 text-white text-sm hover:text-neutral-200 transition-colors"
            >
              <UserRound className="h-5 w-5" strokeWidth={1.5} />
              <span>Username</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              className="bg-primary h-full p-4 flex items-center gap-2 text-white text-sm font-medium hover:text-neutral-200 transition-colors"
              onClick={handleSignOut}
            >
              <Lock className="h-4.5 w-4.5" strokeWidth={1.5} />
              <span>SIGN OUT</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-white p-1"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-[#003FCA]">
        <div className="px-3 md:px-6 hidden md:flex items-center justify-between">
          <nav className="flex items-center" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={pathname === link.href ? navLinkActiveClass : navLinkClass}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="#" className={navLinkClass}>
            Quick link 1
          </Link>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#003FCA]">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={pathname === link.href ? navLinkActiveClass : navLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#"
              className={navLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Quick link 1
            </Link>
          </nav>

          {/* Mobile user actions */}
          <div className="border-t border-white/20 px-4 py-3 flex items-center gap-4">
            <button
              type="button"
              className="flex items-center gap-2 text-white text-sm hover:text-neutral-200 transition-colors"
            >
              <UserRound className="h-5 w-5" />
              <span>Username</span>
            </button>

            <div className="w-px h-6 bg-white/30" />

            <button
              type="button"
              className="flex items-center gap-2 text-white text-sm font-medium hover:text-neutral-200 transition-colors"
            >
              <Lock className="h-4.5 w-4.5" />
              <span>SIGN OUT</span>
            </button>
          </div>

          {/* Mobile global links */}
          <div className="border-t border-white/20 px-4 py-3 flex flex-wrap gap-x-6 gap-y-2">
            {globalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/80 text-xs hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
