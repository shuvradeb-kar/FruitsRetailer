(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('EditPurchaseController', EditPurchaseController);

    EditPurchaseController.$inject = ['$state', '$scope', 'FruitsRetailerService', '$stateParams'];

    function EditPurchaseController($state, $scope, FruitsRetailerService, $stateParams) {
        var vm = this;
        vm.PageTitle = "Edit Purchase";
        
        vm.Transaction = $stateParams.transaction;        
        vm.IsPaymentEnable = false;        
        vm.Customer = $stateParams.customer;
        vm.Transaction.CustomerId = vm.Customer.Id;
        init();
        function init() {
            FruitsRetailerService.getAllActiveProduct().then(function (data) {
                vm.Transaction.ProductList = data;
                var len = vm.Transaction.ProductList.length;

                for (i=0; i < len; i++) {
                    if (vm.Transaction.ProductList[i].Code === vm.Transaction.ProductCode) {
                        vm.SelectedItem = vm.Transaction.ProductList[i];
                        return;
                    }
                }
            });
        }

        vm.SaveTransaction = function () {
            if (vm.ValidateTransactione()) {
                vm.Transaction.ProductCode = vm.SelectedItem.Code;
                vm.Transaction.ProductId = vm.SelectedItem.Id;
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
            else {
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
            $state.go('purchase', { whoseller: { Id: vm.Customer.Id, Name: vm.Customer.Name, AccountNumber: vm.Customer.AccountNumber, Address: vm.Customer.Address } });
        }
    }
})();
