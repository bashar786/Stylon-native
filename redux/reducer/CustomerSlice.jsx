// redux/slices/customerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCustomer: null,
  allCustomers: [], // optional: if you fetch/save customers locally
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    },
    setAllCustomers: (state, action) => {
      state.allCustomers = action.payload;
    },
    addNewCustomer: (state, action) => {
      state.allCustomers.push(action.payload);
    },
  },
});

export const {
  setSelectedCustomer,
  clearSelectedCustomer,
  setAllCustomers,
  addNewCustomer,
} = customerSlice.actions;

export default customerSlice.reducer;
