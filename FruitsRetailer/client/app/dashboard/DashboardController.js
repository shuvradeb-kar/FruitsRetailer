(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$state', '$scope', '$uibModal', '$timeout', 'FruitsRetailerService', 'uiGridConstants'];

    function DashboardController($state, $scope, $uibModal, $timeout, FruitsRetailerService, uiGridConstants) {
        var vm = this;
        vm.PageSize = 50;
        vm.gridRetailerOptions = {};
        vm.gridWholesalerOptions = {}
        vm.gridCashBookOptions = {};
        
        function retailerFilterdataGet(pageNo, pageSize, filter)
        {           
            FruitsRetailerService.getRetailerList(pageNo, pageSize, filter).then(function (data) {
                vm.gridRetailerOptions.data = data.CustomerList;
                vm.gridRetailerOptions.totalItems = data.Count;
                $timeout(function () {
                    vm.gridApi.core.handleWindowResize();
                });
            });
        }

        vm.gridRetailerOptions = {
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;

                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    vm.PageSize = pageSize;
                    retailerFilterdataGet(newPage, pageSize, 0);
                });

                gridApi.core.on.filterChanged($scope, function () {
                    var grid = this.grid;

                    if (angular.isDefined($scope.filterTimeout)) {
                        $timeout.cancel($scope.filterTimeout);
                    }

                    $scope.filterTimeout = $timeout(function () {
                        grid.options.paginationCurrentPage = 1;

                        if (typeof grid.columns[0].filters[0].term != 'undefined' && grid.columns[0].filters[0].term && grid.columns[0].filters[0].term.length != '') {
                            retailerFilterdataGet(1, vm.PageSize, grid.columns[0].filters[0].term);
                        }
                        else {
                            retailerFilterdataGet(1, vm.PageSize, 0);
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
                    name: 'AccountNumber', enableFiltering: true, displayName: 'Account Number',
                    cellTemplate: '<div class="ui-grid-cell-contents"><a  style="cursor:pointer" ng-click="grid.appScope.GetRetailerDetail(row.entity)">{{COL_FIELD}}</a></div>'
                },
                {
                    name: 'Name', displayName: 'Name', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents wordbreak">{{COL_FIELD}}</div>'
                },
                
                {
                    name: 'Balance', displayName: 'Balance', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents wordbreak">{{COL_FIELD | currency}}</div>'
                }
            ],
        };

        function WholesalerFilterdataGet(pageNo, pageSize, filter)
        {
            FruitsRetailerService.getWholesalerList(pageNo, pageSize, filter).then(function (data) {
                vm.gridWholesalerOptions.data = data.CustomerList;
                vm.gridWholesalerOptions.totalItems = data.Count;
                $timeout(function () {
                    vm.gridApi.core.handleWindowResize();
                });
            });
        }

        vm.gridWholesalerOptions = {
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;

                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    vm.PageSize = pageSize;
                    WholesalerFilterdataGet(newPage, pageSize, 0);
                });

                gridApi.core.on.filterChanged($scope, function () {
                    var grid = this.grid;

                    if (angular.isDefined($scope.filterTimeout)) {
                        $timeout.cancel($scope.filterTimeout);
                    }

                    $scope.filterTimeout = $timeout(function () {
                        grid.options.paginationCurrentPage = 1;

                        if (typeof grid.columns[0].filters[0].term != 'undefined' && grid.columns[0].filters[0].term && grid.columns[0].filters[0].term.length != '') {
                            WholesalerFilterdataGet(1, vm.PageSize, grid.columns[0].filters[0].term);
                        }
                        else {
                            WholesalerFilterdataGet(1, vm.PageSize, 0);
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
                    name: 'AccountNumber', enableFiltering: true, displayName: 'Account Number',
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

        function CashBookFilterdataGet(pageNo, pageSize) {
            FruitsRetailerService.getCashBookDetail(pageNo, pageSize).then(function (data) {
                vm.gridCashBookOptions.data = data.CashBookDetail;
                vm.gridCashBookOptions.totalItems = data.Count;
                $timeout(function () {
                    vm.gridApi.core.handleWindowResize();
                });
            });
        }

        vm.gridCashBookOptions = {
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;

                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    vm.PageSize = pageSize;
                    CashBookFilterdataGet(newPage, pageSize);
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
                    name: 'Debit', displayName: 'Debit', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD == 0 ? "-" : COL_FIELD | currency}}</div>'
                },
                {
                    name: 'Credit', displayName: 'Credit', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents">{{COL_FIELD == 0 ? "-" : COL_FIELD | currency}}</div>'
                },
                {
                    name: 'Balance', displayName: 'Balance', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents" title="{{COL_FIELD}}">{{COL_FIELD | currency}}</div>'
                }
            ],
        };

        $scope.GetWholesalerDetail = function (entity) {
            $state.go('purchase', { customer: { Id: entity.Id, Name: entity.Name, AccountNumber: entity.AccountNumber, Address: entity.Address, CustomerType: 2 } });
        }

        $scope.GetRetailerDetail = function (entity) {
            $state.go('purchase', { customer: { Id: entity.Id, Name: entity.Name, AccountNumber: entity.AccountNumber, Address: entity.Address, CustomerType: 1 } });
        }
        

        function init(pageNo, pageSize, filter) {
            WholesalerFilterdataGet(pageNo, pageSize, filter)

            retailerFilterdataGet(pageNo, pageSize, filter);

            CashBookFilterdataGet(pageNo, pageSize);

            vm.CompanyName = localStorage.getItem("CompanyName");           
            vm.CompanySlogan = localStorage.getItem("CompanySlogan");
        }

        init(1, vm.PageSize, 0);
    }
})();