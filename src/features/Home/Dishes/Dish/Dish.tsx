import { ProductType } from "../../../../types/types";
import styles from "./Dish.module.scss";
let classNames = require("classnames");

const buttonClasses = classNames(styles.button, styles.gradient);

type Props = {
  dish: ProductType;
  onAddToCart: (dish: ProductType) => void;
};

function Dish(props: Props) {
  const { dish, onAddToCart } = props;
  const productIngredients = dish.ingredients.join(", ");

  return (
    <div className={styles.dish}>
      <img src={dish.image} alt={dish.title} />
      <div className={styles.infoFlex}>
        <p>{dish.title}</p>
        <p>{dish.price}$</p>
      </div>
      <div className={styles.ingredients}>
        <p>{productIngredients}</p>
      </div>

      <div className={styles.buttonOnBottom}>
        <button
          type="button"
          className={buttonClasses}
          onClick={() => {
            onAddToCart(dish);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Dish;
