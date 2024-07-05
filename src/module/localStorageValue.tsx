import { atom } from "recoil";
import { CART_ITEM } from "../constants/category";

export const localStorageValue = atom({
  key: CART_ITEM,
  default: localStorage.getItem(CART_ITEM) || "",
});
