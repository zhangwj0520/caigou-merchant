import React from 'react';
import { Route } from 'react-router-dom';
import routes from '@routes/route.config';

const flatten = (routeArry) =>
  routeArry.reduce((pre, item) => {
    if (item.children) {
      const children = flatten(item.children);
      return [...pre, item, ...children];
    }
    return [...pre, item];
  }, []);

const flattenRoute = flatten(routes);

const flattenAuth = (routeArry) => {
  let res = [];
  routeArry.forEach((item) => {
    const isAuth = true;
    // if (item.auth) {
    //   isAuth = checkAuth(item.auth, userInfoState);
    // }
    if (isAuth) {
      if (item.component) res.push(item);
      if (item.children) {
        res = [...res, ...flattenAuth(item.children)];
      }
    }
  });
  return res;
};

export const generateRoutes = () => {
  const flattenAuthRoute = flattenAuth(routes);
  return flattenAuthRoute.map((item) => <Route key={item.path} path={item.path} component={item.component} exact />);
};
export const getDocumentTitle = (pathname) => flattenRoute.filter((item) => item.path === pathname)[0].name;
export const getBreadcrumb = (pathname) => {
  if (pathname === '/') return [{ name: '首页', path: '/' }];
  const ary = [];
  let str = pathname;
  while (str) {
    ary.unshift(str);
    str = str.replace(/\/\w+$/, '');
  }
  return ary.map((path) => ({
    name: flattenRoute.filter((item) => item.path === path)[0].name || 'null',
    path,
  }));
};
