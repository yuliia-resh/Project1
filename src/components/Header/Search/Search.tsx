import React from "react";
import styles from "./Search.module.scss";

class Search extends React.Component {
  render() {
    return (
      <form>
        <input
          id="search"
          type="search"
          placeholder="Search by name or ingredient..."
          autoFocus
          required
        />
        <button type="submit" className={styles.button}>Go</button>
      </form>
    );
  }
}

export default Search;
