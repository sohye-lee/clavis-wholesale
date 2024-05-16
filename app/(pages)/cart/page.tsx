"use client";
import useStore from "@/app/store";
import { useRef } from "react";
import jsPDF from "jspdf";
import { Product, ProductInfoToOrder } from "@/lib/types";
import {
  IconCalculator,
  IconDownload,
  IconInvoice,
  IconListCheck,
  IconPrinter,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useReactToPrint } from "react-to-print";
import CartItem from "@/components/CartItem";
import CartItemByCollection from "@/components/CartItemByCollection";
import { collections } from "@/lib/constants";
import { numberWithCommas } from "@/lib/utils";
import autoTable from "jspdf-autotable";
import { uuid } from "next-s3-upload";
import RequestInvoiceForm from "@/components/RequestInvoiceForm";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [sendRequestOpen, setSendRequestOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { data, isLoading } = useSWR("/api/products");
  const [productListToOrder, setProductListToOrder] =
    useState<ProductInfoToOrder[]>();
  const [total, setTotal] = useState<number>();
  const { orderList } = useStore();

  const handlePrint = useReactToPrint({
    content: () => ref.current!,
  });

  const today = new Date();

  const generatePdf = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "letter",
    });
    var img: HTMLImageElement = new Image();
    img.src = "logo.png";
    doc.addImage(img, "png", 30, 30, 40, 10);
    doc.text(
      `Invoice Request List ${
        today.getMonth() + 1
      }/${today.getDate()}/${today.getFullYear()}`,
      30,
      60
    );
    autoTable(doc, {
      html: "#table1",
      margin: { top: 80 },
      headStyles: { fillColor: [0, 0, 0] },
    });
    autoTable(doc, { html: "#table2", headStyles: { fillColor: [0, 0, 0] } });
    autoTable(doc, {
      html: "#table3",
      headStyles: { fillColor: [0, 0, 0] },
      tableWidth: 200,
    });

    const filename = `clavis-${Date.now()}.pdf`;
    var blob = doc.output("blob");
    const url = URL.createObjectURL(blob);

    const file = new File([blob], filename);
    window.open(url);

    // return { file: file, filename: filename, url: url };
    // save ? doc.save(filename) : doc.output("pdfobjectnewwindow", { filename });
  };

  let orderListByCollection: { [key: string]: ProductInfoToOrder[] } = {};
  orderList.map((o) => {
    if (!Object.keys(orderListByCollection).includes(o.collection)) {
      orderListByCollection[o.collection] = [o];
    } else {
      orderListByCollection[o.collection].push(o);
    }
  });

  console.log(orderListByCollection);
  let infoByCollection: {
    [key: string]: { TotalMSRP: number; TotalQty: number };
  } = {};

  orderList.map((o) => {
    if (!Object.keys(infoByCollection).includes(o.collection)) {
      infoByCollection[o.collection] = {
        TotalMSRP: o.msrp * o.quantity,
        TotalQty: o.quantity,
      };
    } else {
      const existingInfo = infoByCollection[o.collection];
      infoByCollection[o.collection] = {
        TotalMSRP: existingInfo.TotalMSRP + o.msrp * o.quantity,
        TotalQty: existingInfo.TotalQty + o.quantity,
      };
    }
  });

  const getAfterMarginPrice = (totalQt: number) => {
    return totalQt < 10
      ? 100
      : totalQt >= 10 && totalQt <= 20
      ? 65
      : totalQt > 20 && totalQt <= 40
      ? 60
      : 55;
  };

  let totalWP = 0;
  for (const key in infoByCollection) {
    totalWP +=
      (infoByCollection[key].TotalMSRP *
        getAfterMarginPrice(infoByCollection[key].TotalQty)) /
      100;
  }

  const totalMSRP = orderList
    .map((i) => i.msrp * i.quantity)
    .reduce((a, b) => a + b, 0);

  const handleFormOpen = () => {
    setSendRequestOpen(true);
  };

  let table2HtmlArray = [];
  for (const key in orderListByCollection) {
    const totalQty = orderListByCollection[key]
      .map((o) => Number(o.quantity))
      .reduce((a, b) => a + b, 0);
    const sumMSRP = orderListByCollection[key]
      .map((o) => o.quantity * o.msrp)
      .reduce((a, b) => a + b, 0);

    const collectionHtml = `<tr>
    <td style="padding: 8px 12px; border-top: 1px solid #333;">${key}</td>
    <td style="padding: 8px 12px; border-top: 1px solid #333;">${orderListByCollection[
      key
    ].map((o) => `${o.title} * ${o.quantity}`)}</td>
    <td style="padding: 8px 12px; border-top: 1px solid #333;">${totalQty}</td>
          <td style="padding: 8px 12px; border-top: 1px solid #333;">${
            100 - getAfterMarginPrice(totalQty)
          }%</td>
    <td style="padding: 8px 12px; border-top: 1px solid #333;">${sumMSRP}</td>
    <td style="padding: 8px 12px; border-top: 1px solid #333;">${
      (sumMSRP * getAfterMarginPrice(totalQty)) / 100
    }</td>
    </tr>
    `;
    table2HtmlArray.push(collectionHtml);
  }
  const html = `
  <h1>Invoice Request</h1>
  <table style="border: 1px solid #333;">
  <thead>
  <tr>
  <td style="padding: 8px 12px; font-weight: 500;">Collection</td>
  <td style="padding: 8px 12px; font-weight: 500;">Type</td>
  <td style="padding: 8px 12px; font-weight: 500;">Band</td>
  <td style="padding: 8px 12px; font-weight: 500;">Metal</td>
  <td style="padding: 8px 12px; font-weight: 500;">Quantity</td>
  </tr></thead>
  <tbody>
  ${orderList
    .map(
      (item) => `<tr style="border-top: 1px solid #333;">
  <td style="padding: 8px 12px; border-top: 1px solid #333;">${item.product?.collection}</td>
  <td style="padding: 8px 12px; border-top: 1px solid #333;">${item.product?.type}</td>
  <td style="padding: 8px 12px; border-top: 1px solid #333;">${item.product?.bandColor}</td>
  <td style="padding: 8px 12px; border-top: 1px solid #333;">${item.product?.platingColor}</td>
  <td style="padding: 8px 12px; border-top: 1px solid #333;">${item.quantity}</td>
  </tr>`
    )
    .join("")}
  </tbody>
  </table>
  <h4 style="font-weight: 500;">Itemized Estimate</h4>
  <table style="border: 1px solid #333;">
  <thead>
  <tr>
  <td style="padding: 8px 12px; font-weight: 500;">Collection</td>
  <td style="padding: 8px 12px; font-weight: 500;">Product * Quantity</td>
  <td style="padding: 8px 12px; font-weight: 500;">Total Qty</td>
  <td style="padding: 8px 12px; font-weight: 500;">Margin</td>
  <td style="padding: 8px 12px; font-weight: 500;">Total MSRP</td>
  <td style="padding: 8px 12px; font-weight: 500;">Total WP(*)</td>
  </tr></thead>
  <tbody>
  ${table2HtmlArray.join("")}
  </tbody>
  </table>
  </div>`;

  useEffect(() => {
    data && data?.ok && setProducts(data?.products);
    setProductListToOrder(orderList);
    setMounted(true);
  }, [data, orderList, productListToOrder, products, total]);

  if (mounted)
    return (
      <div className="w-full max-w-3xl relative">
        <div className="w-full" ref={ref}>
          <h1 className="text-3xl mb-4 font-medium" id="pageTitle">
            Order Estimate
          </h1>
          <p className="mb-6 max-w-[550px]">
            Review your selected products and quantities below. <br />
            For a detailed or adjusted invoice based on the products you
            selected, click{" "}
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
          <table className="w-full" id="table1">
            <thead>
              <tr className="border-t border-b border-slate-400 bg-slate-800 text-white">
                <td className="py-2">Image</td>
                <td>Collection</td>
                <td>Product</td>
                <td>Type</td>
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
          <table className="w-full " id="table2">
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

          <table
            className="mt-8 w-full max-w-[300px] border-t border-slate-400 bg-slate-100"
            id="table3"
          >
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
            (*) WP: Wholesale Price
            <br />* Retail / Wholesale price could be changed.
            <br />* Minimum order quantity and margin calculations are based on
            total collected quantities by collection, irrespective of color or
            type.
          </p>
        </div>

        <div className="mt-12 flex gap-3 ">
          <button
            className="bg-purple-500 text-[14px]"
            onClick={handleFormOpen}
          >
            <IconInvoice width={18} />
            Request Invoice
          </button>
          <button className="bg-purple-500 text-[14px]" onClick={handlePrint}>
            <IconPrinter width={18} />
            Print
          </button>
          <button className="bg-purple-500 text-[14px]" onClick={generatePdf}>
            <IconDownload width={18} />
            Download
          </button>
        </div>
        {sendRequestOpen && (
          <RequestInvoiceForm
            setOpen={setSendRequestOpen}
            html={html}
            // generatePdf={generatePdf}
          />
        )}
      </div>
    );
}
