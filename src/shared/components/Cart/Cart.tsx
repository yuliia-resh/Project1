import { connect } from "../../connect";
import { CartItemType, PropsType } from "../../types/types";
import styles from "./Cart.module.scss";
import CartItem from "./CartItem/CartItem";
import classNames from "classnames";

const totalClasses = classNames(styles.textCart, styles.borderTop);
const textCartClasses = classNames(styles.textCart, styles.borderBottom);
const doCartVisible = classNames(styles.slideIn, styles.show, styles.cart);
const doCartInvisible = classNames(styles.slideIn, styles.cart);

function Cart(props: PropsType) {
  const { store } = props;

  return (
    <div className={store.isCartVisible ? doCartVisible : doCartInvisible}>
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/61/61155.png"
          alt="Close shopping cart"
          onClick={store.toggleCart}
        />

        <h3 className={textCartClasses}>Cart</h3>
      </div>

      {store.shopingCart.map((cartItem: any) => {
        return (
          <CartItem
            key={cartItem.id}
            item={{
              id: cartItem.id,
              title: cartItem.title,
              quantity: cartItem.count,
              subTotal: cartItem.price * cartItem.count,
            }}
            onDeleteFromCart={store.onDeleteFromCart}
          />
        );
      })}
      <h3 className={totalClasses}>Total: {store.getTotalPrice()}$</h3>
    </div>
  );
}

export default connect(Cart);
