import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./products/productSlice";
import filterSlice from "./filterSlice";
import staffSlice from "./staff/staffSlice";
import orderSlice from "./order/orderSlice";

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    filters: filterSlice.reducer,
    staffs: staffSlice.reducer,
    orders: orderSlice.reducer,
  },
});

export default store;
