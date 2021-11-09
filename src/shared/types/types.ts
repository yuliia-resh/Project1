export type AppStateType = {
  products: ProductType[];
  cart: CartItemType[];
  isLoading: boolean;
  error: any;
  isCartVisible: boolean;
  getCountsOfProducts: () => number;
  addToCart: (product: ProductType) => Promise<void>;
  deleteFromCart: (productId: number) => Promise<void>;
  toggleCart: () => void;
  getTotalPrice: () => number;
};

export type ProductType = {
  id: number;
  title: string;
  ingredients: string[];
  price: number;
  image: string;
};

export type CartItemType = {
  id: number;
  title: string;
  ingredients: string[];
  price: number;
  image: string;
  count: number;
};

export type CartItemInfoType = {
  id: number;
  title: string;
  subTotal: number;
  quantity: number;
  deleteFromCart: (id: number) => void;
};
