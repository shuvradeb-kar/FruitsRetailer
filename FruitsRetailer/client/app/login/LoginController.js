(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$scope', 'AUTH_EVENTS', 'AuthenticationService', 'SessionService', '$state', 'FruitsRetailerService', '$window'];

    function LoginController($rootScope, $scope, AUTH_EVENTS, AuthenticationService, SessionService, $state, FruitsRetailerService, $window) {
        var vm = this;
        vm.LoginErrorInfo = "";
        $scope.credentials = {
            UserName: '',
            Password: ''
        };
        $scope.login = function () {
            AuthenticationService.login($scope.credentials).then(function (user) {
                if (user.IsAuthenticated) {
                    $scope.setCurrentUser(user);
                    SessionService.create(user.SessionId, user.UserId, user.Name, user.Role);
                    $state.go('home');
                }
                else {
                    vm.LoginErrorInfo = "Your provided UserName or Password is not correct."
                }
               
            });           
        }

        init();

        function init() {

            FruitsRetailerService.getCustomeLabelValues().then(function (label) {                
                vm.CompanyName = label.CompanyName;
                vm.CompanyProprietor = label.CompanyProprietor;
                vm.CompanySlogan = label.CompanySlogan;
                vm.CompanyAddress = label.CompanyAddress;
                vm.ProprietorContactNumber = label.ProprietorContactNumber;
            });

            var winHeight = $(window).height();
           
            $('#loginContainer').height(winHeight - 75);
            console.log(winHeight);
        }
    }
})();
