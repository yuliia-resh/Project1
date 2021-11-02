import React from "react";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Dishes from "./components/Dishes/Dishes";
import Header from "./components/Header/Header";
import { PRODUCTS } from "./constants/products";
import { ProductsContext } from "./context/productsContext";

class App extends React.Component {
  render() {
    return (
      <ProductsContext.Provider value={PRODUCTS}>
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
