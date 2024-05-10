import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { create } from "zustand";
import { ProductInfoToOrder } from "@/lib/types";
import useSWR, { SWRConfig } from "swr";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clavis Wholesale",
  description: "Clavis for Retail",
};

const useOrderListStore = create((set) => ({
  orderList: [],
  addToOrderList: (productId: string, quantity: number) =>
    set((prev: ProductInfoToOrder[]) => ({
      orderList: [
        ...prev.filter((item) => item?.productId != productId),
        { productId, quantity },
      ],
    })),
  deleteItemFromList: (productId: string) =>
    set((prev: ProductInfoToOrder[]) => ({
      orderList: [...prev.filter((item) => item.productId !== productId)],
    })),
  clearOrderList: () => set({ OrderList: [] }),
}));

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
          <main className="relative z-[1] flex min-h-screen flex-col items-center py-28 w-full px-4">
            <div className="w-full max-w-6xl flex flex-col items-center">
              {children}
            </div>
          </main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
