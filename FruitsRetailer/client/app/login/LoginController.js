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
            vm.CompanyName = localStorage.getItem("CompanyName");
            vm.CompanyProprietor = localStorage.getItem("CompanyProprietor");
            vm.CompanySlogan = localStorage.getItem("CompanySlogan");
            vm.CompanyAddress = localStorage.getItem("CompanyAddress");
            vm.ProprietorContactNumber = localStorage.getItem("ProprietorContactNumber");            

            var winHeight = $(window).height();           
            $('#loginContainer').height(winHeight - 75);
            console.log(winHeight);
        }
    }
})();
