(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('EditRetailerController', EditRetailerController);

    EditRetailerController.$inject = ['$state', '$scope', 'FruitsRetailerService', '$stateParams'];

    function EditRetailerController($state, $scope, FruitsRetailerService, $stateParams) {
        var vm = this;
        vm.PageTitle = "Edit Retailer";
        vm.EditMode = true;
        vm.Retailer = $stateParams.retailer;
        vm.SaveRetailer = function () {
            vm.ValidateRetailerAndSave();
        }

        vm.ValidateRetailerAndSave = function () {
            if (vm.Retailer.Name === undefined || vm.Retailer.Name.length === 0) {
                vm.IsNameEmpty = true;
            }
            else {
                vm.IsNameEmpty = false;
                FruitsRetailerService.saveRetailer(vm.Retailer).then(function (data) {
                    vm.GoBackToRetailerList();
                });

            }

        }

        vm.GoBackToRetailerList = function () {
            $state.go('retailerList');
        }


    }
})();
