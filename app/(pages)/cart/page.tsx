"use client";
import useStore from "@/app/store";
import CartItem from "@/components/CartItem";
import CartItemByCollection from "@/components/CartItemByCollection";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { collections } from "@/lib/constants";
import { Product, ProductInfoToOrder } from "@/lib/types";
import {
  IconCalculator,
  IconInvoice,
  IconListCheck,
  IconPrinter,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { uuid } from "next-s3-upload";
import { numberWithCommas } from "@/lib/utils";

export default function CartPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { data, isLoading } = useSWR("/api/products");
  const [productListToOrder, setProductListToOrder] =
    useState<ProductInfoToOrder[]>();
  const [total, setTotal] = useState<number>();
  const { orderList } = useStore();

  const handleGeneratePdf = async () => {
    const inputData = ref.current;
    try {
      const canvas = await html2canvas(inputData!);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "letter",
        hotfixes: ["px_scaling"],
      });

      const width = pdf.internal.pageSize.getWidth() - 60;
      const height = (canvas.height * width) / canvas.width - 60;

      pdf.addImage(imgData, "PNG", 30, 30, width, height);
      pdf.setFont("Inter");
      pdf.save(`${uuid()}.pdf`);
    } catch (error) {
      console.log(error);
    }
  };
  const margin = (totalQt: number) => {
    return totalQt < 0
      ? 1
      : totalQt >= 10 && totalQt <= 20
      ? 0.65
      : totalQt > 20 && totalQt <= 40
      ? 0.6
      : 0.55;
  };
  const totalWP = Object.groupBy(orderList, (item) => item.collection);
  console.log(totalWP);
  const totalMSRP = orderList
    .map((i) => i.msrp * i.quantity)
    .reduce((a, b) => a + b, 0);

  useEffect(() => {
    data && data?.ok && setProducts(data?.products);
    products &&
      products?.length > 0 &&
      setTotal(
        products ? products.map((p) => p.price).reduce((a, b) => a + b) : 0
      );
    setProductListToOrder(orderList);
  }, [data, orderList, productListToOrder, products, total]);
  return (
    <div className="w-full max-w-3xl">
      <div className="w-full" ref={ref}>
        <h1 className="text-3xl mb-4 font-medium">Order Estimate</h1>
        <p className="mb-6 max-w-[550px]">
          Review your selected products and quantities below. <br />
          For a detailed or adjusted invoice based on the products you selected,
          click{" "}
          <span className="font-semibold text-purple-500">
            &apos;Request Invoice&apos;
          </span>{" "}
          in the bottom.
          <br />
          We&apos;re here to help tailor your order to your needs.
        </p>
        <h3 className="mt-3 mb-2 font-medium text-xl flex items-center gap-3">
          <IconListCheck width={20} />
          Selected Products
        </h3>
        <table className="w-full">
          <thead>
            <tr className="border-t border-b border-slate-400 bg-slate-800 text-white">
              <td className="py-2">Image</td>
              <td>Collection</td>
              <td>Product</td>
              <td>Band</td>
              <td>Metal</td>
              <td>MSRP</td>
              <td>Quantity</td>
              <td className="max-w-[80px]"></td>
            </tr>
          </thead>
          <tbody>
            {orderList &&
              orderList.map((item) => {
                return (
                  <CartItem
                    key={item.productId}
                    productId={item.productId}
                    quantity={item.quantity}
                  />
                );
              })}
          </tbody>
        </table>
        <h3 className="mt-10 mb-2 font-medium text-xl flex items-center gap-3">
          <IconCalculator width={20} />
          Itemized Estimate
        </h3>
        <table className="w-full ">
          <thead>
            <tr className="border-t border-b border-slate-400 bg-slate-800 text-white">
              <td>Collection</td>
              <td>Product * Quantity</td>
              <td>Total Qty</td>
              <td>Margin</td>
              <td>Total MSRP</td>
              <td>Total WP(*)</td>
            </tr>
          </thead>
          <tbody>
            {collections.map((collection) => {
              if (!orderList.map((i) => i.collection).includes(collection))
                return null;
              return (
                <CartItemByCollection
                  key={collection}
                  collection={collection}
                  orderInfoList={orderList.filter(
                    (o) => o.collection == collection
                  )}
                />
              );
            })}
            <tr className="  border-b border-t  border-slate-400 bg-slate-200 ">
              <td className="font-semibold text-[15px]" colSpan={4}>
                Total
              </td>
              <td className="font-semibold text-[15px]">
                ${numberWithCommas(totalMSRP)}
              </td>
              <td className="font-semibold text-[15px]">{}</td>
            </tr>
          </tbody>
        </table>

        <table className="mt-8 w-full max-w-[300px] border-t border-slate-400 bg-slate-100">
          <thead>
            <tr className="border-b bg-slate-300 border-b-slate-400">
              <td className="font-medium">Order Qty (MOQ: 10 Unites)</td>
              <td className="font-medium">Margin</td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-b-slate-400">
              <td>&lt; 9</td>
              <td>N/A</td>
            </tr>
            <tr className="border-b border-b-slate-400">
              <td>10 - 20</td>
              <td>35%</td>
            </tr>
            <tr className="border-b border-b-slate-400">
              <td>21 - 40</td>
              <td>40%</td>
            </tr>
            <tr className="border-b border-b-slate-400">
              <td>&gt; 41</td>
              <td>45%</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-5 text-sm text-slate-600 max-w-[500px]">
          (*) Wholesale Price
          <br />* Retail / Wholesale price could be changed.
          <br />* Minimum order quantity and margin calculations are based on
          total collected quantities by collection, irrespective of color or
          type.
        </p>
      </div>
      <div className="mt-12 flex gap-3 ">
        <button className="bg-purple-500 text-[14px]">
          <IconInvoice width={18} />
          Request Invoice
        </button>
        <button
          className="bg-purple-500 text-[14px]"
          onClick={handleGeneratePdf}
        >
          <IconPrinter width={18} />
          Print Estimate
        </button>
      </div>
    </div>
  );
}
