import React from "react";
import { connect } from "../../../connect";
import styles from "./Search.module.scss";

function Search(props: any) {
  //need to fix
  const { store } = props;

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
        onKeyUp={() => store.searchProduct(searchValue.current?.value)}
      />
    </form>
  );
}

export default connect(Search);
