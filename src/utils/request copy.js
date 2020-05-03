import { message } from 'antd';
import axios from 'axios';
// import { USER_NOT_LOGIN } from '@constants/base'
import { host } from '../config';

const transAxiosResponse = ({ data: axiosData }) => {
  if (axiosData.errno === 0) {
    if (axiosData.msg) {
      message.success(axiosData.msg);
    }
  } else {
    message.error(axiosData.msg);
  }
  return Promise.resolve(axiosData.data);

  // 未登录
  // if (axiosData.errno === USER_NOT_LOGIN) {
  //   window.location.replace((axiosData.data as any).url)
  // }

  // return Promise.reject(new Error(axiosData.errmsg))
};
// 过滤所有空字符串参数
const falsyFilter = (params) => {
  const filtedParams = {};
  Object.keys(params)
    .filter((field) => !!params[field])
    .forEach((field) => {
      filtedParams[field] = params[field];
    });
  return filtedParams;
};

const instance = axios.create({
  baseURL: `${host}/`,
  timeout: 10000,
});
instance.interceptors.request.use((conf) => {
  let { params } = conf;
  if (conf.method === 'get' && params) {
    // 过滤所有空字符串参数
    params = falsyFilter(conf.params);
  }
  return {
    ...conf,
    params,
  };
});

instance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    message.error(response.statusText);
    return Promise.reject(new Error(response.statusText));
  },
  (error) => {
    message.error(error.message);
    return Promise.reject(error);
  },
);

export const get = (url, params) => instance.get(url, { params }).then(transAxiosResponse);

export const post = (url, params) => instance.post(url, params).then(transAxiosResponse);
