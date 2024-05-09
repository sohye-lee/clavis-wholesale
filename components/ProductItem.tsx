"use client";
import { Product, ProductInfoToOrder } from "@/lib/types";
import { capitalize } from "@/lib/utils";
import { IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface ProductItemProps {
  product: Product;
  setProductListToOrder: Dispatch<SetStateAction<ProductInfoToOrder[]>>;
  productListToOrder: ProductInfoToOrder[];
}

export default function ProductItem({
  product,
  setProductListToOrder,
  productListToOrder,
}: ProductItemProps) {
  const [quantity, setQuantity] = useState<number>(0);
  const handleAddToCart = (e: FormEvent) => {
    e.preventDefault();
    const newList = productListToOrder.filter(
      (item) => item?.productId != product.id
    );
    setProductListToOrder(
      (prev) => [
        ...prev.filter((item) => item?.productId != product.id),
        { productId: product.id, quantity },
      ]
      //   [
      //   ...prev,
      //   { productId: product.id, quantity },
      // ]
    );
  };
  return (
    <div className="relative z-10 bg-white p-4 border border-slate-300 hover:border-slate-500 rounded-lg flex flex-col md:flex-row md:items-stretch gap-3">
      <div className="aspect-square relative w-full md:w-1/2  bg-stone-200">
        <Image
          src={product.thumbnail || ""}
          alt={product.title}
          className="object-fill"
          fill
        />
      </div>
      <div className="flex flex-col gap-2 justify-between w-full md:w-1/2 md:h-full">
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-sm text-slate-400">{capitalize(product.type)}</p>
            <h3 className="text-lg uppercase tracking-wide">{product.title}</h3>

            <p className="text-lg">
              WSP ${product.price} |{" "}
              <span className=" ">MSRP ${product.msrp}</span>
            </p>
          </div>
          <div>
            {product.bandColor && (
              <p className="text-sm text-slate-500">
                Band Color: {product.bandColor}
              </p>
            )}
            {product.platingColor && (
              <p className="text-sm text-slate-500">
                Plating Color: {product.platingColor}
              </p>
            )}
          </div>
        </div>
        <div>
          <form className="flex items-stretch gap-1 mt-3">
            <input
              type="number"
              className="w-16 pl-3 pr-0 py-1"
              value={quantity}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setQuantity(Number((e.target as HTMLInputElement).value))
              }
            />
            <button onClick={handleAddToCart} className="py-2 px-3 m-0">
              Add
            </button>
          </form>
        </div>
      </div>
      {product.link && (
        <button className="absolute bottom-3 right-3 p-2 text-[12px] bg-white border border-slate-800 text-slate-800 hover:text-white">
          <Link
            className="flex items-center gap-1"
            href={product.link || "/"}
            target="_blank"
          >
            <IconExternalLink size={18} />
          </Link>
        </button>
      )}
    </div>
  );
}
