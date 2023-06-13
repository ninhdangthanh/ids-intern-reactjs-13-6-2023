import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const res = await axios.get(
      "https://6487d4750e2469c038fc8bea.mockapi.io/api/v1/products"
    );
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId) => {
    await axios.delete(
      `https://6487d4750e2469c038fc8bea.mockapi.io/api/v1/products/${productId}`
    );
    return productId;
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData) => {
    const res = await axios.post(
      "https://6487d4750e2469c038fc8bea.mockapi.io/api/v1/products",
      productData
    );
    return res.data;
  }
);

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (productData) => {
    const res = await axios.put(
      `https://6487d4750e2469c038fc8bea.mockapi.io/api/v1/products/${productData.id}`,
      productData
    );
    return res.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: { isLoading: false, totalPage: 1, products: [] },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = true;
    },
    removeIsLoading: (state, action) => {
      state.isLoading = false;
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.totalPage = Math.ceil(state.products.length / 10);
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.products = state.products.filter((product) => {
        return !(product.id == action.payload);
      });
      state.totalPage = Math.ceil(state.products.length / 10);
    },
    [createProduct.fulfilled]: (state, action) => {
      state.products.push(action.payload);
      state.totalPage = Math.ceil(state.products.length / 10);
    },
    [editProduct.fulfilled]: (state, action) => {
      const editedProduct = action.payload;
      const index = state.products.findIndex(
        (product) => product.id === editedProduct.id
      );
      if (index !== -1) {
        state.products[index] = editedProduct;
      }
    },
  },
});

export const { setIsLoading, removeIsLoading } = productSlice.actions;
export default productSlice;
