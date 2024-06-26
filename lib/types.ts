export interface Product {
  id: string;
  title: string;
  type: string;
  collection?: string;
  description?: string;
  bandColor?: string;
  platingColor?: string;
  price: number;
  msrp?: number;
  thumbnail?: string;
  images: string[];
  link?: string;
}

export interface ProductInfoToOrder {
  productId: string;
  title: string;
  msrp: number;
  collection: string;
  quantity: number;
  product: Product;
}
