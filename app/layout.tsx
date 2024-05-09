import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        <main className="relative z-[1] flex min-h-screen flex-col items-center pt-28 w-full px-4">
          <div className="w-full max-w-6xl flex flex-col items-center">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
