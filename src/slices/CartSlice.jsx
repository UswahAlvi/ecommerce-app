import { createSlice } from "@reduxjs/toolkit";

// Load data from localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const loadParticularProductFromLocalStorage = () => {
  const savedProduct = localStorage.getItem("particularProduct");
  return savedProduct ? JSON.parse(savedProduct) : null;
};

// Save data to localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const saveParticularProductToLocalStorage = (product) => {
  localStorage.setItem("particularProduct", JSON.stringify(product));
};

const initialState = {
  cart: loadCartFromLocalStorage(),
  isParticularProductSelected: Boolean(localStorage.getItem("particularProduct")),
  particularProduct: loadParticularProductFromLocalStorage() || {},
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
      saveCartToLocalStorage(state.cart);
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
      saveCartToLocalStorage(state.cart);
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state.cart);
    },
    selectParticularProduct(state, action) {
      state.isParticularProductSelected = true;
      state.particularProduct = action.payload;
      saveParticularProductToLocalStorage(action.payload);
    },
    deSelectParticularProduct(state) {
      state.isParticularProductSelected = false;
      state.particularProduct = {};
      localStorage.removeItem("particularProduct");
    },
    emptyCart(state) {
      state.cart = [];
      saveCartToLocalStorage(state.cart); 
    },
    
  },
});

export const {
  addedToCart,
  removeFromCart,
  updateQuantity,
  selectParticularProduct,
  deSelectParticularProduct,
  emptyCart
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
