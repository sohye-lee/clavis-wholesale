"use client";
import { IconTrash, IconX } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import useSWR from "swr";
import SmallLoader from "./SmallLoader";
import useStore from "@/app/store";
import { capitalize, numberWithCommas } from "@/lib/utils";

export default function CartItem({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const { data } = useSWR(`/api/products/${productId}`);
  const { orderList, deleteItemFromList, clearOrderList } = useStore();

  return (
    <>
      {data?.product ? (
        <tr className="border-b border-slate-400">
          <td>
            <div className="w-16 h-16 relative py-1">
              <Image
                fill
                src={data?.product?.thumbnail}
                alt=""
                className="object-cover"
              />
            </div>
          </td>
          <td>{capitalize(data?.product?.collection)}</td>
          <td>{data?.product?.title}</td>
          <td>{capitalize(data?.product?.type)}</td>
          <td>{data?.product?.bandColor}</td>
          <td>{data?.product?.platingColor}</td>
          <td>${numberWithCommas(data?.product?.msrp)}</td>
          <td>{quantity}</td>
          <td className="max-w-[50px]">
            <button
              className="m-0 bg-white p-2 hover:bg-slate-100 text-red-400"
              onClick={() => deleteItemFromList(productId)}
            >
              <IconTrash size="16" />
            </button>
          </td>
        </tr>
      ) : (
        <tr className="border-b border-slate-400">
          <td className="py-2 px-1">
            <div className="w-full min-h-[42px] bg-slate-100 rounded-md animate-pulse"></div>
          </td>
          <td className="py-2 px-1">
            <div className="w-full min-h-[42px] bg-slate-100 rounded-md animate-pulse"></div>
          </td>
          <td className="py-2 px-1">
            <div className="w-full min-h-[42px] bg-slate-100 rounded-md animate-pulse"></div>
          </td>
          <td className="py-2 px-1">
            <div className="w-full min-h-[42px] bg-slate-100 rounded-md animate-pulse"></div>
          </td>
          <td className="py-2 px-1">
            <div className="w-full min-h-[42px] bg-slate-100 rounded-md animate-pulse"></div>
          </td>
          <td className="py-2 px-1">
            <div className="w-full min-h-[42px] bg-slate-100 rounded-md animate-pulse"></div>
          </td>
          <td className="py-2 px-1">
            <div className="w-full min-h-[42px] bg-slate-100 rounded-md animate-pulse"></div>
          </td>
          <td className="py-2 px-1">
            <div className="w-full min-h-[42px] bg-slate-100 rounded-md animate-pulse"></div>
          </td>
          <td className="py-2 px-1">
            <div className="w-full min-h-[42px] bg-slate-100 rounded-md animate-pulse"></div>
          </td>
        </tr>
      )}
    </>
  );
}
