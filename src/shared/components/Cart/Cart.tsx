import { NavLink } from "react-router-dom";
import { connect } from "../../connect";
import { CartItemType, PropsType } from "../../types/types";
import styles from "./Cart.module.scss";
import CartItem from "./CartItem/CartItem";
import classNames from "classnames";

const totalClasses = classNames(styles.textCart, styles.borderTop);
const textCartClasses = classNames(styles.textCart, styles.borderBottom);

function Cart(props: PropsType) {
  const { store } = props;

  const handleCloseClick = () => {
    store.toggleCartComponent();
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

      {store.shopingCart.map((cartItem: CartItemType) => {
        return (
          <CartItem
            key={cartItem.id}
            id={cartItem.id}
            title={cartItem.title}
            quantity={cartItem.count}
            subTotal={cartItem.price * cartItem.count}
            deleteFromCart={store.deleteFromCart}
          />
        );
      })}
      <h3 className={totalClasses}>Total: {store.getTotalPrice()}$</h3>
    </div>
  );
}

export default connect(Cart);
