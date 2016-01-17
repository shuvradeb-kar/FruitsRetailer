( function ()
{
    angular
        .module( 'FruitsRetailerApp' )
        .controller( 'ConfirmationWindowController', ConfirmationWindowController );

    ConfirmationWindowController.$inject = ['$scope', '$uibModalInstance', 'items'];

    function ConfirmationWindowController( $scope, $uibModalInstance, items )
    {

        $scope.Setting = items;

        $scope.ok = function ()
        {
            $uibModalInstance.close($scope.Setting.Id);
        };

        $scope.cancel = function ()
        {
            $uibModalInstance.dismiss( 'cancel' );
        };

    }
} )();
