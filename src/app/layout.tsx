// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Poppins, DM_Sans } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/ui/navbar"; // uses the shim we added

// ---------- Fonts ----------
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ---------- Metadata ----------
export const metadata: Metadata = {
  title: "MyCoder Found - Empowering Communities Through Technology",
  description:
    "Welcome to the MyCoder Ecosystem - Connecting youth, entrepreneurs, and communities through digital literacy, AI solutions, and personal profiles.",
  keywords: [
    "MyCoder",
    "Digital Literacy",
    "AI Agency",
    "Youth Education",
    "Community Development",
    "Technology",
  ],
  authors: [{ name: "MyCoder Team" }],
  openGraph: {
    title: "MyCoder Found - Digital Ecosystem",
    description:
      "Empowering disconnected communities with tools to thrive through technology",
    url: "https://mycoderfound.org",
    siteName: "MyCoderFOUND",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyCoder Found - Digital Ecosystem",
    description:
      "Empowering disconnected communities with tools to thrive through technology",
  },
};

// ---------- Root Layout (single export) ----------
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${poppins.variable} ${dmSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-slate-950 text-slate-100`}
      >
        <Navbar />
        {/* ✅ account for sticky header */}
        <main className="min-h-[100dvh] pt-16">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
