(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('EditStockController', EditStockController);

    EditStockController.$inject = ['$state', '$scope', 'FruitsRetailerService', '$stateParams'];

    function EditStockController($state, $scope, FruitsRetailerService, $stateParams) {
        var vm = this;
        vm.PageTitle = "Edit Product";
        vm.Product = $stateParams.product;
        vm.EditMode = true;
        vm.SaveStock = function () {
            if (vm.ValidateStockAndSave())
            {
                FruitsRetailerService.saveStock(vm.Product).then(function (data) {
                    vm.GoBackToStockList();
                });
            }
        }

        vm.ValidateStockAndSave = function () {
            if (vm.Product.Name === undefined || vm.Product.Name.length === 0) {
                vm.IsNameEmpty = true;
                vm.NameInfo = "Please enter product name";
                return false;
            }
            else {
                vm.IsNameEmpty = false;
            }
            //if (vm.Product.Quantity === null || vm.Product.Quantity === undefined || isNaN(vm.Product.Quantity)) {
            //    vm.QuantityInfo = "Please enter product quantity";
            //    vm.IsQuantityEmpty = true;
            //    return false;
            //}
            //else {
            //    vm.IsQuantityEmpty = false;
            //}
            return true;
        }

        vm.GoBackToStockList = function () {
            $state.go('stock');
        }


    }
})();
