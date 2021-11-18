import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import queryStirng from "query-string";
import Dish from "./Dish/Dish";
import styles from "./Dishes.module.scss";
import { ProductType, PropsType } from "../../../types/types";
import { connect } from "../../../connect";
import Loading from "../../../components/Loading/Loading";

function Dishes(props: PropsType) {
  const { store } = props;
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const parsedSearch: any = queryStirng.parse(location.search);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);

      const products = await store.getProducts(parsedSearch.search);
      setProducts(products.payload);

      setLoading(false);
    };

    loadDetails();
  }, [location.search]);

  return (
    <div className={styles.dishes}>
      {isLoading && <Loading />}

      {isLoading === false &&
        parsedSearch?.search?.length > 0 &&
        products.length === 0 && (
          <div className={styles.noResults}>
            <p>No results found. Try another request.</p>
          </div>
        )}

      {isLoading === false &&
        products.length > 0 &&
        products.map((product: ProductType) => (
          <Dish
            dish={product}
            key={product.id}
            onAddToCart={(product: ProductType) => {
              store.onAddToCart(product);
            }}
          />
        ))}
    </div>
  );
}

export default connect(Dishes);
