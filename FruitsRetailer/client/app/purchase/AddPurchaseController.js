(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('AddPurchaseController', AddPurchaseController);

    AddPurchaseController.$inject = ['$state', '$scope', 'FruitsRetailerService'];

    function AddPurchaseController($state, $scope, FruitsRetailerService) {
        var vm = this;

        vm.SaveNewWholesaler = function () {
            FruitsRetailerService.addNewWholesaler(vm.Wholesaler).then(function (data) {
                vm.GoBackToWholesalerList();
            });
        }

        vm.GoBackToWholesalerList = function ()
        {
            $state.go( 'wholesale' );
        }

      
    }
})();
