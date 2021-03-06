﻿(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('CashBookController', CashBookController);

    CashBookController.$inject = ['$state', '$scope', '$uibModal', '$timeout', 'FruitsRetailerService', 'uiGridConstants'];

    function CashBookController($state, $scope, $uibModal, $timeout, FruitsRetailerService, uiGridConstants) {

        var vm = this;

        vm.PageSize = 25;
        vm.gridOptions = {};

        vm.gridOptions = {
            onRegisterApi: function ( gridApi )
            {
                vm.gridApi = gridApi;

                gridApi.pagination.on.paginationChanged( $scope, function ( newPage, pageSize )
                {
                    vm.PageSize = pageSize;
                    init( newPage, pageSize);
                } );                
            },
            enableFiltering: false,
            showTreeRowHeader: false,
            enableColumnMenus: false,
            enableSorting: false,
            enableScrollbars: false,
            enablePaginationControls: true,
            showTreeExpandNoChildren: false,
            useExternalPagination: true,
            paginationPageSizes: [10, 25, 50],
            paginationPageSize: vm.PageSize,
            enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
            enableVerticalScrollbar: uiGridConstants.scrollbars.ALWAYS,
            columnDefs: [                
                {
                    name: 'TransactionDate', displayName: 'Date', width: 100, enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD | date:"yyyy-MM-dd"}}</div>'
                },
                {
                    name: 'AccountHolderName', displayName: 'Name', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents" title="{{COL_FIELD}}">{{COL_FIELD}}</div>'
                },
                {
                    name: 'AccountHolderAddress', displayName: 'Address', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents" title="{{COL_FIELD}}">{{COL_FIELD}}</div>'
                },
                {
                    name: 'TType', width:80, displayName: 'T. Type', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD}}</div>'
                },
                {
                    name: 'Comment', displayName: 'Comment', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents" title="{{COL_FIELD}}">{{COL_FIELD}}</div>'
                },
                {
                    name: 'Debit', width: 135, displayName: 'Debit', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD == 0 ? "-" : COL_FIELD | currency}}</div>'
                },
                {
                    name: 'Credit', width: 135, displayName: 'Credit', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD == 0 ? "-" : COL_FIELD | currency}}</div>'
                },
                {
                    name: 'Balance', width: 140, displayName: 'Balance', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents" title="{{COL_FIELD}}">{{COL_FIELD | currency}}</div>'
                },
                {
                    name: ' ', width: 120, enableFiltering: false, cellTemplate: '<div style="text-align:center;padding-top:3px;"><a ng-click="grid.appScope.EditCashBook(row.entity)" style="margin-right:3px;" class="btn btn-warning btn-xs">Edit</a><a ng-click="grid.appScope.DeleteCashBook(row.entity)" class="btn btn-danger btn-xs">Delete</a></div>'
                }
            ],
        };        

        $scope.EditCashBook = function (entity)
        {
            $state.go('editCashBook', { cashbook: { Id: entity.Id, AccountNumber: entity.AccountNumber, IsPayment: entity.IsPayment, TransactionType: entity.TransactionType, TransactionDate:new Date(entity.TransactionDate), Debit: entity.Debit, Credit: entity.Credit, Comment: entity.Comment } });
        }

        $scope.DeleteCashBook = function (entity)
        {
            var setting = {
                Id: entity.Id
            };

            var modalInstance = $uibModal.open({                
                templateUrl: '/client/app/purchase/ConfirmationWindow.html',
                controller: 'ConfirmationWindowController',                
                size:'sm',
                resolve: {
                    items: function () {
                        return setting;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                FruitsRetailerService.deleteCashBook(selectedItem).then(function (data) {
                    init(1, vm.PageSize);
                });
                
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }

        function init( pageNo, pageSize)
        {
            FruitsRetailerService.getCashBookDetail( pageNo, pageSize ).then( function ( data )
            {
                vm.gridOptions.data = data.CashBookDetail;
                vm.gridOptions.totalItems = data.Count;
                $timeout( function ()
                {
                    vm.gridApi.core.handleWindowResize();
                } );
            } );
        }

        init(1, vm.PageSize);

        loadInitialValue();
        function loadInitialValue() {
            vm.CompanyName = localStorage.getItem("CompanyName");
            vm.CompanySlogan = localStorage.getItem("CompanySlogan");
        }
    }

    
})();

