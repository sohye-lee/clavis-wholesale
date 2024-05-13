import { create } from 'zustand';
import { ProductInfoToOrder } from './types';

export interface OrderListStoreState {
  orderList: ProductInfoToOrder[];
  addToOrderList: (orderList: ProductInfoToOrder[]) => void;
  deleteItemFromList: (orderList: ProductInfoToOrder[]) => void;
  clearOrderList: () => void;
}

const useOrderListStore = create<OrderListStoreState>((set) => ({
  orderList: [],
  addToOrderList: (orderList) => set(() => ({ orderList: orderList })),
  deleteItemFromList: (orderList) => set(() => ({ orderList: orderList })),
  clearOrderList: () => set(() => ({ orderList: [] })),
}));

export default useOrderListStore;
