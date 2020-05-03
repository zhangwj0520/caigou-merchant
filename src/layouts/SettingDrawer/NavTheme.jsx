import React from 'react';

import { Tooltip } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { onChangeLayout } from '@store/modules/basic.module';
import { useStore, useDispatch } from '@hooks/useStore';

const baseClassName = 'ant-pro-setting-drawer-block-checbox';

const BlockCheckbox = () => {
  const dispatch = useDispatch();
  const { layout } = useStore('basic');

  const list = [
    {
      key: 'sidemenu',
      url: 'https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg',
      title: '侧边菜单布局',
    },
    {
      key: 'topmenu',
      url: 'https://gw.alipayobjects.com/zos/antfincdn/URETY8%24STp/KDNDBbriJhLwuqMoxcAr.svg',
      title: '顶部菜单布局',
    },
  ];

  return (
    <div className={baseClassName} key={layout}>
      {list.map((item) => (
        <Tooltip title={item.title} key={item.key}>
          <div className={`${baseClassName}-item`} onClick={() => dispatch(onChangeLayout(item.key))}>
            <img src={item.url} alt={item.key} />
            <div
              className={`${baseClassName}-selectIcon`}
              style={{
                display: layout === item.key ? 'block' : 'none',
              }}
            >
              <CheckOutlined />
            </div>
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default BlockCheckbox;
