
var FruitsRetailerApp = angular.module('FruitsRetailerApp', ['ui.router', 'ui.grid', 'ui.grid.pagination'])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider
     .state('home', {
         url: "/home",
         controller: 'DashboardController',
         controllerAs: 'vm',
         templateUrl: '/Partials/Dashboard.html'
     })

    .state('purchase', {
        url: "/purchase",
        controller: 'PurchaseListController',
        controllerAs: 'vm',
        templateUrl: '/Partials/PurchaseList.html'
    })
    .state('addwhoseller', {
        url: "/addwhoseller",
        controller: 'AddPurchaseController',
        controllerAs: 'vm',
        templateUrl: '/Partials/AddNewWholesaler.html'
    })
        .state('addpurchase', {
            url: "/addpurchase",
            controller: 'AddPurchaseController',
            controllerAs: 'vm',
            templateUrl: '/Partials/AddNewPurchase.html'
        })

    .state('sell', {
        url: "/sell",
        controller: 'SellsListController',
        controllerAs: 'vm',
        templateUrl: '/Partials/SellsList.html'
    })

    .state('stock', {
        url: "/stock",
        controller: 'StockController',
        controllerAs: 'vm',
        templateUrl: '/Partials/Stock.html'
    })
    .state('cashbook', {
        url: "/cashbook",
        controller: 'CashBookController',
        controllerAs: 'vm',
        templateUrl: '/Partials/CashBook.html'
    });
}]);
