import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Sort = {
  name: string;
  sortProperty: string;
};

interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  pageCount: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  pageCount: 1,
  sort: { name: 'популярности', sortProperty: 'rating' },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setFilters(state, action: PayloadAction<any>) {
      state.pageCount = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort.sortProperty = action.payload.sort;
    },
  },
});

export const { setCategoryId, setSort, setPageCount, setSearchValue, setFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
