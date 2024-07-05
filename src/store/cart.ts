import { atom, selector } from "recoil";
import { CART_ITEM } from "../constants/category";

export interface ICartInfo {
  readonly id: number;
  readonly count: number;
}

export interface ICartItems {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly count: number;
  readonly image: string;
}

export interface ICartState {
  [x: string]: any;
  readonly items?: Record<string | number, ICartInfo>;
}

export interface InCartItem {
  id: string; // id의 타입을 명시
  count: number;
}

export interface InCartState {
  [key: string]: InCartItem;
}

/**
 * 카트의 상태는 localStorage 기준으로 초기화 됩니다.
 * 카트의 상태는 새로고침해도 유지되어야 하기 때문입니다.
 */
export const cartState = atom<ICartState>({
  key: "cart",
  default: {},
  effects: [
    ({ setSelf, onSet }) => {
      localStorage.getItem(CART_ITEM) &&
        setSelf(JSON.parse(localStorage.getItem(CART_ITEM) as string));
      onSet((value) => localStorage.setItem(CART_ITEM, JSON.stringify(value)));
    },
  ],
});

export const countState = atom({
  key: "countState",
  default: 0,
});
export const totalCountState = selector({
  key: "totalCountState",
  get: ({ get }) => {
    const num = get(countState);
    return;
  },
});

export const totalCountSelector = selector({
  key: "totalCount",
  get: ({ get }) => {
    const cart = get(cartState);
    console.log(cart);
    return cart.reduce((total, item) => total + item.count, 0);
  },
});

/**
 * cartList를 구현 하세요.
 * id, image, count 등을 return합니다.
 */

// addToCart는 구현 해보세요.

// export const addToCart = ({ id }, plus?: () => void) => {
//   const tempCart = localStorage.getItem(CART_ITEM) as string;
//   const cart = tempCart ? JSON.parse(tempCart) : {};
//   if (cart.hasOwnProperty(id)) {
//     cart[id].count += 1;
//   } else {
//     cart[id] = { id: id, count: 1 };
//   }

//   localStorage.setItem(CART_ITEM, JSON.stringify(cart));
// };

// removeFromCart는 참고 하세요.
export const removeFromCart = ({ id }) => {
  const tempCart = localStorage.getItem(CART_ITEM) as string;
  const cart = tempCart ? JSON.parse(tempCart) : {};
  cart[id].count -= 1;
  if (cart[id].count === 0) {
    delete cart[id];
  }
  localStorage.setItem(CART_ITEM, JSON.stringify(cart));
};

// export const removeFromCart = (cart: ICartState, id: string) => {
//   const tempCart = { ...cart };
//   if (tempCart[id].count === 1) {
//     delete tempCart[id];
//     return tempCart;
//   } else {
//     return { ...tempCart, [id]: { id: id, count: cart[id].count - 1 } };
//   }
// };

/**
 * 그 외에 화면을 참고하며 필요한 기능들을 구현 하세요.
 */
