"use client";
import ProductItem from "@/components/ProductItem";
import { Product, ProductInfoToOrder } from "@/lib/types";
import useMutation from "@/lib/useMutation";
import { FormEvent, useEffect, useState } from "react";
import useStore from "./store";
import useSWR from "swr";
import { collections, productTypes } from "@/lib/constants";
import { capitalize } from "@/lib/utils";

const initialList: ProductInfoToOrder[] = [];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { data, isLoading } = useSWR("/api/products");
  const [productListToOrder, setProductListToOrder] =
    useState<ProductInfoToOrder[]>(initialList);
  const [total, setTotal] = useState<number>();
  const { orderList } = useStore();

  const [collection, setCollection] = useState("");
  const [type, setType] = useState("");

  const handleCollectionChange = (e: FormEvent) => {
    e.preventDefault();
    setCollection((e.target as HTMLSelectElement).value);
  };

  const handleTypeChange = (e: FormEvent) => {
    e.preventDefault();
    setType((e.target as HTMLSelectElement).value);
  };

  useEffect(() => {
    data && data?.ok && setProducts(data?.products);
    products &&
      products?.length > 0 &&
      setTotal(products.map((p) => p.price).reduce((a, b) => a + b));
    setProductListToOrder(orderList);
  }, [data, orderList, productListToOrder, products, total, collection, type]);

  return (
    <div className="w-full">
      <h1 className="text-center uppercase text-3xl tracking-wider mb-5">
        Clavis Wholesale
      </h1>
      <p className="text-md mb-12 text-center max-w-[640px] mx-auto">
        Browse our extensive catalog, conveniently place orders using our
        user-friendly order forms, and reach out via our contact page for any
        additional inquiries.
      </p>
      <div className="mb-5 flex items-center justify-center gap-3">
        <div>
          <select
            className={`border-2 outline-none py-2 ${
              collection != "" && "bg-purple-700 border-purple-700"
            } border-black bg-black text-white text-sm`}
            onChange={handleCollectionChange}
          >
            <option value="">Collection</option>
            {collections.map((c, i) => (
              <option key={i} value={c}>
                {capitalize(c)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className={`border-2 outline-none py-2 ${
              type != "" && "bg-purple-700 border-purple-700"
            } border-black bg-black text-white text-sm`}
            onChange={handleTypeChange}
          >
            <option value="">Type</option>
            {productTypes.map((p, i) => (
              <option key={i} value={p}>
                {capitalize(p)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
        {products &&
          products?.length > 0 &&
          products
            .filter((p) =>
              collection && collection != "" ? p.collection === collection : p
            )
            .filter((p) => (type && type != "" ? p.type === type : p))
            .map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                setProductListToOrder={setProductListToOrder}
                productListToOrder={productListToOrder}
              />
            ))}
      </div>
    </div>
  );
}
