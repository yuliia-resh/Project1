import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

import Dish from "./Dish/Dish";
import styles from "./Dishes.module.scss";
import { ProductType, PropsType } from "../../types/types";
import { connect } from "../../connect";

function Dishes(props) {
  const { store } = props;
  const location = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {}, [location.search]);

  return (
    <div className={styles.dishes}>
      {store.searchRequest.length > 0 && store.searchResults.length === 0 && (
        <div className={styles.noResults}>
          <p>No results found. Try another request.</p>
        </div>
      )}

      {store.searchResults.length > 0 &&
        store.searchResults.map((product: ProductType) => (
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
