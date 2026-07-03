import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Magic City Casino Parties | Casino Party Rentals Birmingham, AL",
  description:
    "Full-service casino entertainment for corporate nights, fundraisers, weddings and private events across Birmingham & Central Alabama.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${serif.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
