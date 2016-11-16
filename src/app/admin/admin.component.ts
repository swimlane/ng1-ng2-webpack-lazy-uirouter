import { Component, Input } from '@angular/core';

@Component({
  template: `
    <h1>{{title}}</h1>

    <!-- Angular1 Service Result -->
    <p>Status: {{profile.status}}</p>

    <!-- Angular2 Provider Result -->
    <pre>{{geoFormatted}}</pre>

    <!-- Angular2 Component -->
    <cool-toggle [age]="age2"></cool-toggle>

    <!-- Angular1 Component -->
    <cool-button [age]="age1"></cool-button>

    <!-- Who doesn't love cat gifs? -->
    <img src="https://media.giphy.com/media/NMuaDOlkCOvJe/giphy.gif" width="150" height="150" />

    <!-- ng2 subview -->
    <div ui-view="reset"></div>
    <hr />

    <a href="#" class="button" uiSref="admin.reset">Goto ng2 substate</a>
    <a href="#" class="button" uiSref="login">Goto ng1 page</a>
    <a href="#" class="button" uiSref="login.hello">Goto ng1 substate</a>
  `
})
export class AdminComponent {

  @Input() geo = '';
  @Input() profile = '';

  age1 = 11;
  age2 = 22;

  get geoFormatted() {
    return JSON.stringify(this.geo, null, 4);
  }

  title = `I'm a ng2 component`;

}
