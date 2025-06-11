// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import salonReducer from './reducer/SaloonReducer';
import BookingSlice from './reducer/bookingSlice';
import AppointmentSlice from './reducer/AppointmentSlice';
import CustomerSlice from './reducer/CustomerSlice';
export const store = configureStore({
  reducer: {
    salon: salonReducer,
    booking: BookingSlice,
    appointments: AppointmentSlice,
    customer: CustomerSlice
  },
});