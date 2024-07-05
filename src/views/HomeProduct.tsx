import { useRecoilValue } from "recoil";
import { productsList } from "../store/products";
import styled from "styled-components";
import styles from "./HomeProduct.module.css";
import { Link } from "react-router-dom";
import cx from "clsx";

const HomeProduct = ({ category, name }) => {
  const products = useRecoilValue(productsList);
  const filteredProducts = products
    .filter((product) => product.category === category)
    .slice(0, 4);

  return (
    <div>
      <TagName>{name}</TagName>
      <div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list"
        data-scroll="true"
      >
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div
              key={product.id}
              className={cx(
                styles.div,
                "card card-bordered border-gray-200 dark:border-gray-800 card-compact lg:card-normal",
              )}
            >
              <figure className={styles.figure}>
                <img src={product.image} alt={product.title} />
              </figure>

              <div
                className={cx(styles.explain, "bg-gray-100 dark:bg-gray-700")}
              >
                <h2>{product.title}</h2>
                <p>${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const TagName = styled.h2`
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
`;

export default HomeProduct;
