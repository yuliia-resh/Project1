import Dish from "./Dish/Dish";
import styles from "./Dishes.module.scss";
import { ProductsContext } from "../../context/productsContext";
import { ProductType } from "../../types/types";
import { useContext } from "react";

function Dishes() {
  const context = useContext(ProductsContext);

  return (
    <div className={styles.dishes}>
      {context.searchRequest.length === 0 ? ( // I need to rewrite this piece of code, but expressions with IF don't work. How can I do this?
        context.productsList.map((product: ProductType) => {
          return (
            <Dish
              dish={product}
              key={product.id}
              addToCart={(product) => {
                context.addToCart(product);
              }}
            />
          );
        })
      ) : context.searchRequest.length > 0 &&
        context.searchResults.length > 0 ? (
        context.searchResults.map((product: ProductType) => {
          return (
            <Dish
              dish={product}
              key={product.id}
              addToCart={(product) => {
                context.addToCart(product);
              }}
            />
          );
        })
      ) : (
        <div className={styles.noResults}>
          <p>No results found. Try another request.</p>
        </div>
      )}
    </div>
  );
}

export default Dishes;
