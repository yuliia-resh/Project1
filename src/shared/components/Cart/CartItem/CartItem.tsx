import React from "react";

import styles from "./CartItem.module.scss";
import { CartItemInfoType } from "../../../types/types";

class CartItem extends React.Component<CartItemInfoType> {
  render() {
    const { id, title, subTotal, quantity, deleteFromCart } = this.props;

    return (
      <div className={styles.cartItem}>
        <div className={styles.flexElements}>
          <p>{title}</p>
          <img
            src="https://www.pngall.com/wp-content/uploads/5/Delete-Bin-Trash-Transparent.png"
            alt="Trash bin"
            onClick={() => {
              deleteFromCart(id);
            }}
          />
        </div>

        <p>Quantity: {quantity}</p>
        <p>Sub-total: {subTotal}$</p>
      </div>
    );
  }
}

export default CartItem;
