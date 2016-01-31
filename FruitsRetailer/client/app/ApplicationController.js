(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['$scope', 'USER_ROLES', 'AuthenticationService', '$state', 'SessionService'];

    function ApplicationController($scope, USER_ROLES, AuthenticationService, $state, SessionService) {
        var vm = this;
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthenticationService.isAuthorized;
        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        };
       
        $scope.doLogout = function () {
            SessionService.destroy();
            $scope.setCurrentUser(null);
            $state.go('login');
        }
    }
})();