export type ContextType = {
  shopingCart: CartItemType[];
  searchRequest: string;
  isCartVisible: boolean;
  toggleCart: () => void;
  onAddToCart: (product: ProductType) => Promise<void>;
  onDeleteFromCart: (productId: number) => Promise<void>;
  getCountsOfProducts: () => number;
  getTotalPrice: () => number;
  getProducts: (search: string) => Promise<any>;
};

export type StoreStateType = {
  shopingCart: CartItemType[];
  searchRequest: string;
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

export type PropsType = {
  store: ContextType;
};
