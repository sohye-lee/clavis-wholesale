'use client';
import { Product } from '@/lib/types';
import useMutation from '@/lib/useMutation';
import { capitalize, capitalizeSentence } from '@/lib/utils';
import React, { useEffect } from 'react';

interface ProductItemProps {
  product: Product;
}
export default function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="bg-white p-4 border border-slate-300 hover:border-slate-500 rounded-lg flex flex-col items-center items-stretch">
      <div className="aspect-square w-full"></div>
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-sm text-slate-400">{capitalize(product.type)}</p>
          <h3 className="text-lg uppercase tracking-wide">{product.title}</h3>

          <p className="text-lg">
            WSP ${product.price} |{' '}
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
    </div>
  );
}
