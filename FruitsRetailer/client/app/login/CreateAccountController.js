(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('CreateAccountController', CreateAccountController);

    CreateAccountController.$inject = ['$rootScope', '$scope', 'AUTH_EVENTS', 'AuthenticationService', 'SessionService', '$state'];

    function CreateAccountController($rootScope, $scope, AUTH_EVENTS, AuthenticationService, SessionService, $state) {
        var vm = this;

        vm.CreateNewUser = function () {

        }
        vm.GoBackToLoginPage = function () {
            $state.go("login");
        }
    }
})();
