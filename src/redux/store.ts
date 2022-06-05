import { configureStore } from '@reduxjs/toolkit';
import { filterSlice } from './slices/filterSlice';
import { cartSlice } from './slices/cartSlice';
import { pizzaSlice } from './slices/pizzaSlice';

export const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    cart: cartSlice.reducer,
    pizza: pizzaSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
