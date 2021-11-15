import React from "react";

import { ProductType } from "../../../types/types";
import styles from "./Dish.module.scss";
import classNames from "classnames";
import { connect } from "../../../connect";

const buttonClasses = classNames(styles.button, styles.gradient);

type DishPropsType = {
  dish: ProductType;
  addToCart: (dish: ProductType) => void;
};

export class Dish extends React.Component<DishPropsType> {
  render() {
    const { dish, addToCart } = this.props;
    const productIngredients = dish.ingredients.join(", ");

    return (
      <div className={styles.dish}>
        <img src={dish.image} alt={dish.title} />
        <div className={styles.infoFlex}>
          <p>{dish.title}</p>
          <p>{dish.price}$</p>
        </div>
        <div className={styles.ingredients}>
          <p>{productIngredients}</p>
        </div>

        <div className={styles.buttonOnBottom}>
          <button
            type="button"
            className={buttonClasses}
            onClick={() => {
              addToCart(dish);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    );
  }
}

export default connect(Dish);
