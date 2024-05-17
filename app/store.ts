"use client";
import { env } from "@/env";
import { ProductInfoToOrder } from "@/lib/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface OrderListStoreState {
  orderList: ProductInfoToOrder[];
  addToOrderList: (orderList: ProductInfoToOrder[]) => void;
  deleteItemFromList: (productId: string) => void;
  clearOrderList: () => void;
  isAdmin: boolean;
  updateAdminStatus: (isAdmin: boolean) => void;
}

const $LOCAL_ORDER_LIST = "order_list";
const $ADMIN_PW = "admin_pw";

const getOrderList = () => {
  const localData =
    typeof window !== "undefined"
      ? sessionStorage.getItem($LOCAL_ORDER_LIST)
      : "[]";
  return localData ? JSON.parse(localData) : [];
};

const getAdminStatus = () => {
  const localData =
    typeof window != "undefined" ? sessionStorage.getItem($ADMIN_PW) : null;
  return localData ? JSON.parse($ADMIN_PW) == env.ADMIN_PASSWORD : false;
};

const useStore = create<OrderListStoreState>((set) => ({
  orderList: getOrderList() || [],
  addToOrderList: (orderList) =>
    set(() => {
      if (typeof window !== "undefined")
        sessionStorage.setItem($LOCAL_ORDER_LIST, JSON.stringify(orderList));
      return { orderList: orderList };
    }),
  deleteItemFromList: (productId: string) =>
    set(() => {
      const orderList = getOrderList().filter(
        (item: ProductInfoToOrder) => item.productId !== productId
      );

      if (typeof window !== "undefined")
        sessionStorage.setItem($LOCAL_ORDER_LIST, JSON.stringify(orderList));
      return { orderList: orderList };
    }),
  clearOrderList: () =>
    set(() => {
      if (typeof window !== "undefined")
        sessionStorage.setItem($LOCAL_ORDER_LIST, JSON.stringify([]));
      return { orderList: [] };
    }),
  isAdmin: getAdminStatus(),
  updateAdminStatus: (isAdmin: boolean) =>
    set(() => {
      return { isAdmin };
    }),
}));

export default useStore;
