import React from "react";
import styles from "./Dish.module.scss";

type Props = {
  dish: {
    title: string;
    ingredients: [];
    price: number;
    image: string;
  };
};

export class Dish extends React.Component<Props> {
  render() {
    return (
      <div className={styles.dish}>
        <img src={this.props.dish.image} alt={this.props.dish.title} />
        <div className={styles.infoFlex}>
          <p>{this.props.dish.title}</p>
          <p>{`${this.props.dish.price}$`}</p>
        </div>
          {this.props.dish.ingredients.map((ingr, index) => {
            return <p key={index}>{ingr}</p>;
          })}
        <button type="button" className={styles.button}>
          Add to cart
        </button>
      </div>
    );
  }
}

export default Dish;
