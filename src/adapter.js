import { UpgradeAdapter } from '@angular/upgrade';
import { uiRouterNgUpgrade } from 'ui-router-ng1-to-ng2';
import { UIROUTER_DIRECTIVES, UIView } from 'ui-router-ng2';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './app/admin/admin';
import { UIRouterModule } from "./uirouter_module";

const Ng2AppModule =
  NgModule({
    declarations: [],
    imports: [BrowserModule, UIRouterModule, AdminModule],
    providers: []
  }).Class({
    constructor: function Ng2AppModule() {},
    ngDoBootstrap: function() {}
  });

export const adapter = new UpgradeAdapter(Ng2AppModule);
uiRouterNgUpgrade.setUpgradeAdapter(adapter);
