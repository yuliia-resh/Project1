import React from "react";

import Dish from "./Dish/Dish";
import styles from "./Dishes.module.scss";
import { ProductType, PropsType } from "../../types/types";
import { connect } from "../../connect";

class Dishes extends React.Component<PropsType> {
  render() {
    const { store } = this.props;
    return (
      <div className={styles.dishes}>
        {store.searchRequest.length === 0 ? ( // I need to rewrite this piece of code, but expressions with IF don't work. How can I do this?
          store.products.map((product: ProductType) => {
            return (
              <Dish
                dish={product}
                key={product.id}
                addToCart={(product: ProductType) => {
                  store.addToCart(product);
                }}
              />
            );
          })
        ) : store.searchRequest.length > 0 && store.searchResults.length > 0 ? (
          store.searchResults.map((product: ProductType) => {
            return (
              <Dish
                dish={product}
                key={product.id}
                addToCart={(product: ProductType) => {
                  store.addToCart(product);
                }}
              />
            );
          })
        ) : (
          <div className={styles.noResults}>
            <p>No results found. Try another request.</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(Dishes);
