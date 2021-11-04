import styles from "./Header.module.scss";
import React from "react";
import { ProductsContext } from "../../context/productsContext";
import Cart from "../Cart/Cart";
import { NavLink } from "react-router-dom";

class Header extends React.Component<{}, any> {
  render() {
    return (
      <ProductsContext.Consumer>
        {(context) => (
          <div className={styles.header}>
            <p className={styles.cafeName}>Cafe name</p>
            <div className={styles.cart}>
              <NavLink to="/cart">
                <img
                  src="https://icon-library.com/images/cart-icon-png-white/cart-icon-png-white-4.jpg"
                  alt="Cart"
                />
              </NavLink>

              <p>
                {context.cart.reduce((acc: any, item: any) => {
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
