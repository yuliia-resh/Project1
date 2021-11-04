import styles from "./Cart.module.scss";
import React from "react";
import { ProductsContext } from "../../context/productsContext";
import CartItem from "./CartItem/CartItem";

class Cart extends React.Component {
  render() {
    return (
      <ProductsContext.Consumer>
        {(context) => (
          <div className={styles.cart}>
            <h3 className={styles.textCart}>Cart</h3>
            {context.cart.map((cartItem :any) => {return <CartItem key={cartItem.id} title={cartItem.title} quantity={cartItem.count} subTotal={cartItem.price * cartItem.count}/>})}
          </div>
        )}
      </ProductsContext.Consumer>
    );
  }
}

export default Cart;
