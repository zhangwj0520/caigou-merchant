import { createSlice } from '@reduxjs/toolkit';
import { get, post } from '@utils/request';
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

const userInfo = {
  userName: 'userName',
  name: 'name',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
};

const initialState = {
  ...setting,
  userInfo,
};

export const slice = createSlice({
  name: 'basic',
  initialState,
  reducers: {
    setBasicStore: (state, { payload }) => {
      Object.entries(payload).forEach(([key, val]) => {
        state[key] = val;
      });
    },
    setLogin: (state) => {
      storage.set('isLogin', true);
      state.isLogin = true;
    },
    onChangeTheme: (state, { payload }) => {
      storage.set('theme', payload);
      state.theme = payload;
    },
    onChangeLayout: (state, { payload }) => {
      storage.set('layout', payload);
      state.layout = payload;
    },
    onChangeFixedHeader: (state, { payload }) => {
      storage.set('fixedHeader', payload);
      state.fixedHeader = payload;
    },
    onChangeFixSiderbar: (state, { payload }) => {
      storage.set('fixSiderbar', payload);
      state.fixSiderbar = payload;
    },
    onCollapse: (state, { payload }) => {
      storage.set('collapsed', payload);
      state.collapsed = payload;
    },

    logout: (state) => {
      storage.clear();
      state.isLogin = false;
    },
  },
});

export const {
  name,
  actions: {
    setBasicStore,
    setLogin,
    onCollapse,
    logout,
    onChangeTheme,
    onChangeLayout,
    onChangeFixedHeader,
    onChangeFixSiderbar,
  },
} = slice;

export const getCodeApi = (params) => get('/crm/getcode', params);
export const loginApi = (params) => post('/crm/login', params);
export const login = (params) => (dispatch) => {
  const res = loginApi(params);
  if (res) {
    dispatch(setLogin());
  }
};

export default slice.reducer;
