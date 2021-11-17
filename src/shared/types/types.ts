export type ContextType = {
  shopingCart: CartItemType[];
  searchRequest: string;
  addToCart: (product: ProductType) => Promise<void>;
  deleteFromCart: (productId: number) => Promise<void>;
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

export type CartItemInfoType = {
  id: number;
  title: string;
  subTotal: number;
  quantity: number;
  deleteFromCart: (id: number) => void;
};

export type PropsType = {
  store: ContextType;
};
