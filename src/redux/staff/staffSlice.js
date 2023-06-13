import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStaffs = createAsyncThunk("staff/fetchStaffs", async () => {
  const res = await axios.get(
    "https://6487d4750e2469c038fc8bea.mockapi.io/api/v1/staffs"
  );
  return res.data;
});

export const deleteStaff = createAsyncThunk(
  "staff/deleteStaff",
  async (staffId) => {
    await axios.delete(
      `https://6487d4750e2469c038fc8bea.mockapi.io/api/v1/staffs/${staffId}`
    );
    return staffId;
  }
);

export const createStaff = createAsyncThunk(
  "staff/createStaff",
  async (staffData) => {
    const res = await axios.post(
      "https://6487d4750e2469c038fc8bea.mockapi.io/api/v1/staffs",
      staffData
    );
    return res.data;
  }
);

export const editStaff = createAsyncThunk(
  "staff/editStaff",
  async (staffData) => {
    const res = await axios.put(
      `https://6487d4750e2469c038fc8bea.mockapi.io/api/v1/staffs/${staffData.id}`,
      staffData
    );
    return res.data;
  }
);

const staffSlice = createSlice({
  name: "staff",
  initialState: { status: "pending", totalPage: 1, staff: [] },
  reducers: {
    getAllStaff: (state, action) => {},
  },
  extraReducers: {
    [fetchStaffs.fulfilled]: (state, action) => {
      state.staff = action.payload;
      state.totalPage = Math.ceil(state.staff.length / 10);
    },
    [deleteStaff.fulfilled]: (state, action) => {
      state.staff = state.staff.filter((staff) => {
        return !(staff.id == action.payload);
      });
      state.totalPage = Math.ceil(state.staff.length / 10);
    },
    [createStaff.fulfilled]: (state, action) => {
      state.staff.push(action.payload);
      state.totalPage = Math.ceil(state.staff.length / 10);
    },
    [editStaff.fulfilled]: (state, action) => {
      const editedStaff = action.payload;
      const index = state.staff.findIndex(
        (staff) => staff.id === editedStaff.id
      );
      if (index !== -1) {
        state.staff[index] = editedStaff;
      }
    },
  },
});

export default staffSlice;
