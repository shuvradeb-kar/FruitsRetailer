(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('AddStockController', AddStockController);

    AddStockController.$inject = ['$state', '$scope', 'FruitsRetailerService'];

    function AddStockController($state, $scope, FruitsRetailerService) {
        var vm = this;
        vm.PageTitle = "Add New Product";
        vm.Product = {};
        vm.SaveStock = function () {
            vm.ValidateStockAndSave();
        }

        vm.ValidateStockAndSave = function () {
            if (vm.Product.Name === undefined || vm.Product.Name.length === 0) {
                vm.IsNameEmpty = true;
                vm.NameInfo = "Please enter product name";
            }
            else {
                vm.IsNameEmpty = false;
            }
            //if (vm.Product.Quantity === undefined || isNaN(vm.Product.Quantity)) {
            //    vm.QuantityInfo = "Please enter product quantity";
            //    vm.IsQuantityEmpty = true;
            //}
            //else {
            //    vm.IsQuantityEmpty = false;
            //}

            if (vm.Product.Code === undefined || vm.Product.Code.length === 0) {
                vm.CodeInfo = "Please enter product code.";
                vm.IsCodeEmpty = true;
            }
            else {
                FruitsRetailerService.isProductCodeExist(vm.Product.Code).then(function (data) {
                    if (data) {
                        vm.CodeInfo = "This product code is already exists.";
                        vm.IsCodeEmpty = true;
                    }
                    else {
                        vm.IsCodeEmpty = false;
                        FruitsRetailerService.saveStock(vm.Product).then(function (data) {
                            vm.GoBackToStockList();
                        });
                    }
                });
            }
        }

        vm.GoBackToStockList = function () {
            $state.go('stock');
        }
    }
})();
