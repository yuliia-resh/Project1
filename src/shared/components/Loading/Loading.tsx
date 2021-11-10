import React from "react";
import styles from "./Loading.module.scss";
let classNames = require("classnames");

const loadingStyles = classNames(styles.spinnerGrow, styles.textInfo);

class Loading extends React.Component {
  render() {
    return (
      <div className={styles.loadingBlock}>
        <div className={loadingStyles}></div>
      </div>
    );
  }
}

export default Loading;
