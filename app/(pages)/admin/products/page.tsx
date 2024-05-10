"use client";
import DeleteProductForm from "@/components/DeleteProductForm";
import { Product } from "@/lib/types";
import useMutation from "@/lib/useMutation";
import { capitalize } from "@/lib/utils";
import { IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>();
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data?.products));
    deleted && router.refresh();
  }, [deleted, router]);
  return (
    <div className="w-full">
      <h1 className="text-2xl mb-8 font-medium">All Products</h1>
      <div className="">
        <Link href="/admin/products/new" className="float-right btn mb-3">
          Add New
        </Link>
      </div>
      <div className="w-full">
        <table className="w-full">
          <thead>
            <tr className="border-b border-t border-slate-400">
              <td className="py-3 px-2">Image</td>
              <td>Title</td>
              <td>Type</td>
              <td>Collection</td>
              <td>Band Color</td>
              <td>Plating Color</td>
              <td>Price</td>
              <td>MSRP</td>
              <td>Website</td>
              <td>Manage</td>
            </tr>
          </thead>
          <tbody>
            {products &&
              products?.length > 0 &&
              products.map((product) => (
                <tr key={product?.id} className="border-b border-slate-400">
                  <td>
                    <div className="aspect-square relative overflow-hidden w-12">
                      {product?.thumbnail && (
                        <Image
                          alt={product?.title}
                          src={product?.thumbnail}
                          fill
                        />
                      )}
                    </div>
                  </td>
                  <td>{product?.title}</td>
                  <td>{capitalize(product?.type)}</td>
                  <td>{product?.collection}</td>
                  <td>{product?.bandColor}</td>
                  <td>{product?.platingColor}</td>
                  <td>${product?.price}</td>
                  <td>${product?.msrp}</td>
                  <td>
                    <a href={product?.link}>
                      <IconExternalLink />
                    </a>
                  </td>
                  <td>
                    <div className="inline-flex gap-2">
                      <Link
                        href={`/admin/products/edit/${product?.id}`}
                        className="btn bg-white m-0 text-slate-700 px-2 py-1 border text-sm border-slate-400 rounded hover:bg-slate-800 hover:text-white"
                      >
                        Edit
                      </Link>
                      <DeleteProductForm
                        productId={product?.id}
                        setDeleted={setDeleted}
                        // router={router}
                      />
                      {/* <a
                        href={`/admin/products/edit/${product?.id}`}
                        className="px-2 py-1 text-sm border border-red-400 rounded text-red-500 hover:bg-slate-800 hover:text-white"
                      >
                        Delete
                      </a> */}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
