import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    search: "",
    pagination: 1,
  },
  reducers: {
    searchFilterChange: (state, action) => {
      // mutation || IMMER
      state.search = action.payload;
      state.pagination = 1;
    },
    paginationFilterChange: (state, action) => {
      state.pagination = action.payload;
      state.search = "";
    },
  },
});

export const { paginationFilterChange, searchFilterChange } =
  filterSlice.actions;
export default filterSlice;
