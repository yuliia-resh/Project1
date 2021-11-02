import styles from "./Header.module.scss";
import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        <p className={styles.cafeName}>Cafe name</p>
        <img src="https://icon-library.com/images/cart-icon-png-white/cart-icon-png-white-4.jpg" alt="Cart" />
      </div>
    );
  }
}

export default Header;
