import { createSelector } from "@reduxjs/toolkit";

export const staffSelector = (state) => state.staffs.staff;
export const totalPageSelector = (state) => state.staffs.totalPage;
export const paginationSelector = (state) => state.filters.pagination;
export const searchSelector = (state) => state.filters.search;

export const staffsRemainingSelector = createSelector(
  staffSelector,
  totalPageSelector,
  paginationSelector,
  searchSelector,
  (staffs, totalPage, pagination, search) => {
    if (search == "") {
      return staffs.slice((pagination - 1) * 10, pagination * 10);
    } else {
      return staffs.filter((staff) => {
        return staff.name.includes(search);
      });
    }
  }
);
