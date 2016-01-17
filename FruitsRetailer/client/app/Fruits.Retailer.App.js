
var FruitsRetailerApp = angular.module( 'FruitsRetailerApp', ['ui.router', 'ui.grid', 'ui.bootstrap', 'ui.grid.pagination', 'ngLoadingSpinner'] )
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider
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
        .state('addpurchase', {
            url: "/addpurchase",
            params: { whoseller: null },
            controller: 'AddPurchaseController',
            controllerAs: 'vm',
            templateUrl: '/client/app/purchase/AddNewPurchase.html'
        })
        .state( 'wholesale', {
            url: "/wholesale",
            controller: 'WholesalerListController',
            controllerAs: 'vm',
            templateUrl: '/client/app/purchase/WholesalerList.html'
        } )
    .state('addwhoseller', {
        url: "/addwhoseller",
        controller: 'AddWholesalerController',
        controllerAs: 'vm',
        templateUrl: '/client/app/purchase/AddNewWholesaler.html'
    } )
        .state( 'editwhoseller', {
            url: "/editwhoseller",
            params: { whoseller: null },
            controller: 'EditWholesalerController',
            controllerAs: 'vm',
            templateUrl: '/client/app/purchase/AddNewWholesaler.html'
        } )
        

    .state('sell', {
        url: "/sell",
        controller: 'SellsListController',
        controllerAs: 'vm',
        templateUrl: '/client/app/sales/SellsList.html'
    })

    .state('stock', {
        url: "/stock",
        controller: 'StockController',
        controllerAs: 'vm',
        templateUrl: '/client/app/stock/Stock.html'
    })
    .state('cashbook', {
        url: "/cashbook",
        controller: 'CashBookController',
        controllerAs: 'vm',
        templateUrl: '/client/app/cashbook/CashBook.html'
    });
}]);
