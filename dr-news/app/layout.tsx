import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';

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
    <html lang="es">
      <body className={`${inter.variable} ${merriweather.variable} font-sans bg-gray-50 min-h-screen text-gray-900`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}