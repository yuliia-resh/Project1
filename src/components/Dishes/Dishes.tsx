import Dish from "./Dish/Dish";
import styles from "./Dishes.module.scss";
import { ProductsContext } from "../../context/productsContext";
import React from "react";
//import { getAllProducts } from "../../api"

type Product = {
  id: number;
  title: string;
  ingredients: [];
  price: number;
  image: string;
};


class Dishes extends React.Component {
  render() {
    return (
      <ProductsContext.Consumer>
        {(context) => (
          <div className={styles.dishes}>
            {context.map((product: Product) => {
              return <Dish dish={product} key={product.id} />;
            })}
          </div>
        )}
      </ProductsContext.Consumer>
    );
  }
}

export default Dishes;
