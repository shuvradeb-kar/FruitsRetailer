(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$state', '$scope', '$uibModal', '$timeout', 'FruitsRetailerService', 'uiGridConstants'];

    function DashboardController($state, $scope, $uibModal, $timeout, FruitsRetailerService, uiGridConstants) {
        var vm = this;
        vm.PageSize = 25;
        vm.gridCustomerOptions = {};

        vm.gridCustomerOptions = {
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;

                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    vm.PageSize = pageSize;
                    init(newPage, pageSize, 0);
                });

                gridApi.core.on.filterChanged($scope, function () {
                    var grid = this.grid;

                    if (angular.isDefined($scope.filterTimeout)) {
                        $timeout.cancel($scope.filterTimeout);
                    }

                    $scope.filterTimeout = $timeout(function () {
                        grid.options.paginationCurrentPage = 1;

                        if (typeof grid.columns[0].filters[0].term != 'undefined' && grid.columns[0].filters[0].term && grid.columns[0].filters[0].term.length != '') {
                            init(1, vm.PageSize, grid.columns[0].filters[0].term);
                        }
                        else {
                            init(1, vm.PageSize, 0);
                        }


                    }, 500);
                });
            },
            enableFiltering: true,
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
                    name: 'AccountNumber', enableFiltering: false, displayName: 'Account Number',
                    cellTemplate: '<div class="ui-grid-cell-contents"><a  style="cursor:pointer" ng-click="grid.appScope.GetWholesalerDetail(row.entity)">{{COL_FIELD}}</a></div>'
                },
                {
                    name: 'Name', displayName: 'Name', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents wordbreak">{{COL_FIELD}}</div>'
                },
                
                {
                    name: 'Balance', displayName: 'Balance', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents wordbreak">{{COL_FIELD | currency}}</div>'
                }
            ],
        };

        vm.gridCashBookOptions = {
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;

                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    vm.PageSize = pageSize;
                    init(newPage, pageSize);
                });
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
                    name: 'TType', width: 80, displayName: 'T. Type', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD}}</div>'
                },                
                {
                    name: 'Debit', displayName: 'Debit', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD | currency}}</div>'
                },
                {
                    name: 'Credit',  displayName: 'Credit', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD | currency}}</div>'
                },
                {
                    name: 'Balance', displayName: 'Balance', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents" title="{{COL_FIELD}}">{{COL_FIELD | currency}}</div>'
                }
            ],
        };
        $scope.GetWholesalerDetail = function (entity) {
            $state.go('purchase', { whoseller: { Id: entity.Id, Name: entity.Name, AccountNumber: entity.AccountNumber, Address: entity.Address } });
        }
        function init(pageNo, pageSize, filter) {
            FruitsRetailerService.getWholesalerList(pageNo, pageSize, filter).then(function (data) {
                vm.gridCustomerOptions.data = data.CustomerList;
                vm.gridCustomerOptions.totalItems = data.Count;
                $timeout(function () {
                    vm.gridApi.core.handleWindowResize();
                });
            });

            FruitsRetailerService.getCashBookDetail(pageNo, pageSize).then(function (data) {
                vm.gridCashBookOptions.data = data.CashBookDetail;
                vm.gridCashBookOptions.totalItems = data.Count;
                $timeout(function () {
                    vm.gridApi.core.handleWindowResize();
                });
            });
        }

        init(1, vm.PageSize, 0);
    }
})();