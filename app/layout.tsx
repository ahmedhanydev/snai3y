import "./globals.css";

import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { Toaster } from "sonner";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import TanStackProvider from "@/providers/TanStackProvider";

// Configure the Cairo font
const cairo = Cairo({
  subsets: ["arabic", "latin"], // Include necessary subsets
  weight: ["400", "700"], // Specify weights you need
  variable: "--font-cairo", // Optional: CSS variable for custom usage
});

export const metadata: Metadata = {
  title: "Snai3y",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${cairo.className} antialiased`}>
        <Navbar />

        <TanStackProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </TanStackProvider>

        <Footer />
      </body>
    </html>
  );
}
