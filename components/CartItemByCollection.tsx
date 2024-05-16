"use client";
import React from "react";
import useSWR from "swr";
import { capitalize, numberWithCommas } from "@/lib/utils";
import { ProductInfoToOrder } from "@/lib/types";

export default function CartItemByCollection({
  orderInfoList,
  collection,
}: {
  collection: string;
  orderInfoList: ProductInfoToOrder[];
}) {
  const { data } = useSWR(`/api/${collection}`);
  const totalQt = orderInfoList
    .map((i) => i.quantity)
    .reduce((a, b) => a + b, 0);

  const totalMSRP = orderInfoList
    .map((i) => i.msrp * i.quantity)
    .reduce((a, b) => a + b, 0);

  let afterMargin =
    totalQt < 10
      ? 100
      : totalQt >= 10 && totalQt <= 20
      ? 65
      : totalQt > 20 && totalQt <= 40
      ? 60
      : 55;

  return (
    <>
      {orderInfoList ? (
        <tr className="border-b border-slate-400">
          <td>{capitalize(collection)}</td>
          <td>
            {orderInfoList.map((i) => (
              <p key={i.productId}>
                {i.title} * {i.quantity}
              </p>
            ))}
          </td>
          <td>{totalQt}</td>
          <td>
            {100 - afterMargin}%
            <p className="text-xs text-slate-500">
              {totalQt < 10 && "MOQ = 10"}
            </p>
          </td>
          <td>${numberWithCommas(totalMSRP)}</td>
          <td>
            $
            {numberWithCommas(
              Math.round(((totalMSRP * afterMargin) / 100) * 100) / 100
            )}
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
        </tr>
      )}
    </>
  );
}
