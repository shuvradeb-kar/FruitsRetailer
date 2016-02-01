(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('AddRetailerController', AddRetailerController);

    AddRetailerController.$inject = ['$state', '$scope', 'FruitsRetailerService'];

    function AddRetailerController($state, $scope, FruitsRetailerService) {
        var vm = this;
        vm.PageTitle = "Add New Retailer";
        vm.Retailer = {};
        vm.SaveRetailer = function () {
            vm.ValidateRetailerAndSave();
        }

        vm.ValidateRetailerAndSave = function () {

            if (vm.Retailer.Name === undefined || vm.Retailer.Name.length === 0) {
                vm.IsNameEmpty = true;
            }
            else {
                vm.IsNameEmpty = false;
            }
            if (vm.Retailer.AccountNumber === undefined || vm.Retailer.AccountNumber === 0 || isNaN(vm.Retailer.AccountNumber)) {
                vm.AccountNumInfo = "Please enter a valid integer number.";
                vm.IsAcNumberEmpty = true;
            }
            else {
                FruitsRetailerService.isRetailerAccountNumberExists(vm.Retailer.AccountNumber).then(function (data) {
                    if (data) {
                        vm.AccountNumInfo = "This account number is already exists.";
                        vm.IsAcNumberEmpty = true;
                    }
                    else {
                        vm.IsAcNumberEmpty = false;
                        FruitsRetailerService.saveRetailer(vm.Retailer).then(function (data) {
                            vm.GoBackToRetailerList();
                        });
                    }
                });
            }
        }

        vm.GoBackToRetailerList = function () {
            $state.go('retailerList');
        }
    }
})();
