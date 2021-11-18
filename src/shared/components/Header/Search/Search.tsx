import { useHistory, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import queryStirng from "query-string";
import styles from "./Search.module.scss";

function Search() {
  const history = useHistory();
  const location = useLocation();

  const handleChage = useCallback((e: any) => {
    history.push(`${location?.pathname}?search=${e.target.value}`);
  }, []);

  const query = queryStirng.parse(location.search);

  return (
    <form>
      <input
        className={styles.input}
        id="search"
        type="search"
        placeholder="Search by name or ingredient..."
        autoFocus
        required
        value={query.search as string}
        onChange={handleChage}
      />
    </form>
  );
}

export default Search;
