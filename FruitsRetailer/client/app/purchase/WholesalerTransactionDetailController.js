(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('WholesalerTransactionDetailController', WholesalerTransactionDetailController);

    WholesalerTransactionDetailController.$inject = ['$state', '$scope', '$timeout', 'FruitsRetailerService', 'uiGridConstants', '$stateParams', '$uibModal'];

    function WholesalerTransactionDetailController($state, $scope, $timeout, FruitsRetailerService, uiGridConstants, $stateParams, $uibModal)
    {
        var vm = this;
        vm.Wholesaler = $stateParams.whoseller;
        //vm.wholesalerId = $stateParams.wholesalerId;
        vm.PageSize = 10;
        vm.gridOptions = {};


        vm.gridOptions = {
            onRegisterApi: function ( gridApi )
            {
                vm.gridApi = gridApi;

                gridApi.pagination.on.paginationChanged( $scope, function ( newPage, pageSize )
                {
                    vm.PageSize = pageSize;
                    init(newPage, pageSize, vm.Wholesaler.Id);
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
            paginationPageSizes: [5, 10, 25],
            paginationPageSize: vm.PageSize,
            enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
            enableVerticalScrollbar: uiGridConstants.scrollbars.ALWAYS,
            columnDefs: [
                {
                    name: 'TransactionDate', displayName: 'Date', width:100,
                    cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD | date:"yyyy-MM-dd"}}</div>'
                },
                {
                    name: 'ProductDescription', displayName: 'Description', cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD}}</div>'
                },
                {
                    name: 'ProductCode', displayName: 'Product', width: 80, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD}}</div>'
                },
                {
                    name: 'Quantity', displayName: 'Quantity', width:87, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD}}</div>'
                },
                {
                    name: 'Rate', displayName: 'Rate', width: 100, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD | currency}}</div>'
                },
                {
                    name: 'Total', displayName: 'Total', cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD | currency}}</div>'
                },
                {
                    name: 'AmountReceived', displayName: 'Payment', cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD |currency}}</div>'
                },
                {
                    name: 'OthersCost', displayName: 'Discount', width: 100, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD |currency}}</div>'
                },
                {
                    name: 'Balance', displayName: 'Balance', cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD |currency}}</div>'
                },
                {
                    name: ' ', width: 120, cellTemplate: '<div style="text-align:center;padding-top:3px;"><a ng-click="grid.appScope.EditTransaction(row.entity)" style="margin-right:3px;" class="btn btn-warning btn-xs">Edit</a><a ng-click="grid.appScope.DeleteTransaction(row.entity)" class="btn btn-danger btn-xs">Delete</a></div>'
                }
            ],
        };

        $scope.DeleteTransaction = function (entity) {
            var setting = {
                Id: entity.Id
            };

            var modalInstance = $uibModal.open({
                templateUrl: '/client/app/purchase/ConfirmationWindow.html',
                controller: 'ConfirmationWindowController',
                size: 'sm',
                resolve: {
                    items: function () {
                        return setting;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                FruitsRetailerService.deleteTransaction(selectedItem).then(function (data) {
                    init(1, vm.PageSize, vm.Wholesaler.Id);
                });

            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }

        $scope.EditTransaction = function (entity)
        {
            //$state.go('editwhoseller', { whoseller: { Id: entity.Id, Name: entity.Name, AccountNumber: entity.AccountNumber, Address: entity.Address } });
        }

        vm.AddNewTransactation = function () {            
            $state.go('addpurchase', { whoseller: { Id: vm.Wholesaler.Id, Name: vm.Wholesaler.Name, AccountNumber: vm.Wholesaler.AccountNumber, Address: vm.Wholesaler.Address } });
            
        }

        function init(pageNo, pageSize, wholesalerId)
        {
            FruitsRetailerService.getWholesalerTransactionDetail(pageNo, pageSize, wholesalerId).then(function (data)
            {
                vm.gridOptions.data = data.TransactionList;

                vm.gridOptions.totalItems = data.Count;
                $timeout( function ()
                {
                    vm.gridApi.core.handleWindowResize();
                } );
            } );
        }

        init(1, vm.PageSize, vm.Wholesaler.Id);
    }
       
})();
