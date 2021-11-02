import Dish from "./Dish/Dish";
import styles from "./Dishes.module.scss";
import { ProductsContext } from "../../context/productsContext";
import { useContext } from "react";

function Dishes() {
  const contextData = useContext(ProductsContext);

  return (
    <div className={styles.dishes}>
      {contextData.map((item: any) => {
        return <Dish key={item.id} dish={item} />;
      })}
    </div>
  );
}

export default Dishes;
