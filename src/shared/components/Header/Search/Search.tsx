import React from "react";
import { ProductsContext } from "../../../context/productsContext";
import styles from "./Search.module.scss";

class Search extends React.Component {
  render() {
    const searchValue = React.createRef<HTMLInputElement>();
    return (
      <ProductsContext.Consumer>
        {(context) => (
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
        )}
      </ProductsContext.Consumer>
    );
  }
}

export default Search;
