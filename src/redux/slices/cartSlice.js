import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItems = state.items.find((obj) => obj.id === action.payload.id);

      if (findItems) {
        findItems.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((acc, obj) => {
        return acc + obj.price * obj.count;
      }, 0);
    },
    minusItem(state, action) {
      const findItems = state.items.find((obj) => obj.id === action.payload);
      if (findItems) {
        findItems.count--;
        if (findItems.count < 1) findItems.count = 0;
      }
    },

    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
