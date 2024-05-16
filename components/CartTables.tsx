import useStore from "@/app/store";
import { IconCalculator, IconListCheck } from "@tabler/icons-react";
import React, { LegacyRef, Ref, forwardRef } from "react";
import CartItem from "./CartItem";
import { collections } from "@/lib/constants";
import CartItemByCollection from "./CartItemByCollection";
import { numberWithCommas } from "@/lib/utils";

interface CartTablesProps {
  totalMSRP: number;
  totalWP: number;
  ref: Ref<HTMLDivElement>;
}

export default forwardRef(function CartTables({
  totalMSRP,
  totalWP,
  ref,
}: CartTablesProps) {
  const { orderList } = useStore();
  return (
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
            <td className="font-semibold text-[15px]">
              ${numberWithCommas(totalWP)}
            </td>
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
            <td>&lt;= 9</td>
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
            <td>&gt;= 41</td>
            <td>45%</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-5 text-sm text-slate-600 max-w-[500px]">
        (*) Wholesale Price
        <br />* Retail / Wholesale price could be changed.
        <br />* Minimum order quantity and margin calculations are based on
        total collected quantities by collection, irrespective of color or type.
      </p>
    </div>
  );
});
