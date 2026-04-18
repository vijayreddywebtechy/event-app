import type { Metadata } from "next";
import "./globals.css";
import { bentonSansPro } from "./fonts";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Event App",
  description: "Evennt platform for Standard Bank",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${bentonSansPro.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
