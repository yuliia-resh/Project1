import styles from "./Header.module.scss";
import React from "react";
import { ProductsContext } from "../../context/productsContext";
import { NavLink } from "react-router-dom";
import Search from "./Search/Search";

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

            <Search/>
            
            <div className={styles.cart}>
              <div onClick={() => context.handleCartClick()}>
                {context.isCartVisible ? ( //this code need for close the shoping cart with click on the cart
                  <NavLink to="/cart">
                    <img
                      src="https://icon-library.com/images/cart-icon-png-white/cart-icon-png-white-4.jpg"
                      alt="Cart"
                    />
                  </NavLink>
                ) : (
                  <NavLink to="/">
                    <img
                      src="https://icon-library.com/images/cart-icon-png-white/cart-icon-png-white-4.jpg"
                      alt="Cart"
                    />
                  </NavLink>
                )}
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
