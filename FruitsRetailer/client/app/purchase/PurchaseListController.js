﻿(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('PurchaseListController', PurchaseListController);

    PurchaseListController.$inject = ['$state', '$scope', '$timeout', 'FruitsRetailerService', 'uiGridConstants'];

    function PurchaseListController( $state, $scope, $timeout, FruitsRetailerService, uiGridConstants)
    {
        var vm = this;

        vm.PageSize = 10;
        vm.gridOptions = {};

        vm.gridOptions = {
            onRegisterApi: function ( gridApi )
            {
                vm.gridApi = gridApi;

                gridApi.pagination.on.paginationChanged( $scope, function ( newPage, pageSize )
                {
                    vm.PageSize = pageSize;
                    init( newPage, pageSize );
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
                    name: 'AccountNumber', displayName: 'Account Number',
                    cellTemplate: '<div class="ui-grid-cell-contents"><a  style="cursor:pointer" ng-click="grid.appScope.EditWholesaler(row.entity)">{{COL_FIELD}}</a></div>'
                },
                {
                    name: 'Name', displayName: 'Name', cellTemplate: '<div class="ui-grid-cell-contents wordbreak">{{COL_FIELD}}</div>'
                },
                {
                    name: 'Address', displayName: 'Address', cellTemplate: '<div class="ui-grid-cell-contents wordbreak">{{COL_FIELD}}</div>'
                },
                {
                    name: 'Balance', displayName: 'Balance', cellTemplate: '<div class="ui-grid-cell-contents wordbreak">{{COL_FIELD}}</div>'
                },
                {
                    name: ' ', width: 150, cellTemplate: '<div style="text-align:center;padding-top:3px;"><a ng-click="grid.appScope.DeleteWholesaler(row.entity)" class="btn btn-danger btn-xs">Delete</a></div>'
                }
            ],
        };


        function init( pageNo, pageSize )
        {
            FruitsRetailerService.getPurchaseList( pageNo, pageSize ).then( function ( data )
            {
                vm.gridOptions.data = data.CustomerList;
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
