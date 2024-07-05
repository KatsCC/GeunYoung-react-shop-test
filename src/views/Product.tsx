import { useRecoilState, useRecoilValue } from "recoil";
import { productsList } from "../store/products";
import { useParams } from "react-router";
import BreadCrumb from "../components/common/Breadcrumb";
import cx from "clsx";
import styles from "./Product.module.css";
import StarRating from "../module/StarRationg";
import { cartState, InCartItem } from "../store/cart";
import { Link } from "react-router-dom";

const Product = () => {
  const { id } = useParams();

  const [cart, setCart] = useRecoilState(cartState);

  const addToCart = (product) => {
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

  const item = useRecoilValue(productsList);
  const itemValue = item[Number(id) - 1];

  const categoryName = itemValue.category;

  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <BreadCrumb category={categoryName} crumb={itemValue.title} />
      <div className="lg:flex lg:items-center mt-6 md:mt-14 px-2 lg:px-0">
        <figure
          className={cx(
            "flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white ",
            styles.viewImage,
          )}
        >
          <img
            src={itemValue.image}
            className="object-contain w-full h-72"
            alt={itemValue.title}
          ></img>
        </figure>
        <div className="card-body px-1 lg:px-12">
          <h2 className="card-title">
            {itemValue.title}
            <span className="badge badge-accent ml-2">NEW</span>
          </h2>

          <p>{itemValue.description}</p>

          <div className="flex items-center mt-3">
            <StarRating rate={itemValue.rating.rate}></StarRating>
            <div className="ml-2">
              {itemValue.rating.rate} / {itemValue.rating.count} 참여
            </div>
          </div>

          <p className="mt-2 mb-4 text-3xl">${itemValue.price}</p>

          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={() => addToCart({ id: id, count: cart.count + 1 })}
            >
              장바구니에 담기
            </button>
            <Link className="btn btn-outline ml-1" to={"/cart"}>
              장바구니로 이동
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
