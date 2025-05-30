// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import salonReducer from './reducer/SaloonReducer';

export const store = configureStore({
  reducer: {
    salon: salonReducer,
  },
});