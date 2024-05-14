"use client";
import React, { useState } from "react";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { IconBook2, IconHelp, IconShoppingBag } from "@tabler/icons-react";
import useStore from "@/app/store";

export default function Header() {
  const { orderList, addToOrderList, deleteItemFromList, clearOrderList } =
    useStore();

  return (
    <div className="w-full z-[1000] fixed top-0 left-0 bg-white py-2 px-4 border-b border-slate-400 flex justify-center">
      <div className="w-full max-w-6xl bg-white ">
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
              <p className="text-[12px]">Catalog</p>
            </Link>
            <Link
              href="/cart"
              className="relative flex flex-col items-center gap-[2px] text-slate-600"
            >
              {orderList.length > 0 && (
                <p className="absolute top-[10%] left-[50%] translate-x-1 w-5 h-5 rounded-full text-white bg-purple-600 flex items-center justify-center text-[10px]">
                  {orderList && orderList.length}
                </p>
              )}
              <IconShoppingBag className="" size="28" />
              <span className="text-[12px]">Estimate</span>
            </Link>
            <Link
              href="/contact"
              className="flex flex-col items-center gap-[2px] text-slate-600"
            >
              <IconHelp className="" size="28" />
              <p className="text-[12px]">Contact</p>
            </Link>
            {/* <Link
              href="/orders"
              className="flex flex-col items-center gap-[2px] text-slate-600"
            >
              <IconHistory className="" size="28" />
              <span className="text-[12px]">Orders</span>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
