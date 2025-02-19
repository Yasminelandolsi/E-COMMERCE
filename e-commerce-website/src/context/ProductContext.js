import { createContext, useState, useContext, useCallback } from "react";
import { fetchProductsByCategory } from "../services/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async (productListId) => {
    console.log("loadProducts called with productListId:", productListId);
    setLoading(true);
    setError(null);
    try {
      const response = await fetchProductsByCategory(productListId);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error);
    }
    setLoading(false);
  }, []);

  return (
    <ProductContext.Provider value={{ products, loadProducts, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);