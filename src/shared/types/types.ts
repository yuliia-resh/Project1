export type AppStateType = {
  products: ProductType[];
  cart: CartItemType[];
  isLoading: boolean;
  error: any;
  isCartVisible: boolean;
  searchResults: ProductType[];
  searchRequest: string;
  addToCart: (product: ProductType) => Promise<void>;
  deleteFromCart: (productId: number) => Promise<void>;
  toggleCartComponent: () => void;
  searchProduct: (string: string) => void;
  getCountsOfProducts: () => number;
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
