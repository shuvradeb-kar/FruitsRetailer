(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('AddPurchaseController', AddPurchaseController);

    AddPurchaseController.$inject = ['$state', '$scope', 'FruitsRetailerService'];

    function AddPurchaseController($state, $scope, FruitsRetailerService) {
        var vm = this;

        vm.SaveNewWholesaler = function () {
            vm.Wholesaler.Type = 2;

            FruitsRetailerService.addNewWholesaler(vm.Wholesaler).then(function (data) {

            });
        }

        vm.GoBackToPurchaseList = function () {
            $state.go('purchase');
        }

      
    }
})();
