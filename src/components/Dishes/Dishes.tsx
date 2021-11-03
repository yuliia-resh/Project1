import Dish from "./Dish/Dish";
import styles from "./Dishes.module.scss";
import { ProductsContext } from "../../context/productsContext";
import { useContext } from "react";

type Product = {
  id: number;
  name: string;
  ingredients: string;
  price: number;
  imgUrl: string;
};

function Dishes() {
  const productsContext = useContext(ProductsContext);
  return (
    <div className={styles.dishes}>
      {productsContext.map((product: Product) => (
        <Dish key={product.id} dish={product} click={() => console.log(product)} />
      ))}
    </div>
  );
}

export default Dishes;
