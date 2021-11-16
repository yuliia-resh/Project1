import { useEffect, useState } from "react";

import { useToggle } from "rooks";
import {
  deleteCartProductApi,
  getAllProductsApi,
  getCartProductsApi,
  postToCartApi,
  updateCartProductByIdApi,
} from "../../../api";
import { connect } from "../../connect";
import { StoreContext } from "../../context/storeContext";
import { CartItemType, ContextType, ProductType } from "../../types/types";

function Store(props: any) {
  const [productsList, setProductsList] = useState([]);
  const [shopingCart, setShopingCart] = useState([]);
  const [searchRequest, setSearchRequest] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useToggle(false);
  const [isCartVisible, setCartVisible] = useToggle(false);

  const toggle = (setSomething: any) => {
    if (setSomething === setLoading) {
      setLoading(!isLoading);
    }
    if (setSomething === setCartVisible) {
      setCartVisible(!isCartVisible);
    }
  };

  const getProducts = async (search: string): Promise<any> => {
    const result = {
      payload: null,
      error: null,
    };

    toggle(setLoading);
    try {
      const { data } = await getAllProductsApi();

      if (!search) return data;

      setProductsList(data);
      result.payload = data;
    } catch (error: any) {
      console.log(error);
      result.error = error;
    } finally {
      toggle(setLoading);
      return result;
    }
  };

  const getCartProducts = async (): Promise<any> => {
    const result = {
      payload: null,
      error: null,
    };

    try {
      const { data } = await getCartProductsApi();
      setShopingCart(data);
      result.payload = data;
    } catch (error: any) {
      console.log(error);
      result.error = error;
    } finally {
      return result;
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
        await postToCartApi(newProduct);
        await getCartProducts();
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
        await getCartProducts();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteFromCart = async (productId: number): Promise<void> => {
    try {
      await deleteCartProductApi(productId);
      await getCartProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCartComponent = (): void => {
    toggle(setCartVisible);
  };

  const searchProduct = (string: string): void => {
    toggle(setLoading);

    const searchResults = productsList.filter((product: ProductType) => {
      return (
        product.ingredients.find((ingerdient: string) =>
          ingerdient.toLowerCase().includes(string)
        ) || product.title.toLowerCase().includes(string)
      );
    });

    setSearchResults(searchResults);
    setSearchRequest(string);
    toggle(setLoading);
  };

  const getContext = (): ContextType => {
    return {
      productsList: productsList,
      shopingCart: shopingCart,
      isCartVisible: isCartVisible,
      searchRequest: searchRequest,
      searchResults: searchResults,
      isLoading: isLoading,
      addToCart: addToCart,
      deleteFromCart: deleteFromCart,
      toggleCartComponent: toggleCartComponent,
      searchProduct: searchProduct,
      getTotalPrice: getTotalPrice,
      getCountsOfProducts: getCountsOfProducts,
    };
  };

  useEffect(() => {
    getCartProducts();
    getProducts();

    getProducts().then((result) => setSearchResults(result.payload));
  }, []);

  const { children } = props;
  const context = getContext();

  return (
    <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
  );
}

export default connect(Store);
