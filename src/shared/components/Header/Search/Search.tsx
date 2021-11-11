import React, { useContext } from "react";
import { ProductsContext } from "../../../context/productsContext";
import styles from "./Search.module.scss";

function Search() {
  const context = useContext(ProductsContext);

  const searchValue = React.createRef<HTMLInputElement>();

  return (
    <form>
      <input
        className={styles.input}
        id="search"
        type="search"
        placeholder="Search by name or ingredient..."
        autoFocus
        required
        ref={searchValue}
        onKeyUp={() => context.searchProduct(searchValue.current?.value)}
      />
    </form>
  );
}

export default Search;
