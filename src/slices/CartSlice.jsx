import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  };
  
  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };
const initialState = {
  cart: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addedToCart(state, action) {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state.cart)
    },
    updateQuantity(state, action) {
        const { id, quantity } = action.payload;
        const product = state.cart.find((item) => item.id === id);
        if (product) {
          product.quantity += quantity;
  
          if (product.quantity <= 0) {
            state.cart = state.cart.filter((item) => item.id !== id);
          }
        }
        saveCartToLocalStorage(state.cart)
    },
    removeFromCart(state, action) {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
        saveCartToLocalStorage(state.cart)
    },
  },
});

export const { addedToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
