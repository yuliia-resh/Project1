import styles from "./Dish.module.scss";

type Props = {
    dish: {
        name: string,
        ingredients: string,
        price: number, 
        imgUrl: string
    }
  }

function Dish(props: Props) {
  return (
    <div className={styles.dish}>
      <img src={props.dish.imgUrl} alt={props.dish.name} />
      <div className={styles.infoFlex}>
        <p>{props.dish.name}</p>
        <p>{`${props.dish.price}$`}</p>
      </div>
      <p>{props.dish.ingredients}</p>
      <button type="button">Add to cart</button>
    </div>
  );
}

export default Dish;
