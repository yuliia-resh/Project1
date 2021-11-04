import Dish from "./Dish/Dish";
import styles from "./Dishes.module.scss";
import { ProductsContext } from "../../context/productsContext";
import React from "react";

type Product = {
  id: number;
  title: string;
  ingredients: [];
  price: number;
  image: string;
};

type State = {
  cart: [
    {
      id: number;
      title: string;
      ingredients: [];
      price: number;
      image: string;
      count: number;
    }
  ];
  loading: boolean;
};

class Dishes extends React.Component<{}, State> {
  render() {
    return (
      <ProductsContext.Consumer>
        {(context) => (
          <div className={styles.dishes}>
            {context.products.map((product: Product) => {
              return (
                <Dish
                  dish={product}
                  key={product.id}
                  addToCart={(product) => {
                    context.addToCart(product)
                  }}
                />
              );
            })}
          </div>
        )}
      </ProductsContext.Consumer>
    );
  }
}

export default Dishes;
