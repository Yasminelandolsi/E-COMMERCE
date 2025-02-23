import { createSlice } from "@reduxjs/toolkit";

const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return {
        cartId: "unique-cart-id",
        items: [],
        orderTotal: 0
      };
    }
    const state = JSON.parse(serializedState);
    return {
      ...state,
      orderTotal: state.orderTotal || 0
    };
  } catch (err) {
    return {
      cartId: "unique-cart-id",
      items: [],
      orderTotal: 0
    };
  }
};

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
      state.orderTotal = action.payload.orderTotal || 0;
      saveCartState(state);
    },
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

       // Calculate new total immediately
       const cartSubtotal = state.items.reduce((acc, item) => 
        acc + (parseFloat(item.price) || 0) * (parseInt(item.quantity, 10) || 0), 0);
      const tax = cartSubtotal * 0.20;
      state.orderTotal = cartSubtotal + tax;

      saveCartState(state);
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;

      // Calculate new total immediately
      const cartSubtotal = state.items.reduce((acc, item) => 
        acc + (parseFloat(item.price) || 0) * (parseInt(item.quantity, 10) || 0), 0);
      const tax = cartSubtotal * 0.20;
      state.orderTotal = cartSubtotal + tax;

      saveCartState(state);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

     // Calculate new total immediately
     const cartSubtotal = state.items.reduce((acc, item) => 
      acc + (parseFloat(item.price) || 0) * (parseInt(item.quantity, 10) || 0), 0);
    const tax = cartSubtotal * 0.20;
    state.orderTotal = cartSubtotal + tax;
      saveCartState(state);
    },
    updateOrderTotal: (state, action) => {
      state.orderTotal = action.payload || 0;
      saveCartState(state);
    }
  },
});

export const { setCart, addItem, updateItem, removeItem, updateOrderTotal } = cartSlice.actions;
export default cartSlice.reducer;