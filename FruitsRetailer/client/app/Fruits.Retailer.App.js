
var FruitsRetailerApp = angular.module('FruitsRetailerApp', ['ui.router', 'ui.grid', 'ui.bootstrap', 'ui.grid.pagination', 'ngLoadingSpinner'])
.config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES', '$httpProvider', function ($stateProvider, $urlRouterProvider, USER_ROLES, $httpProvider) {
    $urlRouterProvider.otherwise("/login");
    $httpProvider.interceptors.push(['$injector', function ($injector) {
        return $injector.get('AuthInterceptor');
    }]);
    $stateProvider
        .state('login', {
            url: "/login",
            controller: 'LoginController',
            controllerAs: 'vm',
            templateUrl: '/client/app/login/login.html'
        })
        .state('createaccount', {
            url: "/createaccount",
            controller: 'CreateAccountController',
            controllerAs: 'vm',
            templateUrl: '/client/app/login/CreateAccount.html'
        })
     .state('home', {
         url: "/home",
         controller: 'DashboardController',
         controllerAs: 'vm',
         templateUrl: '/client/app/dashboard/Dashboard.html'
     })

    .state('purchase', {
        url: "/purchase",
        params: { whoseller: null },
        controller: 'WholesalerTransactionDetailController',
        controllerAs: 'vm',
        templateUrl: '/client/app/purchase/WholesalerTransactionDetail.html'
    })
        .state('editpurchase', {
            url: "/editpurchase",
            params: { whoseller: null, transaction: null },
            controller: 'EditPurchaseController',
            controllerAs: 'vm',
            templateUrl: '/client/app/purchase/AddNewPurchase.html',
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        })
        .state('addpurchase', {
            url: "/addpurchase",
            params: { whoseller: null },
            controller: 'AddPurchaseController',
            controllerAs: 'vm',
            templateUrl: '/client/app/purchase/AddNewPurchase.html'
        })
        .state('wholesale', {
            url: "/wholesale",
            controller: 'WholesalerListController',
            controllerAs: 'vm',
            templateUrl: '/client/app/purchase/WholesalerList.html'
        })
    .state('addwhoseller', {
        url: "/addwhoseller",
        params:{ customerType: null },
        controller: 'AddWholesalerController',
        controllerAs: 'vm',
        templateUrl: '/client/app/purchase/AddNewWholesaler.html'
    })
        .state('editwhoseller', {
            url: "/editwhoseller",
            params: { whoseller: null },
            controller: 'EditWholesalerController',
            controllerAs: 'vm',
            templateUrl: '/client/app/purchase/AddNewWholesaler.html'
        })
    .state('sell', {
        url: "/sell",
        controller: 'WholesalerListController',
        controllerAs: 'vm',
        templateUrl: '/client/app/sales/SellsList.html'
    })

    .state('stock', {
        url: "/stock",
        controller: 'StockController',
        controllerAs: 'vm',
        templateUrl: '/client/app/stock/Stock.html'
    })
        .state('addProduct', {
            url: "/addproduct",
            controller: 'AddStockController',
            controllerAs: 'vm',
            templateUrl: '/client/app/stock/AddStock.html'
        })
        .state('editProduct', {
            url: "/editproduct",
            params: { product: null },
            controller: 'EditStockController',
            controllerAs: 'vm',
            templateUrl: '/client/app/stock/AddStock.html'
        })
    .state('cashbook', {
        url: "/cashbook",
        controller: 'CashBookController',
        controllerAs: 'vm',
        templateUrl: '/client/app/cashbook/CashBook.html'
    })
    .state('addCashBook', {
        url: "/addcashbook",
        controller: 'AddCashBookController',
        controllerAs: 'vm',
        templateUrl: '/client/app/cashbook/AddCashBook.html'
    })
    .state('editCashBook', {
        url: "/editcashbook",
        params: { cashbook: null },
        controller: 'EditCashBookController',
        controllerAs: 'vm',
        templateUrl: '/client/app/cashbook/AddCashBook.html'
    })
    .state('report', {
        url: "/report",
        controller: 'ReportController',
        controllerAs: 'vm',
        templateUrl: '/client/app/report/Report.html'
    });
}])
.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
})
.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})
.run(function ($rootScope, AuthenticationService, $state) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
            var authorizedRoles = next.authorizedRoles;
            if (!AuthenticationService.isAuthorized(authorizedRoles)) {
                if (AuthenticationService.isAuthenticated()) {
                }
                else {
                    
                    if ($state.current.name === 'login') {
                        //if (next.name === "createaccount") {
                        //    $state.transitionTo("createaccount", null, { notify: true });
                        //    event.preventDefault();
                        //}

                        $state.transitionTo("login", null, { notify: true });
                        event.preventDefault();
                    }

                }
            }
    });
});
