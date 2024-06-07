import { Component } from '@angular/core';
import { RouteMeta } from '@analogjs/router';
import { AuthGuard } from '../../features/auth/auth.guard';

export const routeMeta: RouteMeta = {
  canActivate: [AuthGuard()],
};

@Component({
  selector: 'app-admin',
  template: ` <h1>Admin</h1> `,
  standalone: true,
})
export default class AdminComponent {}
