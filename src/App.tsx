import React from "react";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Dishes from "./components/Dishes/Dishes";
import Header from "./components/Header/Header";
import { ProductsContext } from "./context/productsContext";
import { getAllProducts } from "./api";


class App extends React.Component<{}, {products: [], loading: boolean, error: any}> {
  constructor(props: any) {
    super(props);
    this.state = { products: [], error: null, loading: false };
  }

  async getProductApi() {
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

  componentDidMount() {
    this.getProductApi();
  }

  render() {
    return (
      <ProductsContext.Provider value={this.state.products}>
        <div className="App">
          <Header />
          <Dishes />
          <Cart />
        </div>
      </ProductsContext.Provider>
    );
  }
}

export default App;
