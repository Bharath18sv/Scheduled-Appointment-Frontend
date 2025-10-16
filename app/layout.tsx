import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hospital Appointment Scheduler",
  description:
    "Professional appointment scheduling system for hospitals and medical practices",
  keywords: ["hospital", "appointments", "scheduling", "medical", "healthcare"],
  authors: [{ name: "Hospital Scheduler Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased bg-gray-50">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
