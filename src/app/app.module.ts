declare var angular: any;
import { configRouting } from '../utils';
import { commonNg1Module } from './common';

export const appModule = angular
  .module('app', [
    'ui.router',
    'ui.router.state.events',
    'ui.router.upgrade',
    'oc.lazyLoad',
    commonNg1Module.name
  ])
  .config(configRouting);
