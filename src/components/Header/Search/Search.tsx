import React from "react";
import { ProductsContext } from "../../../context/productsContext";
import styles from "./Search.module.scss";

class Search extends React.Component {
  render() {
    const value = React.createRef<HTMLInputElement>();
    return (
      <ProductsContext.Consumer>
        {(context) => (
          <form>
            <input
              id="search"
              type="search"
              placeholder="Search by name or ingredient..."
              autoFocus
              required
              ref={value}
            />
            <button
              type="button"
              className={styles.button}
              onClick={() => context.handleSearch(value.current?.value)}
            >
              Go
            </button>
          </form>
        )}
      </ProductsContext.Consumer>
    );
  }
}

export default Search;
