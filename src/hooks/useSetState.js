/* eslint-disable import/prefer-default-export */
import { useCallback, useState } from 'react';

export const useSetState = (initialState) => {
  const [state, set] = useState(initialState);
  const setState = useCallback(
    (patch) => {
      set((prevState) => ({
        ...prevState,
        ...(patch instanceof Function ? patch(prevState) : patch),
      }));
    },
    [set],
  );

  return [state, setState];
};
