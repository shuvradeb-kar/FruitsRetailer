( function ()
{
    angular
        .module( 'FruitsRetailerApp' )
        .controller( 'ConfirmationWindowController', ConfirmationWindowController );

    ConfirmationWindowController.$inject = ['$scope', '$uibModalInstance', 'items', 'FruitsRetailerService'];

    function ConfirmationWindowController( $scope, $uibModalInstance, items, FruitsRetailerService )
    {

        $scope.Setting = items;

        $scope.ok = function ()
        {
            FruitsRetailerService.deleteWholesaler( $scope.Setting.Id ).then( function ( data )
            {
                $uibModalInstance.close( $scope.Setting.Id );
            } );
        };

        $scope.cancel = function ()
        {
            $uibModalInstance.dismiss( 'cancel' );
        };

    }
} )();
