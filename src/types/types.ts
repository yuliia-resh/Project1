export type AppState = {
  products: Product[];
  cart: CartItem[];
  isLoading: boolean;
  error: any;
  addToCart: (product: Product) => Promise<void>;
  deleteFromCart: (productId: number) => Promise<void>;
  handleClick: () => void;
  isCartVisible: boolean;
};

export type Product = {
  id: number;
  title: string;
  ingredients: string[];
  price: number;
  image: string;
};

export type CartItem = {
  id: number;
  title: string;
  ingredients: string[];
  price: number;
  image: string;
  count: number;
};

export type CartItemInfo = {
    id: number;
    title: string;
    subTotal: number;
    quantity: number;
    deleteFromCart: (id: number) => void
}