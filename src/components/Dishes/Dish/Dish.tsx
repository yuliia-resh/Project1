import React from "react";
import styles from "./Dish.module.scss";

type Product = {
  id: number;
  title: string;
  ingredients: [];
  price: number;
  image: string;
};

type Props = {
  dish: Product;
  addToCart: (dish: Product) => void;
};



export class Dish extends React.Component<Props> {
  render() {
    const {dish, addToCart} = this.props;
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
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            addToCart(dish)
          
          }}
        >
          Add to cart
        </button>
      </div>
    );
  }
}

export default Dish;
