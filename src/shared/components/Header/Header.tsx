import styles from "./Header.module.scss";
import { useContext } from "react";
import { ProductsContext } from "../../context/productsContext";
import { NavLink } from "react-router-dom";
import Search from "./Search/Search";

function Header() {
  const context = useContext(ProductsContext);

  const handleCartClick = () => {
    context.toggleCartComponent();
  };

  return (
    <div className={styles.header}>
      <p className={styles.cafeName}>Cafe name</p>

      <Search />

      <div className={styles.cart}>
        <div onClick={handleCartClick}>
          <NavLink to={context.isCartVisible ? "/cart" : "/"}>
            <img
              src="https://icon-library.com/images/cart-icon-png-white/cart-icon-png-white-4.jpg"
              alt="Cart"
            />
          </NavLink>
        </div>

        <p>{context.getCountsOfProducts()}</p>
      </div>
    </div>
  );
}

export default Header;
