import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng1ToNg2Module } from 'ui-router-ng1-to-ng2';
import { CommonNg2Module } from './common';

@NgModule({
  imports: [
    BrowserModule,
    Ng1ToNg2Module,
    CommonNg2Module
  ]
})
export class UpgradeModule { }
