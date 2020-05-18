import { useState } from 'react';
/**
 * 使用 antd Modal
 * @param {boolean} initVisible
 * @return {{visible: boolean, open: function, close: function}}
 */
export const useModal = (initVisible = false) => {
  const [visible, setVisible] = useState(initVisible);

  const open = () => {
    setVisible(true);
  };
  const close = () => {
    setVisible(false);
  };

  return { visible, open, close };
};
