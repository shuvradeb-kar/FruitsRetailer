(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$scope', 'AUTH_EVENTS', 'AuthenticationService', 'SessionService', '$state'];

    function LoginController($rootScope, $scope, AUTH_EVENTS, AuthenticationService, SessionService, $state) {
        $scope.credentials = {
            UserName: '',
            Password: ''
        };
        $scope.login = function () {
            AuthenticationService.login($scope.credentials).then(function (user) {              
                $scope.setCurrentUser(user);
                SessionService.create(user.SessionId, user.UserId, user.Name, user.Role);
                $state.go('home');
            });           
        }
    }
})();
