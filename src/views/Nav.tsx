import Theme from "../module/theme";
import { productsList } from "../store/products";
import { Link } from "react-router-dom";
import Search from "../module/Search";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import CartIcon from "../module/CartIcon";
import { cartState, countState, ICartState } from "../store/cart";

const Nav = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const items = useRecoilValue(productsList);

  const [count, setCount] = useRecoilState(countState);

  const [cart, setCart] = useRecoilState<ICartState>(cartState);

  const products = useRecoilValue(productsList);

  useEffect(() => {
    let sum = 0;
    Object.values(cart).forEach((item) => {
      sum += item.count;
    });
    setCount(sum);
  }, [cart, products, count]);

  const filteredItems = searchQuery
    ? items.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <div className="fixed z-10 w-full navbar shadow-lg bg-white dark:bg-neutral text-neutral-content">
      <div className="flex w-full xl:container xl:m-auto">
        <label
          htmlFor="side-menu"
          className="flex-none lg:hidden btn btn-square btn-ghost w-10 sm:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-gray-700 dark:stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <h1 className="shrink-0 flex md:flex-none flex-1 mx-1 sm:mx-2">
          <Link
            to={"/"}
            className="text-lg text-gray-700 dark:text-white font-bold whitespace-nowrap"
          >
            React Shop
          </Link>
        </h1>
        <div className="flex-none hidden md:flex md:flex-1 ml-2">
          <Link
            to={"/fashion"}
            className="btn btn-ghost btn-sm rounded-btn text-gray-700 dark:text-white"
          >
            패션
          </Link>
          <Link
            to={"/jewelery"}
            className="btn btn-ghost btn-sm rounded-btn text-gray-700 dark:text-white"
          >
            액세서리
          </Link>
          <Link
            to={"/electronics"}
            className="btn btn-ghost btn-sm rounded-btn text-gray-700 dark:text-white"
          >
            디지털
          </Link>
        </div>
        <div className="flex items-center px-2">
          <Theme></Theme>
          <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          ></Search>
          {searchQuery && (
            <ul className="absolute sm:top-14 menu flex-nowrap dropdown-content w-full sm:w-64 max-h-96 shadow text-base-content overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-600">
              {filteredItems.map((item, index) => (
                <li key={index}>
                  <Link to={`/product/${item.id}`}>
                    <button
                      type="button"
                      className="text-left js-searchedItem"
                      onClick={() => setSearchQuery("")}
                    >
                      <span className="text-gray-600 dark:text-white line-clamp-2">
                        {item.title}
                      </span>
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <CartIcon count={count}></CartIcon>
        </div>
      </div>
    </div>
  );
};

export default Nav;
