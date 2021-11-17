import { useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { connect } from "../../../connect";
import styles from "./Search.module.scss";
import { PropsType } from "../../../types/types";

function Search(props: PropsType) {
  const { store } = props;
  const [value, setValue] = useState("");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    history.push(`${location?.pathname}?search=${value}`);
    // store.searchRequest = value;
  }, [value]);

  return (
    <form>
      <input
        className={styles.input}
        id="search"
        type="search"
        placeholder="Search by name or ingredient..."
        autoFocus
        required
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </form>
  );
}

export default connect(Search);
