import React from 'react';
import { Modal, Input, Select, Row, Col, Button, Form, DatePicker, Icon, Upload, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import styles from './styles.scss';

const FormItem = Form.Item;
const { Option } = Select;

const rules = {
  phone: [{ required: true, message: '请填写手机号码！' }],
  password: [{ required: true, message: '请填写密码！' }],
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { offset: 1, span: 17 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const UploadPurchase = ({ visible }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    // dispatch(login(values));
  };

  return (
    <Modal
      title="订单导入"
      destroyOnClose
      visible={visible}
      // onCancel={onCancel}
      // // onOk={close}
      // footer={ModalFooter}
    >
      <Form className="login-form" {...layout} onFinish={onFinish} form={form}>
        <FormItem label="选择企业" name="phone" rules={rules.phone}>
          <Select
            placeholder="请选择企业"
            // onChange={this.onGenderChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </FormItem>
        <FormItem label="采购截止日期" name="code" format="YYYY-MM-DD HH:mm:ss">
          {/* <DatePicker /> */}
        </FormItem>

        <FormItem label="选择企业" name="code">
          <Input
            prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
            placeholder="验证码"
            maxLength={6}
          />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" block className={styles.button}>
            登录
          </Button>
        </FormItem>
      </Form>
    </Modal>
  );
};
export default UploadPurchase;
