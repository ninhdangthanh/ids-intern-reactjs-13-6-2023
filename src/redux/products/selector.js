import { createSelector } from "@reduxjs/toolkit";

export const productsSelector = (state) => state.products.products;
export const totalPageSelector = (state) => state.products.totalPage;
export const paginationSelector = (state) => state.filters.pagination;
export const searchSelector = (state) => state.filters.search;
export const isLoadingSelector = (state) => state.products.isLoading;

export const productsRemainingSelector = createSelector(
  productsSelector,
  totalPageSelector,
  paginationSelector,
  searchSelector,
  (products, totalPage, pagination, search) => {
    if (search == "") {
      return products.slice((pagination - 1) * 10, pagination * 10);
    } else {
      return products.filter((product) => {
        return product.name.includes(search);
      });
    }
  }
);
