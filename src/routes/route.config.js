import loadable from '@utils/loadable';

import demoRoutes from '@routes/demos.route';
import commonRoutes from '@routes/common.roue';
import companyRoutes from '@routes/company.route';
// import AUTH_MAP from '@constants/auth';

const routes = [
  {
    path: '/',
    name: '首页',
    exact: true,
    icon: 'icon-home',
    component: loadable('welcome'),
    // component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@pages/welcome')),
  },
  ...companyRoutes,
  {
    path: '/business',
    name: '组件',
    icon: 'icon-react',
    children: [
      {
        path: '/business/manage',
        name: 'demo',
        component: loadable('demo'),
      },
      {
        path: '/business/counter',
        name: 'counter',
        component: loadable('counter'),
      },
    ],
  },
  // {
  //   path: '/user',
  //   name: '账号权限',
  //   icon: 'home',
  //   children: [
  //     {
  //       path: '/user/role',
  //       name: '角色管理',
  //       component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@src/pages/counter')),
  //     },
  //     {
  //       path: '/user/account',
  //       name: '账号管理',
  //       component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@src/pages/counter')),
  //     },
  //     {
  //       path: '/user/log',
  //       name: '操作日志',
  //       component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@src/pages/counter')),
  //     },
  //   ],
  // },
  ...commonRoutes,
  ...(process.env.$OMIT_DEMO ? demoRoutes : []),
];

export default routes;
