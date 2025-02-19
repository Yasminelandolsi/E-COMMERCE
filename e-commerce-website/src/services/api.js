import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

// Categories
export const fetchCategories = () => axios.get(`${API_BASE_URL}/categories`);

// Products
export const fetchProductLists = () => axios.get(`${API_BASE_URL}/products-lists`);
export const fetchAllProducts = () => axios.get(`${API_BASE_URL}/products`);
export const fetchProductById = (productId) => axios.get(`${API_BASE_URL}/products/${productId}`);
export const fetchProductsByCategory = (productListId) => axios.get(`${API_BASE_URL}/products-lists/${productListId}`);
export const fetchSearchResults = (query) => axios.get(`${API_BASE_URL}/products?q=${query}`);

// Top Products
export const fetchTopSellers = () => axios.get(`${API_BASE_URL}/top-sellers-products`);
export const fetchNewArrivals = () => axios.get(`${API_BASE_URL}/top-new-products`);

// Cart
export const fetchCart = (cartId) => axios.get(`${API_BASE_URL}/carts/${cartId}`);
export const addToCart = (cartId, product) => axios.post(`${API_BASE_URL}/carts/${cartId}`, product);
export const updateCartItem = (cartId, itemId, updatedItem) => axios.put(`${API_BASE_URL}/carts/${cartId}/items/${itemId}`, updatedItem);
export const removeCartItem = (cartId, itemId) => axios.delete(`${API_BASE_URL}/carts/${cartId}/items/${itemId}`);

// Orders
export const fetchOrders = () => axios.get(`${API_BASE_URL}/orders`);
export const createOrder = (orderData) => axios.post(`${API_BASE_URL}/orders`, orderData);
