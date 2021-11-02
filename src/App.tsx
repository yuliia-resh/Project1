import "./App.css";
import { useState } from "react";
import Dishes from "./components/Dishes/Dishes";
import Header from "./components/Header/Header";
import { ProductsContext } from "./context/productsContext";
import { PRODUCTS } from "./constants/products";

function App() {
  let [productDetails] = useState(PRODUCTS);
  return (
    <ProductsContext.Provider value={productDetails}>
      <div className="App">
        <Header />
        <Dishes />
      </div>
    </ProductsContext.Provider>
  );
}

export default App;
