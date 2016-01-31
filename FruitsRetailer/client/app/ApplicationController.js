(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['$scope', 'USER_ROLES', 'AuthenticationService', '$state', 'SessionService', '$window'];

    function ApplicationController($scope, USER_ROLES, AuthenticationService, $state, SessionService, $window) {
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

        var winHeight = $(window).height();
        var headerHeight = $("header").height();
        $('#loginContainer').height(winHeight - 50);
    }
})();