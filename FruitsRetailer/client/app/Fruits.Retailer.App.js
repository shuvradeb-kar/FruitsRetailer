﻿
var FruitsRetailerApp = angular.module('FruitsRetailerApp', ['ui.router', 'ui.grid', 'ui.grid.pagination'])
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
        controller: 'PurchaseListController',
        controllerAs: 'vm',
        templateUrl: '/client/app/purchase/PurchaseList.html'
    })
    .state('addwhoseller', {
        url: "/addwhoseller",
        controller: 'AddPurchaseController',
        controllerAs: 'vm',
        templateUrl: '/client/app/purchase/AddNewWholesaler.html'
    })
        .state('addpurchase', {
            url: "/addpurchase",
            controller: 'AddPurchaseController',
            controllerAs: 'vm',
            templateUrl: '/client/app/purchase/AddNewPurchase.html'
        })

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