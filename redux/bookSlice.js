import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({
  name: 'livros',
  initialState: {
    total: 0,
  },
  reducers: {
    incrementar: (state) => {
      state.total += 1;
    },
    decrementar: (state) => {
      if (state.total > 0) state.total -= 1;
    },
    resetar: (state) => {
      state.total = 0;
    },
  },
});

export const { incrementar, decrementar, resetar } = bookSlice.actions;
export default bookSlice.reducer;
