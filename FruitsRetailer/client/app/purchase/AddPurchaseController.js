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
        vm.Transaction.TransactionDate = new Date();
        vm.Wholesaler = $stateParams.whoseller;
        vm.AccountNumber = vm.Wholesaler.AccountNumber;
        vm.Transaction.CustomerId = vm.Wholesaler.Id;
        
        init();

        function init() {
            FruitsRetailerService.getAllActiveProduct().then(function (data) {
                vm.Transaction.ProductList = data;
            });
        }

        vm.SaveTransaction = function () {
            if (vm.ValidateTransactione()) {
                vm.Transaction.ProductCode = vm.SelectedItem.Code;
                FruitsRetailerService.saveTransaction(vm.Transaction).then(function (data) {
                    vm.GoBackToPurchaseList();
                });
            }
        }

        vm.ValidateTransactione = function () {

            if (vm.SelectedItem === undefined || vm.SelectedItem === null)
            {
                vm.CodeInfo = "Please select a product for purchase.";
                vm.IsCodeEmpty = true;
                return false;
            }
            else {
                vm.IsCodeEmpty = false;
            }

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

            if (vm.Transaction.OthersCost !== null && vm.Transaction.OthersCost !== undefined && vm.Transaction.OthersCost.length > 0) {
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
            $state.go('purchase', { whoseller: { Id: vm.Wholesaler.Id, Name: vm.Wholesaler.Name, AccountNumber: vm.Wholesaler.AccountNumber, Address: vm.Wholesaler.Address } });
        }       
    }
})();
