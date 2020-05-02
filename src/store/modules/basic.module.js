import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle

import storage from '@utils/localStorage';

const setting = {
  theme: storage.get('theme') || 'dark',
  collapsed: storage.get('collapsed'),
  title: 'React Demo',
  isLogin: storage.get('isLogin'),
  layout: storage.get('layout') || 'sidemenu',
  fixedHeader: storage.get('fixedHeader') || false,
  fixSiderbar: storage.get('fixSiderbar') || true,
};

const initialState = {
  ...setting
};

export const slice = createSlice({
  name: 'basic',
  initialState,
  reducers: {
    changeCollapsed: (state) => {
      const collapsed = !state.collapsed;
      storage.set('collapsed', collapsed);
      state.collapsed = collapsed;
    },
  },
});

export const { changeCollapsed } = slice.actions;
export const { name } = slice;


export default slice.reducer;
