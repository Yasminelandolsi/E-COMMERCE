import { createSlice } from "@reduxjs/toolkit";

// Load cart state from localStorage
const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return {
        cartId: "unique-cart-id",
        items: [],
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      cartId: "unique-cart-id",
      items: [],
    };
  }
};

// Save cart state to localStorage
const saveCartState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartState(),
  reducers: {
    setCart: (state, action) => {
      state.cartId = action.payload.id;
      state.items = action.payload.items || [];
      saveCartState(state);
    },
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveCartState(state);
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
      saveCartState(state);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartState(state);
    },
  },
});

export const { setCart, addItem, updateItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;