import React from "react";

import {
  StoreStateType,
  CartItemType,
  ProductType,
  ContextType,
} from "../../types/types";
import {
  getAllProductsApi,
  postToCartApi,
  getCartProductsApi,
  updateCartProductByIdApi,
  deleteCartProductApi,
} from "../../../api/index";
import { StoreContext } from "../../context/productsContext";

export default class Store extends React.Component<unknown, StoreStateType> {
  constructor() {
    super({});
    this.state = {
      products: [],
      cart: [],
      isCartVisible: false,
      searchRequest: "",
      searchResults: [],
      error: null,
      isLoading: false,
    };
  }

  getProducts = async (): Promise<void> => {
    this.setState({ isLoading: true });
    try {
      const { data } = await getAllProductsApi();
      this.setState({ products: data });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  getCartProducts = async (): Promise<void> => {
    try {
      const { data } = await getCartProductsApi();
      this.setState({ cart: data });
    } catch (error) {
      console.log(error);
    }
  };

  getTotalPrice = (): number => {
    return this.state.cart.reduce((acc: number, curr: CartItemType) => {
      return acc + curr.count * curr.price;
    }, 0);
  };

  getCountsOfProducts = (): number => {
    return this.state.cart.reduce((acc: number, item: CartItemType) => {
      return acc + item.count;
    }, 0);
  };

  addToCart = async (product: ProductType): Promise<void> => {
    const newProduct = { ...product, count: 1 };
    const cartProduct = this.state.cart.find(
      (cartProd: CartItemType) => cartProd.id === product.id
    );
    if (!cartProduct) {
      try {
        await postToCartApi(newProduct);
        await this.getCartProducts();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const updatedProduct = {
          ...cartProduct,
          count: cartProduct.count + 1,
        };
        await updateCartProductByIdApi(updatedProduct);
        await this.getCartProducts();
      } catch (error) {
        console.log(error);
      }
    }
  };

  deleteFromCart = async (productId: number): Promise<void> => {
    try {
      await deleteCartProductApi(productId);
      await this.getCartProducts();
    } catch (error) {
      console.log(error);
    }
  };

  toggleCartComponent = (): void => {
    this.setState({ isCartVisible: !this.state.isCartVisible });
  };

  searchProduct = (string: string): void => {
    this.setState({ isLoading: true });

    const searchResults = this.state.products.filter((product: ProductType) => {
      return (
        product.ingredients.find((ingerdient: string) =>
          ingerdient.toLowerCase().includes(string)
        ) || product.title.toLowerCase().includes(string)
      );
    });

    this.setState({
      searchResults: searchResults,
      searchRequest: string,
      isLoading: false,
    });
  };

  getContext = (): ContextType => {
    return {
      ...this.state,
      addToCart: this.addToCart,
      deleteFromCart: this.deleteFromCart,
      toggleCartComponent: this.toggleCartComponent,
      searchProduct: this.searchProduct,
      getTotalPrice: this.getTotalPrice,
      getCountsOfProducts: this.getCountsOfProducts,
    };
  };

  componentDidMount() {
    this.getProducts();
    this.getCartProducts();
  }

  render() {
    const { children } = this.props;
    const context = this.getContext();

    return (
      <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
    );
  }
}
