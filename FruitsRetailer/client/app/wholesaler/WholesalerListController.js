( function ()
{
    angular
        .module( 'FruitsRetailerApp' )
        .controller( 'WholesalerListController', WholesalerListController );

    WholesalerListController.$inject = ['$state', '$scope', '$uibModal', '$timeout', 'FruitsRetailerService', 'uiGridConstants'];

    function WholesalerListController( $state, $scope, $uibModal, $timeout, FruitsRetailerService, uiGridConstants )
    {
        var vm = this;

        vm.PageSize = 50;
        vm.gridOptions = {};

        vm.gridOptions = {
            onRegisterApi: function ( gridApi )
            {
                vm.gridApi = gridApi;

                gridApi.pagination.on.paginationChanged( $scope, function ( newPage, pageSize )
                {
                    vm.PageSize = pageSize;
                    init( newPage, pageSize, 0 );
                } );

                gridApi.core.on.filterChanged( $scope, function ()
                {
                    var grid = this.grid;                   

                    if ( angular.isDefined( $scope.filterTimeout ) )
                    {
                        $timeout.cancel( $scope.filterTimeout );
                    }

                    $scope.filterTimeout = $timeout( function ()
                    {                        
                        grid.options.paginationCurrentPage = 1;

                        if ( typeof grid.columns[0].filters[0].term != 'undefined' && grid.columns[0].filters[0].term && grid.columns[0].filters[0].term.length != '' )
                        {
                            init( 1, vm.PageSize, grid.columns[0].filters[0].term );
                        }
                        else
                        {
                            init( 1, vm.PageSize, 0);
                        }
                        

                    }, 500 );
                } );
            },
            enableFiltering: true,
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
                    name: 'AccountNumber', displayName: 'Account Number',                                       
                    cellTemplate: '<div class="ui-grid-cell-contents"><a  style="cursor:pointer" ng-click="grid.appScope.GetWholesalerDetail(row.entity)">{{COL_FIELD}}</a></div>'
                },
                {
                    name: 'Name', displayName: 'Name', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents wordbreak">{{COL_FIELD}}</div>'
                },
                {
                    name: 'Address', displayName: 'Address', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents wordbreak" title="{{COL_FIELD}}">{{COL_FIELD}}</div>'
                },
                ,
                {
                    name: 'MobileNumber', displayName: 'Mobile Number', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents wordbreak">{{COL_FIELD}}</div>'
                },
                {
                    name: 'Balance', displayName: 'Balance', enableFiltering: false, cellTemplate: '<div class="ui-grid-cell-contents wordbreak">{{COL_FIELD | currency}}</div>'
                },
                {
                    name: ' ', width: 120, enableFiltering: false, cellTemplate: '<div style="text-align:center;padding-top:3px;"><a ng-click="grid.appScope.EditWholesaler(row.entity)" style="margin-right:3px;" class="btn btn-warning btn-xs">Edit</a></div>'
                }
            ],
        };

        $scope.GetWholesalerDetail = function ( entity )
        {
            $state.go('purchase', { customer: { Id: entity.Id, Name: entity.Name, AccountNumber: entity.AccountNumber, Address: entity.Address, MobileNumber: entity.MobileNumber } });
        }

        $scope.EditWholesaler = function (entity)
        {
            $state.go('editwhoseller', { whoseller: { Id: entity.Id, Name: entity.Name, AccountNumber: entity.AccountNumber, Address: entity.Address, MobileNumber: entity.MobileNumber } });
        }
        

        $scope.DeleteWholesaler = function ( entity )
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
                    init(1, vm.PageSize, 0);
                });
                
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }

        function init( pageNo, pageSize, filter )
        {
            FruitsRetailerService.getWholesalerList( pageNo, pageSize, filter ).then( function ( data )
            {
                vm.gridOptions.data = data.CustomerList;
                vm.gridOptions.totalItems = data.Count;
                $timeout( function ()
                {
                    vm.gridApi.core.handleWindowResize();
                } );
            } );
        }

        init( 1, vm.PageSize, 0 );
    }

} )();
