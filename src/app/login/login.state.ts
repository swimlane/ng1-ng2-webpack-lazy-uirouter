import { LoginController } from './login.controller';
import { loginTemplate } from './login.template';

import { HelloController } from './hello/hello.controller';
import { helloTemplate } from './hello/hello.template';

export function configState($stateProvider, $urlRouterProvider) {
  $stateProvider.state('login', {
    url: '/login',
    views: {
      $default: {
        controller: LoginController,
        template: loginTemplate
      }
    },
    resolve: {
      profile: function(LoginService) {
        return LoginService.get();
      },
      geo: function(AdminService) {
        return AdminService.get();
      }
    }
  });

  $stateProvider.state('login.hello', {
    url: '/hello',
    views: {
      'hello': {
        controller: HelloController,
        template: helloTemplate
      }
    }
  });
};
