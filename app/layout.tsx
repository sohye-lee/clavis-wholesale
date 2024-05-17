import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { create } from "zustand";
import { ProductInfoToOrder } from "@/lib/types";
import useSWR, { SWRConfig } from "swr";
import Providers from "./providers";
import Script from "next/script";
import MobileBottomHeader from "@/components/MobileBottomHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clavis Wholesale",
  description: "Clavis for Retail",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${inter.className} relative`}>
        <Header />
        <Providers>
          <main className=" z-[1] flex min-h-screen flex-col items-center pt-20 pb-40 sm:pb-28 sm:pt-28 w-full px-4">
            <div className="w-full max-w-6xl flex flex-col items-center">
              {children}
            </div>
          </main>
        </Providers>
        <Footer />
        <MobileBottomHeader />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
          integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
        />
      </body>
    </html>
  );
}
