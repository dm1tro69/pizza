import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type FetchPizzaArgs = {
  currentPage: string;
  catId: string;
  sort: string;
  search: string;
};

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzaArgs) => {
    const { currentPage, catId, sort, search } = params;
    const response = await axios.get<Pizza[]>(
      `https://628cde00a3fd714fd03af787.mockapi.io/items?page=${currentPage}&limit=4&${catId}&sortBy=${sort}${search}`,
    );
    return response.data;
  },
);

type Pizza = {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
  rating: number;
  types: number[];
  sizes: number[];
};

interface PizzaSliceState {
  items: Pizza[];
}

const initialState: PizzaSliceState = {
  items: [],
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    // @ts-ignore
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
