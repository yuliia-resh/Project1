import styles from "./Cart.module.scss";
import React from "react";
import { ProductsContext } from "../../context/productsContext";
import CartItem from "./CartItem/CartItem";
import { NavLink } from "react-router-dom";
let classNames = require('classnames');

type cartItem = {
  id: number;
  title: string;
  ingredients: [];
  price: number;
  image: string;
  count: number;
};

const totalClasses = classNames(styles.textCart, styles.borderTop);
const textCartClasses = classNames(styles.textCart, styles.borderBottom)

class Cart extends React.Component {
  render() {
    return (
      <ProductsContext.Consumer>
        {(context) => (
          <div className={styles.cart}>
            <NavLink to="/">
              <img
                src="https://cdn-icons-png.flaticon.com/512/61/61155.png"
                alt="Close shopping cart"
                onClick={() => {
                  context.handleClick();
                }}
              />
            </NavLink>
            <h3 className={textCartClasses}>
              Cart
            </h3>

            {context.cart.map((cartItem: cartItem) => {
              return (
                <CartItem
                  key={cartItem.id}
                  id={cartItem.id}
                  title={cartItem.title}
                  quantity={cartItem.count}
                  subTotal={cartItem.price * cartItem.count}
                  deleteFromCart={context.deleteFromCart}
                />
              );
            })}
            <h3 className={totalClasses}>
              Total:{" "}
              {context.getTotalPrice()}
              $
            </h3>
          </div>
        )}
      </ProductsContext.Consumer>
    );
  }
}

export default Cart;
