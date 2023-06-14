import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  const res = await axios.get(
    "https://6487d6500e2469c038fc8e91.mockapi.io/api/v1/orders"
  );
  return res.data;
});

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId) => {
    await axios.delete(
      `https://6487d6500e2469c038fc8e91.mockapi.io/api/v1/orders/${orderId}`
    );
    return orderId;
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData) => {
    const res = await axios.post(
      "https://6487d6500e2469c038fc8e91.mockapi.io/api/v1/orders",
      orderData
    );
    return res.data;
  }
);

export const editOrder = createAsyncThunk(
  "order/editOrder",
  async (orderData) => {
    console.log({ orderData });
    const res = await axios.put(
      `https://6487d6500e2469c038fc8e91.mockapi.io/api/v1/orders/${orderData.id}`,
      orderData
    );
    return res.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: { isLoading: false, totalPage: 1, orders: [] },
  reducers: {},
  extraReducers: {
    [fetchOrders.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;
      state.totalPage = Math.ceil(state.orders.length / 10);
      state.isLoading = false;
    },
    [deleteOrder.fulfilled]: (state, action) => {
      state.orders = state.orders.filter((order) => {
        return !(order.id == action.payload);
      });
      state.totalPage = Math.ceil(state.orders.length / 10);
    },
    [createOrder.fulfilled]: (state, action) => {
      state.orders.push(action.payload);
      state.totalPage = Math.ceil(state.orders.length / 10);
    },
    [editOrder.fulfilled]: (state, action) => {
      const editedOrder = action.payload;
      const index = state.orders.findIndex(
        (order) => order.id === editedOrder.id
      );
      if (index !== -1) {
        state.orders[index] = editedOrder;
      }
    },
  },
});

export default orderSlice;
