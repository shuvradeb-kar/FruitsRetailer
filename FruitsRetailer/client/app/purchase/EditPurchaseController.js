(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('EditPurchaseController', EditPurchaseController);

    EditPurchaseController.$inject = ['$state', '$scope', 'FruitsRetailerService', '$stateParams'];

    function EditPurchaseController($state, $scope, FruitsRetailerService, $stateParams) {
        var vm = this;
        
        vm.EditMode = true;
        vm.Transaction = $stateParams.transaction;        
        vm.IsPaymentEnable = (vm.Transaction.AmountReceived > 0) ? true : false;
        vm.Customer = $stateParams.customer;
        vm.Transaction.CustomerId = vm.Customer.Id;
        if (vm.Customer.CustomerType == 1) {
            vm.PaymentTitle = "Receive";
            vm.PageTitle = "Edit Sell";
        }
        else {
            vm.PageTitle = "Edit Purchase";
            vm.PaymentTitle = "Payment";
        }
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
                if (vm.Customer.CustomerType == 1) {
                    FruitsRetailerService.StockInfoForPurchase(vm.Transaction.ProductCode).then(function (data) {
                        if (data.Quantity >= vm.Transaction.Quantity) {
                            vm.HasStockInfo = false;
                            vm.SaveTransactionDetail();
                        }
                        else {
                            vm.StockInfo = "Your available " + data.Name + " stock is " + data.Quantity + ". Please update your stock."
                            vm.HasStockInfo = true;
                        }
                    });
                }
                else {
                    vm.SaveTransactionDetail();
                }   
            }
        }

        vm.SaveTransactionDetail = function () {
            FruitsRetailerService.saveTransaction(vm.Transaction).then(function (data) {
                vm.GoBackToPurchaseList();
            });
        }

        vm.ValidateTransactione = function () {
            if (vm.Transaction.Quantity === undefined || vm.Transaction.Quantity === 0 || isNaN(vm.Transaction.Quantity) || vm.Transaction.Quantity <=0) {
                vm.QuantityInfo = "Please enter valid quantity.";
                vm.IsQuantityEmpty = true;
                return false;
            }
            else {
                vm.IsQuantityEmpty = false;
            }
            if (vm.Transaction.Rate === undefined || vm.Transaction.Rate === 0 || isNaN(vm.Transaction.Rate) || vm.Transaction.Rate <= 0) {
                vm.RateInfo = "Please enter valid rate.";
                vm.IsRateEmpty = true;
                return false;
            }
            else {
                vm.IsRateEmpty = false;
            }

            if (vm.IsPaymentEnable) {
                if (vm.Transaction.AmountReceived === undefined || vm.Transaction.AmountReceived === 0 || isNaN(vm.Transaction.AmountReceived) || vm.Transaction.AmountReceived <= 0) {
                    vm.AmountReceivedInfo = "Please enter valid amount.";
                    vm.IsAmountReceivedEmpty = true;
                    return false;
                }
                else {
                    vm.IsAmountReceivedEmpty = false;
                }
            }
            else {
                vm.Transaction.AmountReceived = 0;
            }

            if (vm.Transaction.OthersCost !== null && vm.Transaction.OthersCost !== undefined) {
                if (isNaN(vm.Transaction.OthersCost) || vm.Transaction.OthersCost < 0) {
                    vm.OthersCostInfo = "Please enter valid discount.";
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
            $state.go('purchase', { customer: { Id: vm.Customer.Id, Name: vm.Customer.Name, AccountNumber: vm.Customer.AccountNumber, Address: vm.Customer.Address } });
        }
    }
})();
