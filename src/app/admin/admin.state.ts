import { AdminComponent } from './admin.component';
import { ResetComponent } from './reset/reset.component';
import { AdminService, LoginService } from '../common';

export const ADMIN_STATES = [
  {
    name: 'admin',
    url: '/admin',
    views: {
      $default: { component: AdminComponent }
    },
    resolve: [
      {
        token: 'geo',
        deps: [AdminService],
        resolveFn: function(adminService: AdminService) {
          return adminService.get();
        }
      },
      {
        token: 'profile',
        deps: [LoginService],
        resolveFn: function(loginService: any) {
          return loginService.get();
        }
      }
    ]
  },
  {
    name: 'admin.reset',
    url: '/reset',
    views: {
      'reset': { component: ResetComponent }
    }
  }
];
