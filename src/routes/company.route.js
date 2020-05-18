import loadable from '@utils/loadable';

const routes = [
  {
    path: '/company',
    name: '企业',
    exact: true,
    icon: 'icon-yichang',
    children: [
      {
        path: '/company/purchase',
        name: '发布采购',
        component: loadable('company/purchase'),
      },
      {
        path: '/company/404',
        name: '404',
        component: loadable('company/purchase'),
      },
      {
        path: '/company/500',
        name: '500',
        component: loadable('company/purchase'),
      },
    ],
  },
];

export default routes;
