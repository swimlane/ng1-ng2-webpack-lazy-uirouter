import { NgModule } from '@angular/core';
import { UIRouterModule } from 'ui-router-ng2';
import { CommonNg2Module } from '../common';

import { ADMIN_STATES } from './admin.state';
import { AdminComponent } from './admin.component';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  imports: [
    UIRouterModule.forChild({ states: ADMIN_STATES }),
    CommonNg2Module
  ],
  declarations: [AdminComponent, ResetComponent]
})
export default class AdminModule { }
