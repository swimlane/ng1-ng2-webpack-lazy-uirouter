declare var angular: any;

export const ButtonComponent = {

  bindings: {
    age: '='
  },

  template: `
    <button type="button">ng1 component - {{$ctrl.age}}</button>
  `,

  controller($scope) {
    // console.log('ng1', $scope, this)
  }

};
