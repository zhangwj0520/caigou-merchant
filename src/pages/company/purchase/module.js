import { createSlice } from '@reduxjs/toolkit';

import { get, post } from '@utils/request';

const initialState = {
  value: 0,
  companyList: [],
};

export const name = 'purchase';

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    setStore: (state, { payload }) => {
      Object.entries(payload).forEach(([key, val]) => {
        state[key] = val;
      });
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

const { incrementByAmount, setStore } = slice.actions;

const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const getCompanyApi = () => get('/crm/company');
export const addPurchaseApi = (params) => post('/med/purchase/detail', params);

export const getCompany = (params) => async (dispatch) => {
  const res = await getCompanyApi(params);
  if (res) {
    const { list, total } = res;
    dispatch(setStore({ companyList: list }));
  }
};

export const actions = { ...slice.actions, incrementAsync };

export default slice;
