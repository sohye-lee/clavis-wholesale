"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  IconBook2,
  IconHelp,
  IconListDetails,
  IconShoppingBag,
} from "@tabler/icons-react";
import useStore from "@/app/store";

export default function MobileBottomHeader() {
  const { orderList } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return;
  return (
    <div className="flex sm:hidden bg-white border-t border-slate-300  fixed w-screen bottom-0 left-0 z-[1000] min-h-[60px] items-center justify-center px-4">
      <div className="flex gap-5 justify-between">
        <Link
          href="/"
          className="flex flex-col items-center gap-[2px] text-slate-600 text-[12px]"
        >
          <IconBook2 className="" size="20" />
          Catalog
        </Link>
        <Link
          href="/pricesheet"
          className="flex flex-col items-center gap-[2px] text-slate-600 text-[12px]"
        >
          <IconListDetails className="" size="20" />
          Pricesheet
        </Link>
        <Link
          href="/cart"
          className="relative flex flex-col items-center gap-[2px] text-slate-600 text-[12px]"
        >
          {orderList.length > 0 && (
            <span className="absolute top-[10%] left-[50%] translate-x-1 w-5 h-5 rounded-full text-white bg-purple-600 flex items-center justify-center text-[10px]">
              {orderList && orderList.length}
            </span>
          )}
          <IconShoppingBag className="" size="20" />
          Estimate
        </Link>
        <Link
          href="/contact"
          className="flex flex-col items-center gap-[2px] text-slate-600 text-[12px]"
        >
          <IconHelp className="" size="20" />
          Contact
        </Link>
      </div>
    </div>
  );
}
