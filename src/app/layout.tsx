import type { Metadata } from "next";
import { Rajdhani, Geist_Mono } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Military Logistics Platform",
  description: "Blockchain-based checkpoint tracking and audit system for tactical operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rajdhani.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
