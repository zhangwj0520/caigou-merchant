import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const name = 'demo';

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

const { incrementByAmount } = slice.actions;

const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const actions = { ...slice.actions, incrementAsync };

export default slice;
