import Dish from "./Dish/Dish";
import styles from "./Dishes.module.scss";
import { ProductsContext } from "../../constants";
import React from "react"

function Dishes() {
  
    let contextData = React.useContext(ProductsContext);
  
    return (
        <div className={styles.dishes}>
          {contextData.map((item: any) => {
            return (
              <Dish
                key={item.id}
                dish={item}
              />
            );
          })}
        </div>
  );
}

export default Dishes;