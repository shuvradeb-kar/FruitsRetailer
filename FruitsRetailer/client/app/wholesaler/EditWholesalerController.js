( function ()
{
    angular
        .module( 'FruitsRetailerApp' )
        .controller( 'EditWholesalerController', EditWholesalerController );

    EditWholesalerController.$inject = ['$state', '$scope', 'FruitsRetailerService', '$stateParams'];

    function EditWholesalerController( $state, $scope, FruitsRetailerService, $stateParams )
    {
        var vm = this;
        vm.PageTitle = "Edit Wholesaler";
        vm.EditMode = true;
        vm.Wholesaler = $stateParams.whoseller;
        vm.SaveNewWholesaler = function ()
        {
            vm.ValidateNewWholesalerAndSave();
        }

        vm.ValidateNewWholesalerAndSave = function ()
        {
            if ( vm.Wholesaler.Name === undefined || vm.Wholesaler.Name.length === 0 )
            {
                vm.IsNameEmpty = true;
            }
            else
            {
                vm.IsNameEmpty = false;
                FruitsRetailerService.saveWholesaler( vm.Wholesaler ).then( function ( data )
                {
                    vm.GoBackToWholesalerList();
                } );
                
            }                     

        }

        vm.GoBackToWholesalerList = function ()
        {
            $state.go( 'wholesale' );
        }


    }
} )();
