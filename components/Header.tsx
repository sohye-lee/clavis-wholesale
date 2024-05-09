"use client";
import React, { useState } from "react";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import Image from "next/image";
import {
  IconBook2,
  IconHelp,
  IconHistory,
  IconShoppingBag,
} from "@tabler/icons-react";

export default function Header() {
  const [orderList, setOrderList] = useState();
  return (
    <div className="w-full fixed top-0 left-0 bg-white py-2 px-4 border-b border-slate-400 flex justify-center">
      <div className="w-full max-w-6xl ">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image alt="logo" width="400" src={Logo} className="w-24" />
          </Link>
          <div className="flex items-end gap-5">
            <Link
              href="/"
              className="flex flex-col items-center gap-[2px] text-slate-600"
            >
              <IconBook2 className="" size="28" />
              <span className="text-[12px]">Catalog</span>
            </Link>
            <Link
              href="/"
              className="flex flex-col items-center gap-[2px] text-slate-600"
            >
              <IconShoppingBag className="" size="28" />
              <span className="text-[12px]">Cart</span>
            </Link>
            <Link
              href="/contact"
              className="flex flex-col items-center gap-[2px] text-slate-600"
            >
              <IconHelp className="" size="28" />
              <span className="text-[12px]">Contact</span>
            </Link>
            <Link
              href="/orders"
              className="flex flex-col items-center gap-[2px] text-slate-600"
            >
              <IconHistory className="" size="28" />
              <span className="text-[12px]">Orders</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}