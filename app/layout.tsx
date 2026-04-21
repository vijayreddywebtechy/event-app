import type { Metadata } from "next";
import "./globals.css";
import { bentonSansPro } from "./fonts";

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
    <html lang="en" className={bentonSansPro.variable}>
      <body className={`${bentonSansPro.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
