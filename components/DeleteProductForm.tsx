"use client";
import useMutation from "@/lib/useMutation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect } from "react";

export default function DeleteProductForm({
  productId,
  setDeleted,
}: {
  productId: string;
  //   router: AppRouterInstance;
  setDeleted: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [deleteProduct, { data, error, loading }] = useMutation(
    `/api/products/${productId}`,
    "DELETE"
  );

  const handleDelete = () => {
    deleteProduct({ productId });
  };
  useEffect(() => {
    if (data && data?.ok) {
      alert(data?.message);
      router.refresh();
      router.push("/admin/products");
      setDeleted(true);
    }
  }, [data, router, data?.ok, data?.product, setDeleted]);
  return (
    <button
      onClick={handleDelete}
      className="px-2 py-1 m-0 text-sm border tracking-normal  bg-white border-red-400 rounded text-red-500 hover:bg-slate-800 hover:text-white"
    >
      Delete
    </button>
  );
}
