import React, { ComponentType } from "react";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Router,
  RouterProps,
  Routes,
} from "react-router-dom";
import {
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
  loading: boolean;
  error: any;
  addToCart: (product: Product) => Promise<void>;
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
    super(props);
    this.state = {
      products: [],
      cart: [],
      error: null,
      loading: false,
      addToCart: this.addToCart,
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
              <Route path="/cart" element={<Cart/>}/>
            </Routes>
            <Dishes />
          </div>
        </ProductsContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
