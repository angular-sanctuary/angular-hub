import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'angular-hub-home',
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: ` <angular-hub-analog-welcome /> `,
})
export default class HomeComponent {}
