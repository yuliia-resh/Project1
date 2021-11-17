import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

import Dish from "./Dish/Dish";
import styles from "./Dishes.module.scss";
import { ProductType, PropsType } from "../../types/types";
import { connect } from "../../connect";
import { getAllProductsApi, searchProductsApi } from "../../../api";
import Loading from "../Loading/Loading";

function Dishes(props: PropsType) {
  const { store } = props;
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    store
      .getProducts(location.search)
      .then((result) => setProducts(result.payload));
  }, [location.search]);

  return (
    <div className={styles.dishes}>
      {isLoading && <Loading />}

      {isLoading === false &&
        store.searchRequest.length > 0 &&
        products.length === 0 && (
          <div className={styles.noResults}>
            <p>No results found. Try another request.</p>
          </div>
        )}

      {isLoading === false &&
        products.length > 0 &&
        products.map((product: ProductType) => (
          <Dish
            dish={product}
            key={product.id}
            addToCart={(product: ProductType) => {
              store.addToCart(product);
            }}
          />
        ))}
    </div>
  );
}

export default connect(Dishes);
