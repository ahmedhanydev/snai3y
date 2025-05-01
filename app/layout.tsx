import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cairo } from 'next/font/google';
import TanStackProvider from "@/providers/TanStackProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configure the Cairo font
const cairo = Cairo({
  subsets: ['arabic', 'latin'], // Include necessary subsets
  weight: ['400', '700'], // Specify weights you need
  variable: '--font-cairo', // Optional: CSS variable for custom usage
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
      <body
        className={` ${cairo.className} antialiased`}
      >

        <Navbar/>

        <TanStackProvider>
      {children}
    </TanStackProvider>
        
        <Footer/>
      </body>
    </html>
  );
}
