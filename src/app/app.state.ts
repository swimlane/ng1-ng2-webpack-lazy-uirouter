import { loadNg1Module, loadNg2Default } from '../utils';

export const MAIN_STATES = [
  {
    name: 'login',
    url: '/login',
    lazyLoad: loadNg1Module(() => System.import('./login/login.module'))
  },
  {
    name: 'admin',
    url: '/admin',
    lazyLoad: loadNg2Default(() => System.import('./admin/admin.module'))
  }
];
