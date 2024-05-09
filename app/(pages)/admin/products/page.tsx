"use client";
import { Product } from "@/lib/types";
import { IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>();
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data?.products));
  }, []);
  return (
    <div className="w-full">
      <h1 className="text-2xl mb-12 font-medium">All Products</h1>
      <div className="w-full">
        <table className="w-full">
          <thead>
            <tr className="border-b border-t border-slate-400">
              <td className="py-3 px-2">Image</td>
              <td>Title</td>
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
                  <td>{product?.bandColor}</td>
                  <td>{product?.platingColor}</td>
                  <td>{product?.price}</td>
                  <td>{product?.msrp}</td>
                  <td>
                    <a href={product?.link}>
                      <IconExternalLink />
                    </a>
                  </td>
                  <td>
                    <div className="inline-flex gap-2">
                      <a
                        href={`/admin/products/edit/${product?.id}`}
                        className="px-2 py-1 border text-sm border-slate-400 rounded hover:bg-slate-800 hover:text-white"
                      >
                        Edit
                      </a>
                      <a
                        href={`/admin/products/edit/${product?.id}`}
                        className="px-2 py-1 text-sm border border-red-400 rounded text-red-500 hover:bg-slate-800 hover:text-white"
                      >
                        Delete
                      </a>
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
