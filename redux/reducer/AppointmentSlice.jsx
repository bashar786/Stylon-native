// redux/reducer/appointmentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    list: [],
  },
  reducers: {
    addAppointment: (state, action) => {
      state.list.push(action.payload);
    },
    setAppointments: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { addAppointment, setAppointments } = appointmentSlice.actions;
export default appointmentSlice.reducer;
