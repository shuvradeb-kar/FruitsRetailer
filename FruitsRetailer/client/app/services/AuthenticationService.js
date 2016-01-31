(function () {
    angular
        .module('FruitsRetailerApp')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', 'SessionService'];

    function AuthenticationService($http, SessionService) {
        var factory ={
            login:login,
            isAuthenticated:isAuthenticated,
            isAuthorized:isAuthorized
        }

        return factory;

        function login(credentials) {         
            var request = $http.post('/Server/Controller/Login', JSON.stringify(credentials));
            return request.then(handleSuccess, handleError);
        }
        
        function isAuthenticated() {
            return !!SessionService.userId;
        }

        function isAuthorized(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return isAuthenticated() && authorizedRoles.indexOf(SessionService.userRole) !== -1;
        }
        function handleSuccess(response) {
            return (response.data);
        }
        function handleError(response) {
            if (
                !angular.isObject(response.data) ||
                !response.data.message
                ) {
                return ($q.reject("An unknown error occurred."));
            }

            return ($q.reject(response.data.message));
        }

    }
})();