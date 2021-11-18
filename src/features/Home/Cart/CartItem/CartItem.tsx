import styles from "./CartItem.module.scss";

interface Props {
  item: { id: number; title: string; subTotal: number; quantity: number };
  onDeleteFromCart: (id: number) => void;
}

function CartItem(props: Props) {
  const { item, onDeleteFromCart } = props;
  const { id, title, subTotal, quantity } = item;

  return (
    <div className={styles.cartItem}>
      <div className={styles.flexElements}>
        <p>{title}</p>
        <img
          src="https://www.pngall.com/wp-content/uploads/5/Delete-Bin-Trash-Transparent.png"
          alt="Trash bin"
          onClick={() => {
            onDeleteFromCart(id);
          }}
        />
      </div>

      <p>Quantity: {quantity}</p>
      <p>Sub-total: {subTotal}$</p>
    </div>
  );
}

export default CartItem;
