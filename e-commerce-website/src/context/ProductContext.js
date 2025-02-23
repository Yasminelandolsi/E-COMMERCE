import { createContext, useState, useContext, useCallback, useEffect } from "react";
import { fetchProductsByCategory, fetchCategories } from "../services/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async (productListId) => {
    console.log("loadProducts called with productListId:", productListId);
    setLoading(true);
    setError(null);
    try {
      const response = await fetchProductsByCategory(productListId);
      console.log("API response:", response);
      const data = response.data;
      console.log("API response data:", data);
      if (data && data.items) {
        const transformedProducts = data.items.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.imageName,
          price: item.price,
          discountRate: item.discountRate  // Added discountRate field
        }));
        console.log("Transformed products:", transformedProducts);
        setProducts(transformedProducts);
      } else {
        setProducts([]);
      }
      return data;
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchCategories();
        const data = response.data;
        // Adjust based on API response structure
        if (Array.isArray(data)) {
          setCategories(data);
        } else if (data && data.categories) {
          setCategories(data.categories);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    getCategories();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loadProducts, loading, error, categories }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);