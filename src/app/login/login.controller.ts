export class LoginController {

  constructor($scope, profile, geo) {
    $scope.title = `I'm a ng1 page!`;
    $scope.status = profile.status;
    $scope.geo = geo.data;
    $scope.age1 = 11;
    $scope.age2 = 22;
  }

}
