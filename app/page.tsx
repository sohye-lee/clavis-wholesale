"use client";
import ProductItem from "@/components/ProductItem";
import { Product } from "@/lib/types";
import useMutation from "@/lib/useMutation";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data?.products));
  }, []);
  return (
    <div className="w-full">
      <h1 className="text-center uppercase text-3xl tracking-wider mb-5">
        Clavis Wholesale
      </h1>
      <p className="text-md mb-16 text-center max-w-[640px] mx-auto">
        Browse our extensive catalog, conveniently place orders using our
        user-friendly order forms, and reach out via our contact page for any
        additional inquiries.
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        {products &&
          products?.length > 0 &&
          products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
