import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1721886_67j8vlmn6vq.js', // 在 iconfont.cn 上生成
});

export default Icon;

export const MenuIcon = ({ name, size }) => <Icon type={`icon-${name}`} style={{ fontSize: size || 20 }} />;
