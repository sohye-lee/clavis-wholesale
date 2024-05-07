import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center p-24">
          <div className="w-full max-w-3xl flex flex-col items-center">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
