import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import logger from 'redux-logger';

import basicReducer from './modules/basic.module';

const middleware = [...getDefaultMiddleware()];

if (process.env.NODE_ENV === 'development' && process.env.TARO_ENV !== 'quickapp') {
  middleware.push(logger);
}

// 异步reducer
const asyncReducers = {};

function makeRootReducer(reducers) {
  return combineReducers({
    basic: basicReducer,
    ...reducers,
  });
}

const store = configureStore({
  reducer: makeRootReducer(),
  middleware: [...getDefaultMiddleware(), logger],
});

export const injectReducer = (name, reducer) => {
  if (!asyncReducers.name) {
    asyncReducers[name] = reducer;
  }

  // 可以过滤reducer ,只留公用的和当前页面的。不存在的页面的reducer将被删除回收
  store.replaceReducer(makeRootReducer(asyncReducers)); // 注入时更新
};

export default store;
