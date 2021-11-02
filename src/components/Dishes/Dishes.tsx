import Dish from "./Dish/Dish";
import styles from "./Dishes.module.scss";
import { ProductsContext } from "../../context/productsContext";
import { useContext } from "react";

function Dishes() {
  const productsContext = useContext(ProductsContext);

  type Product = {
    id: number;
    name: string;
    ingredients: string;
    price: number;
    imgUrl: string;
  };
  return (
    <div className={styles.dishes}>
      {productsContext.map((item: Product) => (
        <Dish key={item.id} dish={item} click={() => console.log(item)} />
      ))}
    </div>
  );
}

export default Dishes;
