import { Component, Input } from '@angular/core';

@Component({
  selector: 'cool-toggle',
  template: `
    <button type="button">ng2 component - {{age}}</button>
  `
})

export class ToggleComponent {
  @Input() age = 23;
}
