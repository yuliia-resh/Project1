import { useEffect, useState } from "react";
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
import { CartItemType, ProductType} from "./shared/types/types";
import Loading from "./shared/components/Loading/Loading";

function App() {
  const [productsList, setProductsList] = useState([]);
  const [shopingCart, setShopingCart] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false);
  const [searchRequest, setSearchRequest] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getProductsApi = async (): Promise<void> => {
    setLoading(true);
    try {
      const { data } = await getAllProducts();
      setProductsList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCartProductsApi = async (): Promise<void> => {
    try {
      const { data } = await getCartProducts();
      setShopingCart(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalPrice = (): number => {
    return shopingCart.reduce((acc: number, curr: CartItemType) => {
      return acc + curr.count * curr.price;
    }, 0);
  };

  const getCountsOfProducts = (): number => {
    return shopingCart.reduce((acc: number, item: CartItemType) => {
      return acc + item.count;
    }, 0);
  };

  const addToCart = async (product: ProductType): Promise<void> => {
    const newProduct = { ...product, count: 1 };
    const cartProduct: any = shopingCart.find(
      (cartProd: CartItemType) => cartProd.id === product.id
    );

    if (!cartProduct) {
      try {
        await postToCart(newProduct);
        await getCartProductsApi();
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
        await getCartProductsApi();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteFromCart = async (productId: number): Promise<void> => {
    try {
      await deleteCartProduct(productId);
      await getCartProductsApi();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCartComponent = (): void => {
    setCartVisible(!isCartVisible);
  };

  const searchProduct = (string: string): void => {
    setLoading(true);
    const searchResults = productsList.filter((product: ProductType) => {
      return (
        product.ingredients.find((ingerdient: string) =>
          ingerdient.toLowerCase().includes(string)
        ) || product.title.toLowerCase().includes(string)
      );
    });
    setSearchResults(searchResults);
    setSearchRequest(string);
    setLoading(false);
  };

  const context = {
    productsList: productsList,
    shopingCart: shopingCart,
    searchResults: searchResults,
    searchRequest: searchRequest,
    isCartVisible: isCartVisible,
    isLoading: isLoading,
    addToCart: addToCart, // Will be better if I give these functions to the props?
    deleteFromCart: deleteFromCart,
    getCountsOfProducts: getCountsOfProducts,
    toggleCartComponent: toggleCartComponent,
    searchProduct: searchProduct,
    getTotalPrice: getTotalPrice
  };

  useEffect(() => {
    getCartProductsApi();
    getProductsApi();
  }, []);

  return (
    <BrowserRouter>
      <ProductsContext.Provider value={context}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/cart" element={<Cart />} />
          </Routes>
          {context.isLoading ? <Loading /> : <Dishes />}
        </div>
      </ProductsContext.Provider>
    </BrowserRouter>
  );
}

export default App;
