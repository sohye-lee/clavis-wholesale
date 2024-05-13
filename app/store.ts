import { ProductInfoToOrder } from "@/lib/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface OrderListStoreState {
  orderList: ProductInfoToOrder[];
  addToOrderList: (orderList: ProductInfoToOrder[]) => void;
  deleteItemFromList: (productId: string) => void;
  clearOrderList: () => void;
}

const $LOCAL_ORDER_LIST = "order_list";

const getOrderList = () => {
  const localData =
    typeof window !== "undefined"
      ? localStorage.getItem($LOCAL_ORDER_LIST)
      : "[]";
  return localData ? JSON.parse(localData) : [];
};

const useStore = create<OrderListStoreState>((set) => ({
  orderList: getOrderList() || [],
  addToOrderList: (orderList) =>
    set(() => {
      if (typeof window !== "undefined")
        localStorage.setItem($LOCAL_ORDER_LIST, JSON.stringify(orderList));
      return { orderList: orderList };
    }),
  deleteItemFromList: (productId: string) =>
    set(() => {
      const orderList = getOrderList().filter(
        (item: ProductInfoToOrder) => item.productId !== productId
      );

      if (typeof window !== "undefined")
        localStorage.setItem($LOCAL_ORDER_LIST, JSON.stringify(orderList));
      return { orderList: orderList };
    }),
  clearOrderList: () =>
    set(() => {
      if (typeof window !== "undefined")
        localStorage.setItem($LOCAL_ORDER_LIST, JSON.stringify([]));
      return { orderList: [] };
    }),
}));

export default useStore;