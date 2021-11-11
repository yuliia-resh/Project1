import styles from "./Loading.module.scss";
let classNames = require("classnames");

const loadingStyles = classNames(styles.spinnerGrow, styles.textInfo);

function Loading() {
  return (
    <div className={styles.loadingBlock}>
      <div className={loadingStyles}></div>
    </div>
  );
}

export default Loading;
