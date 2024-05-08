export interface Product {
  id: string;
  title: string;
  type: string;
  description?: string;
  bandColor?: string;
  platingColor?: string;
  price: number;
  msrp?: number;
  thumbnail?: string;
  images: string[];
  link?: string;
}

interface ProductInfoToOrder {
  productId: string;
  quantity: number;
}

export interface ProductListToOrder {
  products: ProductInfoToOrder[];
}
