(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('AddPurchaseController', AddPurchaseController);

    AddPurchaseController.$inject = ['$state', '$scope', 'FruitsRetailerService', '$stateParams'];

    function AddPurchaseController($state, $scope, FruitsRetailerService, $stateParams) {
        var vm = this;
        vm.PageTitle = "Add New Purchase";
        vm.Transaction = {};
        vm.IsPaymentEnable = false;
        vm.Transaction.Date = new Date();
        vm.Wholesaler = $stateParams.whoseller;
        vm.AccountNumber = vm.Wholesaler.AccountNumber;
        vm.Transaction.CustomerId = vm.Wholesaler.Id;

        vm.SaveTransaction = function () {
            if (vm.ValidateTransactione()) {
                FruitsRetailerService.saveTransaction(vm.Transaction).then(function (data) {
                    vm.GoBackToPurchaseList();
                });
            }
        }

        vm.ValidateTransactione = function () {
            if (vm.Transaction.Quantity === undefined || vm.Transaction.Quantity === 0 || isNaN(vm.Transaction.Quantity)) {
                vm.QuantityInfo = "Please enter valid quantity.";
                vm.IsQuantityEmpty = true;
                return false;
            }
            else
            {
                vm.IsQuantityEmpty = false;
            }
            if (vm.Transaction.Rate === undefined || vm.Transaction.Rate === 0 || isNaN(vm.Transaction.Rate)) {
                vm.RateInfo = "Please enter valid rate.";
                vm.IsRateEmpty = true;
                return false;
            }
            else {
                vm.IsRateEmpty = false;
            }

            if (vm.IsPaymentEnable) {
                if (vm.Transaction.AmountReceived === undefined || vm.Transaction.AmountReceived === 0 || isNaN(vm.Transaction.AmountReceived)) {
                    vm.AmountReceivedInfo = "Please enter valid amount.";
                    vm.IsAmountReceivedEmpty = true;
                    return false;
                }
                else {
                    vm.IsAmountReceivedEmpty = false;
                }
            }

            if (vm.Transaction.OthersCost === undefined || vm.Transaction.OthersCost.length > 0) {
                if (isNaN(vm.Transaction.OthersCost)) {
                    vm.OthersCostInfo = "Please enter valid rate.";
                    vm.IsOthersCostEmpty = true;
                    return false;
                }
            }
            else {
                vm.IsOthersCostmpty = false;
            }
            return true;            
        }

        vm.GoBackToPurchaseList = function () {
            $state.go('purchase');
        }       
    }
})();
