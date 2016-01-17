﻿(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('StockController', StockController);

    StockController.$inject = ['$state', '$scope', '$uibModal', '$timeout', 'FruitsRetailerService', 'uiGridConstants'];

    function StockController($state, $scope, $uibModal, $timeout, FruitsRetailerService, uiGridConstants) {

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
                    name: 'Name', displayName: 'Product Name', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD}}</div>'
                },
                {
                    name: 'Code', displayName: 'Product Code', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD}}</div>'
                },
                {
                    name: 'Quantity', displayName: 'Quantity', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents wordbreak">{{COL_FIELD}}</div>'
                },
                {
                    name: ' ', width: 120, enableFiltering: false, cellTemplate: '<div style="text-align:center;padding-top:3px;"><a ng-click="grid.appScope.EditProduct(row.entity)" style="margin-right:3px;" class="btn btn-warning btn-xs">Edit</a><a ng-click="grid.appScope.DeleteProduct(row.entity)" class="btn btn-danger btn-xs">Delete</a></div>'
                }
            ],
        };        

        $scope.EditProduct = function (entity)
        {
            $state.go( 'editwhoseller', { whoseller: { Id: entity.Id, Name: entity.Name, AccountNumber: entity.AccountNumber, Address: entity.Address } } );
        }        

        $scope.DeleteProduct = function (entity)
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
                FruitsRetailerService.deleteWholesaler(selectedItem).then(function (data) {
                    init(1, vm.PageSize);
                });
                
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }

        function init( pageNo, pageSize)
        {
            FruitsRetailerService.getProductList( pageNo, pageSize ).then( function ( data )
            {
                vm.gridOptions.data = data.StockList;
                vm.gridOptions.totalItems = data.Count;
                $timeout( function ()
                {
                    vm.gridApi.core.handleWindowResize();
                } );
            } );
        }

        init( 1, vm.PageSize );
    }

    
})();

