import { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

export const useActions = (action) => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(action, dispatch), [action, dispatch]);
};

/*
  获取redux store数据
 */
export function useStore(name) {
  return useSelector((state) => {
    if (!name) {
      return state;
    }
    if (Array.isArray(name)) {
      return name.reduce((pre, item) => ({ ...pre, [item]: state[item] }), {});
    }
    return state[name];
  });
}
export { useDispatch, useSelector };
