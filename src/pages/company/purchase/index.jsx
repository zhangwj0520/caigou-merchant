import React, { useState } from 'react';
import { Button } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { useStore, useActions, useModal } from '@hooks';
import UploadPurchase from './components/uploadPurchase';

import styles from './styles.scss';
import { actions } from './module';

export default () => {
  // const { value } = useStore('purchase');
  // const { increment, decrement, incrementByAmount, incrementAsync } = useActions(actions);

  // const [incrementAmount, setIncrementAmount] = useState('2');

  const { visible, open, close } = useModal(true);

  return (
    <div className={styles.container}>
      <Button type="primary" style={{ marginRight: 10 }} onClick={open}>
        <CloudUploadOutlined /> 发布采购计划
      </Button>

      <UploadPurchase visible={visible} />
    </div>
  );
};
