import Dish from "./Dish/Dish";
import styles from "./Dishes.module.scss";
import { ProductsContext } from "../../context/productsContext";
import React from "react";

class Dishes extends React.Component {
  render() {
    return (
      <ProductsContext.Consumer>
        {(context) => (
          <div className={styles.dishes}>
            {context.map((item: any) => {
              return <Dish dish={item} key={item.id} />;
            })}
          </div>
        )}
      </ProductsContext.Consumer>
    );
  }
}

export default Dishes;
