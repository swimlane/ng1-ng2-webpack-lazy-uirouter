import { Component, NgModule } from '@angular/core';
import { StateService } from 'ui-router-ng2';
import { UIRouterModule } from "../../uirouter_module"; // when beta.2: from "ui-router-ng2"

//@NgModule({ imports: [ AppModule ] })
@Component({
  selector: 'admin',
  template: `
    <h1>I'm a ng2 page</h1>
    <a uiSref="login">Goto ng1 page</a>
  `
})
export class AppComponent { }

@NgModule({
  imports: [UIRouterModule],
  declarations: [AppComponent],
  entryComponents: [AppComponent]
}) 
export class AdminModule {}

export default angular
  .module('admin', [])
  .config(function($stateProvider) {
    $stateProvider.state('admin', {
      url: '/admin',
      views: {
        $default: { component: AppComponent }
      }
    });
  });
