import styles from "./Header.module.scss";
import React from "react";
import { ProductsContext } from "../../context/productsContext";
import { NavLink } from "react-router-dom";

type cartItem = {
  count: number;
};

class Header extends React.Component<{}> {
  render() {
    return (
      <ProductsContext.Consumer>
        {(context) => (
          <div className={styles.header}>
            <p className={styles.cafeName}>Cafe name</p>
            <div className={styles.cart}>
              <div onClick={() => context.handleClick()}>
                <NavLink to={context.isCartVisible ? "/cart" : "/"}>
                  <img
                    src="https://icon-library.com/images/cart-icon-png-white/cart-icon-png-white-4.jpg"
                    alt="Cart"
                  />
                </NavLink>
              </div>
              <p>
                {context.cart.reduce((acc: number, item: cartItem) => {
                  return acc + item.count;
                }, 0)}
              </p>
            </div>
          </div>
        )}
      </ProductsContext.Consumer>
    );
  }
}

export default Header;
