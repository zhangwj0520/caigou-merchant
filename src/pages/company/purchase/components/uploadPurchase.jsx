import React from 'react';
import { Modal, Select, Row, Col, Button, Form, DatePicker, Icon, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSetState } from '@hooks';
import moment from 'moment';
import { find } from 'lodash';
import { convertPinyin } from '@utils/converPinyin';
import XLSX from 'xlsx';

import { addPurchaseApi } from '../module';

const FormItem = Form.Item;
const { Option } = Select;

const rules = {
  companyId: [{ required: true, message: '请选择企业！' }],
  end: [{ required: true, message: '请填写截止日期！' }],
  file: [{ required: true, message: '请上传文件！' }],
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { offset: 1, span: 17 },
};
const tailLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

const UploadPurchase = ({ visible, companyList, close }) => {
  const [form] = Form.useForm();
  const [state, setState] = useSetState({ uploadFile: null, uploading: false });
  const { uploadFile, uploading } = state;

  const onFinish = (values) => {
    const date = moment().format('YYYY-MM-DD');

    const { companyId, end } = values;
    const endDate = end.format('YYYY-MM-DD');
    const { companyName } = find(companyList, { id: companyId }) || {};

    setState({ uploading: true });
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    // eslint-disable-next-line consistent-return
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data1 = XLSX.utils.sheet_to_json(ws, { header: 1 });
      let ary;
      let index;

      for (let i = 0; i < 4; i++) {
        const cur = data1[i];

        const string = cur?.join(',') || '';
        if (string.includes('名称') || string.includes('数量')) {
          ary = cur;
          index = i;
        }
      }
      if (!ary) {
        return message.error('文档格式错误!');
      }
      const header = ary.map((item) => {
        if (item.includes('名称')) {
          return 'medName';
        }
        if (item.includes('数量') || item.includes('采购量') || item.includes('采购数量')) {
          return 'quantity';
        }
        if (item.includes('产地')) {
          return 'origin';
        }
        if (item.includes('规格')) {
          return 'specification';
        }
        if (item.includes('品质及要求') || item.includes('质量标准')) {
          return 'description';
        }
        return item;
      });

      const data = XLSX.utils.sheet_to_json(ws, { header });
      const resData = [];
      for (let i = 0; i <= data.length - 1; i++) {
        const cur = data[i];
        if (cur.length === 0) break;
        // eslint-disable-next-line no-continue
        if (!parseFloat(cur.quantity)) continue;
        const { origin, description } = cur;
        let { medName, quantity, specification } = cur;

        medName = medName || data[i - 1].medName || data[i - 2].medName || data[i - 3].medName;
        medName = medName.replace(
          /["炒"、"煅"、麩炒"、"麸炒"、"麸"、麩"、"酒"、"盐"、"燀"、"醋"、"焦"、"蜜"、"炮"、"烫"、"炙"、"制"]/g,
          '',
        );
        const { pinyin } = convertPinyin(medName);
        specification = specification && specification.toString();
        quantity = parseFloat(quantity);

        const medicine = {
          date,
          endDate,
          medName,
          origin,
          quantity,
          description,
          specification,
          pinyin,
          companyName,
          companyId,
        };

        resData.push(medicine);
      }

      addPurchaseApi({ data: resData }).then((res) => {
        if (res) {
          setState({ uploading: false });

          message.success('报价上传成功!');
          close();
          form.resetFields();
        }
      });
    };

    if (rABS) reader.readAsBinaryString(uploadFile);
    else reader.readAsArrayBuffer(uploadFile);
    // dispatch(login(values));
  };

  const normFile = (e) => {
    // 只能上传一个文件
    const { file } = e;
    if (Array.isArray(e)) {
      return e;
    }
    return e && [file];
  };
  return (
    <Modal
      title="订单导入"
      // destroyOnClose
      visible={visible}
      onCancel={close}
      footer={null}
    >
      <Form className="login-form" {...layout} onFinish={onFinish} form={form}>
        <FormItem label="选择企业" name="companyId" rules={rules.companyId}>
          <Select
            placeholder="请选择企业"
            // onChange={this.onGenderChange}
            allowClear
          >
            {companyList.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.companyName}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="采购截止日期" name="end" rules={rules.end}>
          <DatePicker format="YYYY-MM-DD" disabledDate={(cur) => cur && cur < moment().endOf('day')} />
        </FormItem>

        <FormItem
          name="file"
          label="采购文件"
          rules={rules.file}
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="文件模板下载"
        >
          <Upload
            name="file"
            action="http://localhost:7001/crm/upload"
            listType="picture"
            // fileList={state.fileList}
            beforeUpload={(file) => {
              setState({
                uploadFile: file,
                // fileList: [...state.fileList, file]
                // 设置了只能传一个文件,新文件替换旧文件
              });
            }}
          >
            <Button variant="contained" color="secondary" style={{ width: 140 }}>
              <UploadOutlined />
              选择文件
            </Button>
          </Upload>
        </FormItem>

        <FormItem {...tailLayout}>
          <Row type="flex" justify="center" align="middle" style={{ marginTop: 30 }}>
            <Col>
              <Button type="primary" loading={uploading} htmlType="submit">
                {uploading ? '上传中...' : '开始上传'}
              </Button>
            </Col>
          </Row>
          {/* <Button type="primary" htmlType="submit" block className={styles.button}>
            登录
          </Button> */}
        </FormItem>
      </Form>
    </Modal>
  );
};
export default UploadPurchase;
