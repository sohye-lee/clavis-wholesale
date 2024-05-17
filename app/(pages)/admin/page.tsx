"use client";
import AdminPWForm from "@/components/AdminPWForm";
import { env } from "@/env";
import { collections, productTypes } from "@/lib/constants";
import { Product } from "@/lib/types";
import { capitalize } from "@/lib/utils";
import { IconEyeEdit, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

export default function AdminPage() {
  const { data } = useSWR("/api/products");

  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const stored_pw = localStorage.getItem("admin_verified") || "";
    const admin_verified = JSON.parse(stored_pw) == env.ADMIN_PASSWORD;
    admin_verified && setVerified(true);
  }, []);

  if (!verified) return <AdminPWForm setVerified={setVerified} />;
  return (
    <div className="w-full  grid lg:grid-cols-4 gap-3">
      <div className="flex flex-col gap-5 col-span-1 px-5 py-4 bg-gray-50 border border-slate-200 rounded-md">
        <h1 className="text-xl uppercase font-medium flex items-center gap-2">
          Categories{" "}
          <span className="text-xs text-white inline-flex items-center justify-center  w-6 h-6 rounded-full bg-purple-700">
            {collections.length}
          </span>
        </h1>

        <div className="flex flex-col gap-2">
          {collections.map((c) => (
            <p className="text-md" key={c}>
              {capitalize(c)}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5 col-span-1 px-5 py-4 bg-gray-50 border border-slate-200 rounded-md">
        <h1 className="text-xl uppercase font-medium flex items-center gap-2">
          Product Types{" "}
          <span className="text-xs text-white inline-flex items-center justify-center  w-6 h-6 rounded-full bg-purple-700">
            {productTypes.length}
          </span>
        </h1>
        <div className="flex flex-col gap-2">
          {productTypes.map((c) => (
            <p className="text-md" key={c}>
              {capitalize(c)}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5 col-span-2 px-5 py-4 bg-gray-50 border border-slate-200 rounded-md">
        <div className="flex items-center justify-between">
          <h1 className="text-xl uppercase font-medium flex items-center gap-2">
            Products{" "}
            {data && data?.ok && data?.products && (
              <span className="text-xs text-white inline-flex items-center justify-center  w-6 h-6 rounded-full bg-purple-700">
                {data?.products?.length}
              </span>
            )}
          </h1>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/products/new"
              className="btn px-2 py-1 text-sm m-0"
            >
              <IconPlus width={18} />{" "}
            </Link>
            <Link href="/admin/products" className="btn px-2 py-1 text-sm m-0">
              <IconEyeEdit width={18} />{" "}
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {data &&
            data?.ok &&
            data?.products.map((p: Product) => (
              <p className="text-md" key={p.id}>
                {p.title}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
