(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('CustomerTransactionDetailController', CustomerTransactionDetailController);

    CustomerTransactionDetailController.$inject = ['$state', '$scope', '$timeout', 'FruitsRetailerService', 'uiGridConstants', '$stateParams', '$uibModal'];

    function CustomerTransactionDetailController($state, $scope, $timeout, FruitsRetailerService, uiGridConstants, $stateParams, $uibModal)
    {
        var vm = this;
        vm.Customer = $stateParams.customer;
        vm.PageSize = 50;
        vm.gridOptions = {};
        if (vm.Customer.CustomerType == 1)
            vm.TransactionName = "Sell";
        else {
            vm.TransactionName = "Purchase";
        }


        vm.gridOptions = {
            onRegisterApi: function ( gridApi )
            {
                vm.gridApi = gridApi;

                gridApi.pagination.on.paginationChanged( $scope, function ( newPage, pageSize )
                {
                    vm.PageSize = pageSize;
                    init(newPage, pageSize, vm.Customer.Id);
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
            paginationPageSizes: [25, 50],
            paginationPageSize: vm.PageSize,
            enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
            enableVerticalScrollbar: uiGridConstants.scrollbars.ALWAYS,
            columnDefs: [
                {
                    name: 'TransactionDate', displayName: 'Date', width:100,
                    cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD | date:"yyyy-MM-dd"}}</div>'
                },
                {
                    name: 'ProductDescription', displayName: 'Description', cellTemplate: '<div class="ui-grid-cell-contents" title="{{COL_FIELD}}">{{COL_FIELD}}</div>'
                },
                {
                    name: 'ProductCode', displayName: 'Product Code', width: 110, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD}}</div>'
                },
                {
                    name: 'ProductName', displayName: 'Product Name', width: 115, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD}}</div>'
                },
                {
                    name: 'Quantity', displayName: 'Quantity', width: 87, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD == 0 ? "-" : COL_FIELD}}</div>'
                },
                {
                    name: 'Rate', displayName: 'Rate', width: 100, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD == 0 ? "-" : COL_FIELD | currency}}</div>'
                },
                {
                    name: 'Total', displayName: 'Total', width: 120, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD == 0 ? "-" : COL_FIELD | currency}}</div>'
                },
                {
                    name: 'AmountReceived', displayName: 'Payment', width: 120, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD == 0 ? "-" : COL_FIELD |currency}}</div>'
                },
                {
                    name: 'OthersCost', displayName: 'Discount', width: 100, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD == 0 ? "-" : COL_FIELD |currency}}</div>'
                },
                {
                    name: 'Balance', displayName: 'Balance', width:120, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD |currency}}</div>'
                },
                {
                    name: ' ', width: 120, cellTemplate: '<div style="text-align:center;padding-top:3px;"><a ng-click="grid.appScope.EditTransaction(row.entity)" style="margin-right:3px;" class="btn btn-warning btn-xs">Edit</a><a ng-click="grid.appScope.DeleteTransaction(row.entity)" class="btn btn-danger btn-xs">Delete</a></div>'
                }
            ],
        };
        //var statusTemplate = '<div>{{COL_FIELD == 0 ? "Active" : (COL_FIELD == 1 ? "Non Active" : "Deleted")}}</div>';

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
                    init(1, vm.PageSize, vm.Customer.Id);
                });

            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }

        $scope.EditTransaction = function (entity)
        {
            if (entity.Quantity == 0)
            {
                //$(".alert-info").alert();
                //$window.setTimeout(function () { $(".alert-info").alert('close'); }, 2000);
            }
            else
            {
                $state.go('editpurchase', { customer: { Id: vm.Customer.Id, Name: vm.Customer.Name, AccountNumber: vm.Customer.AccountNumber, Address: vm.Customer.Address, CustomerType: vm.Customer.CustomerType }, transaction: { Id: entity.Id, ProductDescription: entity.ProductDescription, TransactionDate: new Date(entity.TransactionDate), Quantity: entity.Quantity, Rate: entity.Rate, AmountReceived: entity.AmountReceived, OthersCost: entity.OthersCost, ProductCode: entity.ProductCode, CustomerId: entity.CustomerId } });
            }
        }

        vm.AddNewTransactation = function () {            
            $state.go('addpurchase', { customer: { Id: vm.Customer.Id, Name: vm.Customer.Name, AccountNumber: vm.Customer.AccountNumber, Address: vm.Customer.Address, CustomerType: vm.Customer.CustomerType } });            
        }

        function init(pageNo, pageSize, customerId)
        {
            FruitsRetailerService.getCustomerTransactionDetail(pageNo, pageSize, customerId).then(function (data)
            {
                vm.gridOptions.data = data.TransactionList;

                vm.gridOptions.totalItems = data.Count;
                $timeout( function ()
                {
                    vm.gridApi.core.handleWindowResize();
                } );
            } );
        }

        init(1, vm.PageSize, vm.Customer.Id);

        loadInitialValue();
        function loadInitialValue() {
            vm.CompanyName = localStorage.getItem("CompanyName");
            vm.CompanySlogan = localStorage.getItem("CompanySlogan");
        }
    }
       
})();
