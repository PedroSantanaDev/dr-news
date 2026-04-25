import type { Metadata } from "next";
import { Inter, Merriweather, Geist } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "DR Noticias App",
  description: "Noticias sobre la Republica Dominicana",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} ${merriweather.variable} font-sans bg-gray-50 min-h-screen text-gray-900`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}