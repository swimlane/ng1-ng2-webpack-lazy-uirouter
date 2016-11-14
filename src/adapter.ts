import { forwardRef } from '@angular/core';
import { UpgradeAdapter } from '@angular/upgrade';
import { uiRouterNgUpgrade } from 'ui-router-ng1-to-ng2';

// ng2 services

// Create ngUpgrade Adapter
// ---
// `forwardRef` is required for initalizing the `UpgradeModule`
// after it is included below. See reason below for more info.
// ---
// See: https://angular.io/docs/js/latest/api/core/index/forwardRef-function.html
export const adapter = new UpgradeAdapter(forwardRef(() => UpgradeModule));

// the upgrade main module
// ---
// This must be required after the `UpgradeAdapter` is initialized.
// If not, then when `UpgradeModule` import `CommonModule` which needs
// to a reference to the adapter so it can upgrade a component and
// put in the global common module.
// ---
// See: https://github.com/angular/angular/issues/11069
import { UpgradeModule } from 'app/upgrade.module';

// Bootstrap ui-router
uiRouterNgUpgrade.setUpgradeAdapter(adapter);
