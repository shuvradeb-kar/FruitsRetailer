(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['$scope', 'USER_ROLES', 'AuthenticationService', '$state', 'SessionService', 'FruitsRetailerService'];

    function ApplicationController($scope, USER_ROLES, AuthenticationService, $state, SessionService, FruitsRetailerService) {
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

        function init() {
            FruitsRetailerService.getCustomeLabelValues().then(function (label) {
                localStorage.setItem("CompanyName", label.CompanyName);
                localStorage.setItem("CompanyProprietor", label.CompanyProprietor);
                localStorage.setItem("CompanySlogan", label.CompanySlogan);
                localStorage.setItem("CompanyAddress", label.CompanyAddress);
                localStorage.setItem("ProprietorContactNumber", label.ProprietorContactNumber);               
            });
        }
        init();
    }
})();