(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('AddPurchaseController', AddPurchaseController);

    AddPurchaseController.$inject = ['$state', '$scope'];

    function AddPurchaseController($state, $scope) {
        var vm = this;

        vm.GoBackToPurchaseList = function () {
            $state.go('purchase');
        }
      
    }
})();
