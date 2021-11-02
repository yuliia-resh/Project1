import styles from "./Cart.module.scss";
import React from "react";

class Cart extends React.Component {
  render() {
    return (
      <div className={styles.cart}>
        <h3 className={styles.textCart}>Cart</h3>
      </div>
    );
  }
}

export default Cart;
