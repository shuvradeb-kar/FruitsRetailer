(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('AddWholesalerController', AddWholesalerController);

    AddWholesalerController.$inject = ['$state', '$scope', 'FruitsRetailerService', '$stateParams'];

    function AddWholesalerController($state, $scope, FruitsRetailerService, $stateParams) {
        vm.CustomerType = $stateParams.CustomerType;
        var vm = this;

        if (vm.CustomerType == "Retailer")
        {
            vm.PageTitle = "Add New Retailer";
        }
        else
        {
            vm.PageTitle = "Add New Wholesaler";
        }
        
        vm.Wholesaler = {};        
        vm.SaveNewWholesaler = function ()
        {
            vm.ValidateNewWholesalerAndSave();
        }

        vm.ValidateNewWholesalerAndSave = function ()
        {
            if (vm.CustomerType == "Retailer") {
                vm.Wholesaler.CustomerType = 1
            }
            else {
                vm.Wholesaler.CustomerType = 2
            }

            if ( vm.Wholesaler.Name === undefined || vm.Wholesaler.Name.length === 0 )
            {
                vm.IsNameEmpty = true;               
            }
            else
            {
                vm.IsNameEmpty = false;
            }
            if ( vm.Wholesaler.AccountNumber === undefined || vm.Wholesaler.AccountNumber === 0 || isNaN( vm.Wholesaler.AccountNumber ) )
            {                
                vm.AccountNumInfo = "Please enter a valid integer number.";
                vm.IsAcNumberEmpty = true;                
            }
            else
            {                
                FruitsRetailerService.isAccountNumberExists( vm.Wholesaler.AccountNumber ).then( function ( data )
                {
                    if ( data )
                    {
                        vm.AccountNumInfo = "This account number is already exists.";
                        vm.IsAcNumberEmpty = true;                        
                    }
                    else
                    {
                        vm.IsAcNumberEmpty = false;
                        FruitsRetailerService.saveWholesaler( vm.Wholesaler ).then( function ( data )
                        {
                            vm.GoBackToWholesalerList();
                        } );
                    }
                } );
            }            
        }

        vm.GoBackToWholesalerList = function ()
        {
            if (vm.CustomerType == "Retailer")
            {
                $state.go('sell');
            }
            else
            {
                $state.go('wholesale');
            }
        }      
    }
})();
