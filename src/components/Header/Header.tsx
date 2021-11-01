import styles from "./Header.module.scss"

function Header() {
    return (
      <div className={styles.header}>
        <p className={styles.cafeName}>Cafe name</p>
      </div>
    );
  }
  
  export default Header;