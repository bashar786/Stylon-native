// redux/reducer/bookingSlice.js

import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    specialists: [],
    selectedSpecialistId: null,
  },
  reducers: {
    addSpecialist: (state, action) => {
      state.specialists.push(action.payload);
    },
    setSelectedSpecialist: (state, action) => {
      state.selectedSpecialistId = action.payload;
    },
  },
});

export const { addSpecialist, setSelectedSpecialist } = bookingSlice.actions;
export default bookingSlice.reducer;
