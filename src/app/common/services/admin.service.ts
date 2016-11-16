import { Injectable, Inject } from '@angular/core';
declare var angular: any;

@Injectable()
export class AdminService {

  $http: any;
  
  constructor(@Inject('$http') $http) {
    this.$http = $http;
  }

  get() {
    return this.$http.get('http://ip-api.com/json/');
  }

}
