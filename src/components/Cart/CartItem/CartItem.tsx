import styles from "./CartItem.module.scss";
import React from "react";

class CartItem extends React.Component<any> {
  render() {
    const { title, subTotal, quantity } = this.props;
    return (
      <div className={styles.cartItem}>
        <p>{title}</p>
        <p>Quantity: {quantity}</p>
        <p>Sub-total: {subTotal}</p>
      </div>
    );
  }
}

export default CartItem;
