export * from './loadNg1Module';
export * from './configRouting';

import { loadNgModule } from './loadNg2Module';

// This simplifies using `loadNgModule`
// https://github.com/angular-ui/ui-router/pull/3037
// lazyLoad: loadNgModule(() => System.import('app/admin/admin.module.js').then(m => m.default))
export function loadNg2Default(getModule) {
  return loadNgModule(() => getModule().then(m => m.default));
}

export { loadNgModule };
