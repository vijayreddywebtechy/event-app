import Image from "next/image";
import Link from "next/link";

import linkedInIcon from "@/assets/images/icons/icn_linkedin.png";
import youtubeIcon from "@/assets/images/icons/icn_youtube.png";
import twitterIcon from "@/assets/images/icons/icn_twitter.png";
import facebookIcon from "@/assets/images/icons/icn_facebook.png";

const footerLinks = [
  { label: "SECURITY CENTRE", href: "/security-centre" },
  { label: "REGULATORY", href: "/regulatory" },
  { label: "LEGAL", href: "/legal" },
  { label: "TERMS AND CONDITIONS", href: "/terms-and-conditions" },
  { label: "RATES AND PRICING", href: "/rates-and-pricing" },
];

const DISCLAIMER_TEXT =
  "Standard Bank is a licensed financial services provider in terms of the Financial Advisory and Intermediary Services Act and a registered credit provider in terms of the National Credit Act, registration number NCRCP15";

function Footer() {
  return (
    <footer className="w-full bg-primary-deep py-10">
      <div className="page-container flex flex-wrap justify-between gap-10">
        <div>
          {/* Legal Links */}
          <nav
            className="flex flex-wrap items-center gap-10 mb-4"
            aria-label="Legal links"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white text-xs font-medium uppercase tracking-wide hover:underline underline-offset-4 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Disclaimer Text */}
          <p className="text-white/80 text-xs leading-relaxed max-w-4xl">
            {DISCLAIMER_TEXT}
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="#" target={"_blank"}>
            <Image
              src={linkedInIcon}
              alt="LinkedIn Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </Link>
          <Link href="#" target={"_blank"}>
            <Image
              src={youtubeIcon}
              alt="YouTube Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </Link>
          <Link href="#" target={"_blank"}>
            <Image
              src={twitterIcon}
              alt="Twitter Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </Link>
          <Link href="#" target={"_blank"}>
            <Image
              src={facebookIcon}
              alt="Facebook Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
