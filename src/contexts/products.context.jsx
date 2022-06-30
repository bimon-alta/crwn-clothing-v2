import { createContext, useState } from "react";

import PRODUCTS from '../shop-data.json';

export const ProducstContext = createContext({
  products: [],
});

export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = {products};
  return (
    <ProducstContext.Provider value={value}>{children}</ProducstContext.Provider>
  )
}