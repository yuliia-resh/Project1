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
import Cart from "./components/Cart/Cart";
import Dishes from "./components/Dishes/Dishes";
import Header from "./components/Header/Header";
import { ProductsContext } from "./context/productsContext";
import { AppState, CartItem, Product } from "./types/types";

class App extends React.Component<{}, AppState> {
  constructor(_: unknown) {
    super({});
    this.state = {
      products: [],
      cart: [],
      error: null,
      isLoading: false,
      isCartVisible: false,
      addToCart: this.addToCart,
      deleteFromCart: this.deleteFromCart,
      handleClick: this.handleClick,
    };
  }
  // get cart() {
  //   return this.state.cart;
  // }

  async getProductsApi() {
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

  async getCartProductsApi() {
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

  addToCart = async (product: Product) => {
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

  deleteFromCart = async (productId: number) => {
    try {
      await deleteCartProduct(productId);
      await this.getCartProductsApi();
    } catch (error) {
      console.log(error);
    }
  };

  handleClick = () => {
    this.setState({ isCartVisible: !this.state.isCartVisible });
  };

  componentDidMount() {
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
