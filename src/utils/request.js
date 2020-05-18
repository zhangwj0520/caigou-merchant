import { message } from 'antd';
import axios from 'axios';
import storage from '@utils/localStorage';
// import store from '@store/index';

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

const transAxiosResponse = ({ data: axiosData }) => {
  if (axiosData.errno === 0) {
    if (axiosData.msg) {
      message.success(axiosData.msg);
    }
  } else if (axiosData.errno === 10001) {
    // 未登录
    storage.clear();
    window.location.replace('/login');
  } else {
    message.error(axiosData.msg);
  }
  return Promise.resolve(axiosData.data || false);
};

// create an axios instance
const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use((config) => {
  // do something before request is sent
  const token = storage.get('token');
  if (token) {
    config.headers['token'] = token;
  }
  let { params } = config;
  if (config.method === 'get' && params) {
    // 过滤所有空字符串参数
    params = falsyFilter(config.params);
  }
  return { ...config, params };
});

// response interceptor
service.interceptors.response.use(
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

export const get = (url, params) => service.get(url, { params }).then(transAxiosResponse);

export const post = (url, params) => service.post(url, params).then(transAxiosResponse);
