import { Link, useParams } from "react-router-dom";
import { ICartState, InCartItem, cartState } from "../../store/cart";
import { toCurrencyFormat } from "../../helpers/helpers";
import { useRecoilState, useRecoilValue } from "recoil";
import { productsList } from "../../store/products";
import { useEffect, useState } from "react";
import { CART_ITEM } from "../../constants/category";

const CartList = (): JSX.Element => {
  // Recoil을 사용해서 cart데이터를 가져오는 예제입니다.
  const [cart, setCart] = useRecoilState<ICartState>(cartState);
  const products = useRecoilValue(productsList);
  let sum = 0;
  Object.values(cart).forEach((item) => {
    const price = products[item.id - 1].price * item.count;
    sum += price;
  });
  const [totalPrice, setTotalPrice] = useState(sum);

  useEffect(() => {
    let sum = 0;
    Object.values(cart).forEach((item) => {
      const price = products[Number(item.id) - 1].price * item.count;
      sum += price;
    });
    setTotalPrice(sum);
  }, [cart, products]);

  const addToCart = (product: InCartItem) => {
    setCart((oldCart) => {
      const existingItem = oldCart[product.id];
      const newItem: InCartItem = existingItem
        ? { id: product.id, count: existingItem.count + 1 }
        : { id: product.id, count: 1 };

      return {
        ...oldCart,
        [product.id]: newItem,
      };
    });
  };

  const removeFromCart = (product: InCartItem) => {
    setCart((oldCart) => {
      const existingItem = oldCart[product.id];
      if (!existingItem) return oldCart;

      const newCount = existingItem.count - 1;
      const newCart = { ...oldCart };

      if (newCount > 0) {
        newCart[product.id] = { id: product.id, count: newCount };
      } else {
        delete newCart[product.id];
      }

      return newCart;
    });
  };

  return (
    <>
      <div className="mt-6 md:mt-14 px-2 lg:px-0">
        {Object.keys(cart).length === 0 ? (
          <div className="text-center">
            <h1 className="text-2xl">장바구니에 물품이 없습니다.</h1>
            <Link to="/" className="btn btn-primary mt-10">
              담으러 가기
            </Link>
          </div>
        ) : (
          <div className="lg:flex justify-between mb-20">
            <div>
              {Object.values(cart).map((item) => {
                if (cart.count !== 0) {
                  return cart.count !== 0 ? (
                    <div
                      key={item.id}
                      className="lg:flex lg:items-center mt-4 px-2 lg:px-0"
                    >
                      <Link to={`/product/${item.id}`}>
                        <figure className="w-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white">
                          <img
                            src={products[Number(item.id) - 1].image}
                            alt={products[Number(item.id) - 1].title}
                            className="object-contain w-full h-48"
                          />
                        </figure>
                      </Link>
                      <div className="card-body px-1 lg:px-12">
                        <h2 className="card-title">
                          <Link
                            to={`/product/${item.id}`}
                            className=" link link-hover"
                          >
                            {products[Number(item.id) - 1].title}
                          </Link>
                        </h2>
                        <p className="mt-2 mb-4 text-3xl">
                          {" "}
                          $
                          {products[Number(item.id) - 1].price *
                            cart[item.id].count}{" "}
                          <span className="text-2xl">
                            (${products[Number(item.id) - 1].price})
                          </span>
                        </p>
                        <div className="card-actions">
                          <div className="btn-group">
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                removeFromCart(item);
                              }}
                            >
                              -
                            </button>
                            <button className="btn btn-ghost no-animation">
                              {cart[item.id].count}
                            </button>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                addToCart(item);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  );
                }
              })}
            </div>

            <div className="self-start shrink-0 flex items-center mt-10 mb-20">
              <span className="text-xl md:text-2xl">총 : ${totalPrice}</span>
              <label
                htmlFor="confirm-modal"
                className="modal-button btn btn-primary ml-5"
              >
                구매하기
              </label>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartList;
