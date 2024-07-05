import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { cartState } from "../store/cart";

const useLocalStorageSync = () => {
  const setCartState = useSetRecoilState(cartState);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "CART_ITEM") {
        setCartState(JSON.parse(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setCartState]);
};

export default useLocalStorageSync;
