import React, { useEffect } from 'react';
import { Button } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { useStore, useModal, useDispatch } from '@hooks';
import UploadPurchase from './components/uploadPurchase';

import styles from './styles.scss';
import { getCompany } from './module';

export default () => {
  const dispatch = useDispatch();
  const { companyList } = useStore('purchase');
  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  const { visible, open, close } = useModal(true);

  return (
    <div className={styles.container}>
      <Button type="primary" style={{ marginRight: 10 }} onClick={open}>
        <CloudUploadOutlined /> 发布采购计划
      </Button>

      <UploadPurchase visible={visible} companyList={companyList} close={close} />
    </div>
  );
};
