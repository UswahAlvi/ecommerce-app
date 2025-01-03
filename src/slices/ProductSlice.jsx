import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
  currentProduct: {},
  error: null,
  cart:[]
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productsLoading(state) {
      state.isLoading = true;
    },
    productsLoaded(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },
    setError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    currentProductLoaded(state, action) {
      state.isLoading = false;
      state.currentProduct = action.payload;
    },
    addedToCart(state,action){
      state.cart=[...state.cart,action.payload]
    }
  },
});

export const { productsLoading, productsLoaded, setError, currentProductLoaded , addedToCart} = productSlice.actions;

export function fetchProducts() {
  return async function (dispatch) {
    try {
      dispatch(productsLoading());
      const res = await fetch("https://dummyjson.com/products");
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      dispatch(productsLoaded(data.products));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
}


export function fetchProduct(productId) {
  return async function (dispatch) {
    try {
      dispatch(productsLoading());
      const res = await fetch(`https://dummyjson.com/products/${productId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await res.json();
      console.log(data);
      dispatch(currentProductLoaded(data));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
}


export const productReducer = productSlice.reducer;
