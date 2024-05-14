"use client";
import useStore from "@/app/store";
import CartItem from "@/components/CartItem";
import { Product, ProductInfoToOrder } from "@/lib/types";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

export default function CartPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { data, isLoading } = useSWR("/api/products");
  const [productListToOrder, setProductListToOrder] =
    useState<ProductInfoToOrder[]>();
  const [total, setTotal] = useState<number>();
  const { orderList } = useStore();
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
      <h1 className="text-2xl mb-4 font-medium">Order Estimate</h1>
      <p className="mb-4 max-w-2xl">
        Review your selected products and quantities below. <br />
        For a detailed or adjusted invoice, click &apos;Request Estimate&apos;.
        <br />
        We&apos;re here to help tailor your order to your needs.
      </p>
      <table className="w-full">
        <thead>
          <tr className="border-t border-b border-slate-400 bg-slate-800 text-white">
            <td className="py-3">Image</td>
            <td>Product</td>
            <td>
              Band
              <br />
              Color
            </td>
            <td>
              Metal
              <br />
              Color
            </td>
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
          <tr className="  border-b border-t  border-slate-400 bg-slate-200 ">
            <td className="py-3 font-semibold text-right pr-5" colSpan={4}>
              Total
            </td>
            <td className="py-3 font-semibold ">
              $
              {data?.products && data?.products?.length > 0
                ? data?.products
                    ?.map((p: Product) => p.msrp)
                    .reduce((a: number, b: number) => a + b)
                : 0}
            </td>
            <td className="py-3 font-semibold ">
              {" "}
              {orderList && orderList.length > 0
                ? orderList
                    .map((p) => p.quantity)
                    .reduce((a: number, b: number) => a + b)
                : 0}
            </td>
            <td className="max-w-[80px]"></td>
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <td></td>
          </tr>
        </thead>
      </table>
    </div>
  );
}
