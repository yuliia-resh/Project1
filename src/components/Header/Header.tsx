import { connect } from "../../connect";
import { PropsType } from "../../types/types";
import styles from "./Header.module.scss";
import Search from "./Search/Search";

function Header(props: PropsType) {
  const { store } = props;

  return (
    <div className={styles.header}>
      <p className={styles.cafeName}>Cafe name</p>
      <Search />
      <div className={styles.cart}>
        <img
          src="https://icon-library.com/images/cart-icon-png-white/cart-icon-png-white-4.jpg"
          alt="Cart"
          onClick={store.toggleCart}
        />
        <p>{store.getCountsOfProducts()}</p>
      </div>{" "}
    </div>
  );
}

export default connect(Header);
