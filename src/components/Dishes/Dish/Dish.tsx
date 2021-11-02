import React from "react";
import styles from "./Dish.module.scss";

type Props = {
  dish: {
    name: string;
    ingredients: string;
    price: number;
    imgUrl: string;
  };
};

export class Dish extends React.Component<Props> {
  render () {
     return (
    <div className={styles.dish}>
      <img src={this.props.dish.imgUrl} alt={this.props.dish.name} />
      <div className={styles.infoFlex}>
        <p>{this.props.dish.name}</p>
        <p>{`${this.props.dish.price}$`}</p>
      </div>
      <p>{this.props.dish.ingredients}</p>
      <button type="button" className={styles.button}>Add to cart</button>
    </div>
  );
  }
 
}

export default Dish;
