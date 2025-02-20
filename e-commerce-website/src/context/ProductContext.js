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
      console.log("API response:", response); // Log the entire response
      const data = response.data; // Access the data property
      console.log("API response data:", data); // Log the data property
      if (data && data.items) {
        const transformedProducts = data.items.map(item => ({
          id: item.id,
          name: item.name,
          image: item.imageName,
          price: item.price
        }));
        console.log("Transformed products:", transformedProducts); // Log the transformed products
        setProducts(transformedProducts);
      } else {
        setProducts([]);
      }
      return data; // Return the data
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ProductContext.Provider value={{ products, loadProducts, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);