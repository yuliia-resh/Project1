import React from "react";
import { Product } from "../../../types/types";
import styles from "./Dish.module.scss";

type Props = {
  dish: Product;
  addToCart: (dish: Product) => void;
};

export class Dish extends React.Component<Props> {
  render() {
    const { dish, addToCart } = this.props;
    const ingredients = dish.ingredients.join(", ");

    return (
      <div className={styles.dish}>
        <img src={dish.image} alt={dish.title} />
        <div className={styles.infoFlex}>
          <p>{dish.title}</p>
          <p>{dish.price}$</p>
        </div>
        <div className={styles.ingredients}>
          <p>{ingredients}</p>
        </div>
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            addToCart(dish);
          }}
        >
          Add to cart
        </button>
      </div>
    );
  }
}

export default Dish;
