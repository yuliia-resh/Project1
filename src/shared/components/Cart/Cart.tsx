import styles from "./Cart.module.scss";
import { useContext } from "react";
import { ProductsContext } from "../../context/productsContext";
import CartItem from "./CartItem/CartItem";
import { NavLink } from "react-router-dom";
import { CartItemType } from "../../types/types";
let classNames = require("classnames");

const totalClasses = classNames(styles.textCart, styles.borderTop);
const textCartClasses = classNames(styles.textCart, styles.borderBottom);

function Cart() {
  const context = useContext(ProductsContext);

  const handleCloseClick = () => {
    context.toggleCartComponent();
  };

  return (
    <div className={styles.cart}>
      <div>
        <NavLink to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/61/61155.png"
            alt="Close shopping cart"
            onClick={handleCloseClick}
          />
        </NavLink>
        <h3 className={textCartClasses}>Cart</h3>
      </div>

      {context.shopingCart.map((cartItem: CartItemType) => {
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
      <h3 className={totalClasses}>Total: {context.getTotalPrice()}$</h3>
    </div>
  );
}

export default Cart;
