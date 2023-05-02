export default [
  {
    path: '',
    load: () => import(/* webpackChunkName: "p_index" */ '@/pages/index'),
    componentName: 'index',
    index: true,
    id: 'index',
    exact: true,
    exports: ["default"],
  },{
    path: 'list',
    load: () => import(/* webpackChunkName: "p_list" */ '@/pages/list'),
    componentName: 'list',
    index: undefined,
    id: 'list',
    exact: true,
    exports: ["default"],
  },{
    path: 'text',
    load: () => import(/* webpackChunkName: "p_text" */ '@/pages/text'),
    componentName: 'text',
    index: undefined,
    id: 'text',
    exact: true,
    exports: ["default"],
  },
];
