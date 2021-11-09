import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  deleteCartProduct,
  getAllProducts,
  getCartProducts,
  postToCart,
  updateCartProductById,
} from "./api";
import "./App.css";
import Cart from "./shared/components/Cart/Cart";
import Dishes from "./shared/components/Dishes/Dishes";
import Header from "./shared/components/Header/Header";
import { ProductsContext } from "./shared/context/productsContext";
import { AppState, CartItem, Product } from "./shared/types/types";

class App extends React.Component<unknown, AppState> {
  constructor() {
    super({});
    this.state = {
      products: [],
      cart: [],
      error: null,
      isLoading: false,
      isCartVisible: false,
      getCountsOfProducts: this.getCountsOfProducts,
      getTotalPrice: this.getTotalPrice,
      addToCart: this.addToCart,
      deleteFromCart: this.deleteFromCart,
      handleClick: this.handleClick,
    };
  }


  // get cart() {
  //   return this.state.cart;
  // }

  async getProductsApi(): Promise<void> {
    this.setState({ isLoading: true });
    try {
      const { data } = await getAllProducts();
      this.setState({ products: data });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async getCartProductsApi(): Promise<void> {
    this.setState({ isLoading: true });
    try {
      const { data } = await getCartProducts();
      this.setState({ cart: data });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  getTotalPrice = (): number => {
    return this.state.cart.reduce((acc: number, curr: CartItem) => {
      return acc + curr.count * curr.price;
    }, 0)
  };

  getCountsOfProducts = (): number => {
    return this.state.cart.reduce((acc: number, item: CartItem) => {
      return acc + item.count;
    }, 0)
  }

  addToCart = async (product: Product): Promise<void> => {
    const newProduct = { ...product, count: 1 };
    const cartProduct = this.state.cart.find(
      (cartProd: CartItem) => cartProd.id === product.id
    );
    if (!cartProduct) {
      try {
        await postToCart(newProduct);
        await this.getCartProductsApi();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const updatedProduct = {
          ...cartProduct,
          count: cartProduct.count + 1,
        };
        await updateCartProductById(updatedProduct);
        await this.getCartProductsApi();
      } catch (error) {
        console.log(error);
      }
    }
  };

  deleteFromCart = async (productId: number): Promise<void> => {
    try {
      await deleteCartProduct(productId);
      await this.getCartProductsApi();
    } catch (error) {
      console.log(error);
    }
  };

  handleClick = (): void => {
    this.setState({ isCartVisible: !this.state.isCartVisible });
  };

  componentDidMount(): void {
    this.getCartProductsApi();
    this.getProductsApi();
  }

  render() {
    return (
      <BrowserRouter>
        <ProductsContext.Provider value={this.state}>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/cart" element={<Cart />} />
            </Routes>
            <Dishes />
          </div>
        </ProductsContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
