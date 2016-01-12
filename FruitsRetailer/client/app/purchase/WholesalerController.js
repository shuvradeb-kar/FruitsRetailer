( function ()
{
    angular
        .module( 'FruitsRetailerApp' )
        .controller( 'WholesalerController', WholesalerController );

    WholesalerController.$inject = ['$state', '$scope', '$timeout', 'FruitsRetailerService', 'uiGridConstants'];

    function WholesalerController( $state, $scope, $timeout, FruitsRetailerService, uiGridConstants )
    {
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
                    init( newPage, pageSize );
                } );
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
            enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
            enableVerticalScrollbar: uiGridConstants.scrollbars.ALWAYS,
            columnDefs: [
                {
                    name: 'AccountNumber', displayName: 'Account Number', cellTemplate: '<div class="ui-grid-cell-contents wordbreak">{{COL_FIELD}}</div>'
                },
                {
                    name: 'Name', displayName: 'Name', cellTemplate: '<div class="ui-grid-cell-contents wordbreak">{{COL_FIELD}}</div>'
                },
                {
                    name: 'Address', displayName: 'Address', cellTemplate: '<div class="ui-grid-cell-contents wordbreak">{{COL_FIELD}}</div>'
                },
                {
                    name: 'Balance', displayName: 'Balance', cellTemplate: '<div class="ui-grid-cell-contents wordbreak">{{COL_FIELD}}</div>'
                }
            ],
        };


        function init( pageNo, pageSize )
        {
            FruitsRetailerService.getWholesalerList( pageNo, pageSize ).then( function ( data )
            {
                vm.gridOptions.data = data;
                vm.gridOptions.totalItems = data.length;
                $timeout( function ()
                {
                    vm.gridApi.core.handleWindowResize();
                } );
            } );
        }

        init( 1, vm.PageSize );
    }

} )();
