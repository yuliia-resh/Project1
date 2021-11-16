import { useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { connect } from "../../../connect";
import styles from "./Search.module.scss";

export default function Search(props: any) {
  const searchValue = React.createRef<HTMLInputElement>();
  const [value, setValue] = useState("");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    history.push(`${location?.pathname}?${stringsearch}`);
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
        ref={searchValue}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
