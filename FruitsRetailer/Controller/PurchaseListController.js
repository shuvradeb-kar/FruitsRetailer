(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('PurchaseListController', PurchaseListController);

    PurchaseListController.$inject = ['$state', '$scope', '$timeout'];

    function PurchaseListController($state, $scope, $timeout) {
        var vm = this;

        vm.PageSize = 25;
        vm.gridOptions = {};
        vm.gridOptions = {
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;

                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    vm.PageSize = pageSize;
                    init(newPage, pageSize);
                });
            },
            showTreeRowHeader: false,
            enableColumnMenus: false,           
            enableSorting: false,
            enableScrollbars: false,
            enablePaginationControls: true,
            showTreeExpandNoChildren: false,
            useExternalPagination: true,
            paginationPageSizes: [10, 25],
            paginationPageSize: vm.PageSize,
            columnDefs: [
                {
                    name: 'firstName', displayName: 'first Name', cellTemplate: '<div class="ui-grid-cell-contents wordbreak">{{COL_FIELD}}</div>'
                },
                {
                    name: 'lastName', displayName: 'last Name', cellTemplate: '<div class="ui-grid-cell-contents wordbreak">{{COL_FIELD}}</div>'
                },
                {
                    name: 'company', displayName: 'company', cellTemplate: '<div class="ui-grid-cell-contents wordbreak">{{COL_FIELD}}</div>'
                },
            ],
        };


        function init(pageNo, pageSize) {
            vm.gridOptions.data = $scope.myData;
            vm.gridOptions.totalItems = 10;
            vm.IsFilterSearch = false;
            $timeout(function () {
                vm.gridApi.core.handleWindowResize();
            });
        }
        $scope.myData = [{
            "firstName": "Cox",
            "lastName": "Carney",
            "company": "Enormo",
            "employed": true
        },
    {
        "firstName": "Lorraine",
        "lastName": "Wise",
        "company": "Comveyer",
        "employed": false
    },
    {
        "firstName": "Nancy",
        "lastName": "Waters",
        "company": "Fuelton",
        "employed": false
    }];
    }
       
})();
