export function LoginService($q) {
  return {
    get: function() {
      let def = $q.defer();

      def.resolve({
        status: 'invalid'
      });

      return def.promise;
    }
  }
}
