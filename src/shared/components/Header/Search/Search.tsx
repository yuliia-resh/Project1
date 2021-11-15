import React from "react";

import { connect } from "../../../connect";
import { PropsType } from "../../../types/types";
import styles from "./Search.module.scss";

class Search extends React.Component<PropsType> {
  searchString = React.createRef<HTMLInputElement>();

  render() {
    const { store } = this.props;
    return (
      <form>
        <input
          className={styles.input}
          id="search"
          type="search"
          placeholder="Search by name or ingredient..."
          autoFocus
          required
          ref={this.searchString}
          onKeyUp={() => store.searchProduct(this.searchString.current!.value)}
        />
      </form>
    );
  }
}

export default connect(Search);
