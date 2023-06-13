import { createSelector } from "@reduxjs/toolkit";

export const ordersSelector = (state) => state.orders.orders;
export const totalPageSelector = (state) => state.orders.totalPage;
export const paginationSelector = (state) => state.filters.pagination;
export const searchSelector = (state) => state.filters.search;
export const isLoadingSelector = (state) => state.products.isLoading;

export const ordersRemainingSelector = createSelector(
  ordersSelector,
  totalPageSelector,
  paginationSelector,
  searchSelector,
  (orders, totalPage, pagination, search) => {
    if (search == "") {
      return orders.slice((pagination - 1) * 10, pagination * 10);
    } else {
      return orders.filter((order) => {
        return order.quantity.includes(search);
      });
    }
  }
);
