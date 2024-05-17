"use client";
import FullLoader from "@/components/FullLoader";
import { Product } from "@/lib/types";
import { capitalize } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import useSWR from "swr";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import { IconFileDownload, IconPdf } from "@tabler/icons-react";

export default function LinesheetPage() {
  const { data, isLoading } = useSWR("/api/products");

  return (
    <>
      {isLoading ? (
        <FullLoader />
      ) : (
        <div className="w-full flex justify-center">
          <div className="w-full max-w-3xl flex items-center flex-col">
            <div className="flex justify-center flex-col items-center gap-2 mb-8">
              <h1 className="text-2xl font-medium text-center ">Pricesheet</h1>
              <Link
                href="/clavis_pricesheet.pdf"
                target="_blank"
                className="btn mb-0"
              >
                <IconFileDownload width={16} /> Dowload Pdf
              </Link>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2">
              {data &&
                data?.ok &&
                data?.products &&
                data?.products?.map((p: Product) => (
                  <div
                    key={p.id}
                    className="border-t border-slate-300 py-2 flex items-stretch gap-3 w-full"
                  >
                    <div className="aspect-square relative w-1/3 max-w-[100px] md:max-w-[160px] bg-slate-50">
                      <Image
                        src={p.thumbnail || "/public/no-image.png"}
                        alt={p.title}
                        fill
                      />
                    </div>
                    <div className="flex flex-col gap-2 justify-between">
                      <div>
                        <p className="text-sm text-slate-400">
                          {p.collection &&
                            p.collection != "" &&
                            `${capitalize(p.collection)} | `}
                          {capitalize(p.type)}
                        </p>
                        <h3 className="text-xl font-medium uppercase tracking-wide">
                          {p.title}
                        </h3>

                        <p className="text-md">
                          {/* WSP ${product.price} |{' '} */}
                          <span className=" ">MSRP ${p.msrp}</span>
                        </p>
                      </div>
                      <div>
                        {p.bandColor && (
                          <p className="text-sm text-slate-500">
                            Band Color: {p.bandColor}
                          </p>
                        )}
                        {p.platingColor && p.platingColor != "N/A" && (
                          <p className="text-sm text-slate-500">
                            Plating Color: {p.platingColor}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
