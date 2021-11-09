import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  deleteCartProduct,
  getAllProducts,
  getCartProducts,
  postToCart,
  updateCartProductWithId,
} from "./api";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Dishes from "./components/Dishes/Dishes";
import Header from "./components/Header/Header";
import { ProductsContext } from "./context/productsContext";

type State = {
  products: [];
  cart: [];
  searchResults: Product[];
  loading: boolean;
  error: any;
  addToCart: (product: Product) => Promise<void>;
  deleteFromCart: (productId: number) => Promise<void>;
  handleCartClick: () => void;
  handleSearch: (string: string) => void;
  searchRequest: string;
  isCartVisible: boolean;
};

type Product = {
  id: number;
  title: string;
  ingredients: [];
  price: number;
  image: string;
};

type cartItem = {
  id: number;
  title: string;
  ingredients: [];
  price: number;
  image: string;
  count: number;
};

class App extends React.Component<{}, State> {
  constructor(props: any) {
    // props type is any because we dont have any props in this component but we should use the super method for the constructor
    super(props);
    this.state = {
      products: [],
      cart: [],
      searchResults: [],
      error: null,
      loading: false,
      addToCart: this.addToCart,
      deleteFromCart: this.deleteFromCart,
      handleCartClick: this.handleCartClick,
      handleSearch: this.handleSearch,
      searchRequest: "",
      isCartVisible: false,
    };
  }

  async getProductsApi() {
    this.setState({ loading: true });
    try {
      const { data } = await getAllProducts();
      this.setState({ products: data });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  async getCartProductsApi() {
    this.setState({ loading: true });
    try {
      const { data } = await getCartProducts();
      this.setState({ cart: data });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  addToCart = async (product: Product) => {
    const newObj = { ...product, count: 1 };
    const cartProduct: any = this.state.cart.find(
      //I dont know which type i should use on cartProduct
      (cartProd: cartItem) => cartProd.id === product.id
    );
    if (!cartProduct) {
      try {
        await postToCart(newObj);
        await this.getCartProductsApi();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const updatedObj = {
          ...cartProduct,
          count: cartProduct.count + 1,
        };
        await updateCartProductWithId(updatedObj);
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

  handleCartClick = () => {
    this.setState({ isCartVisible: !this.state.isCartVisible });
  };

  handleSearch = (string: string) => {
    const searchResult = this.state.products.filter((product: Product) => {
      return product.title.toLowerCase().substring(0, 4).includes(string);
    });
    this.setState({ searchResults: searchResult, searchRequest: string });
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
