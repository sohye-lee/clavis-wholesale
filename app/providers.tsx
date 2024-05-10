import { ProductInfoToOrder } from '@/lib/types';
import React, { createContext } from 'react';

const OrderListContext = createContext<ProductInfoToOrder[]>([]);
export default function Providers({ children }: { children: React.ReactNode }) {
  return <div></div>;
}
