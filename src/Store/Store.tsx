import { useEffect, useState } from "react";

import {
  deleteCartProductApi,
  getAllProductsApi,
  getCartProductsApi,
  postToCartApi,
  updateCartProductByIdApi,
} from "../api";
import { connect } from "../connect";
import { StoreContext } from "./context/storeContext";
import { CartItemType, ContextType, ProductType } from "../types/types";

function Store(props: any) {
  const [shopingCart, setShopingCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const searchRequest: string = "";

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

  const onAddToCart = async (product: ProductType): Promise<void> => {
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

  const onDeleteFromCart = async (productId: number): Promise<void> => {
    try {
      await deleteCartProductApi(productId);
      await getCartProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async (search: string): Promise<any> => {
    const result: any = {
      payload: null,
      error: null,
    };

    try {
      const { data } = await getAllProductsApi();
      if (!search) result.payload = data;
      else {
        const searchResults = data.filter((product: ProductType) => {
          return (
            product.ingredients.find((ingerdient: string) =>
              ingerdient.toLowerCase().includes(search)
            ) || product.title.toLowerCase().includes(search)
          );
        });
        result.payload = searchResults;
      }
    } catch (error: any) {
      console.log(error);
      result.error = error;
    } finally {
      return result;
    }
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const getContext = (): ContextType => {
    return {
      shopingCart: shopingCart,
      searchRequest: searchRequest,
      isCartVisible: isCartVisible,
      toggleCart: toggleCart,
      onAddToCart: onAddToCart,
      onDeleteFromCart: onDeleteFromCart,
      getTotalPrice: getTotalPrice,
      getCountsOfProducts: getCountsOfProducts,
      getProducts: getProducts, //add getCartProducts and give it to useEffect in Cart.tsx
    };
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  const { children } = props;
  const context = getContext();

  return (
    <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
  );
}

export default connect(Store);
