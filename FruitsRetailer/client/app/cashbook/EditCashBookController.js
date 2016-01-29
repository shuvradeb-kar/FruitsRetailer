(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('EditCashBookController', EditCashBookController);

    EditCashBookController.$inject = ['$state', '$scope', 'FruitsRetailerService', '$stateParams', '$filter'];

    function EditCashBookController($state, $scope, FruitsRetailerService, $stateParams, $filter) {
        var vm = this;
        vm.PageTitle = "Edit Cash Book Entry";        
        vm.EditMode = true;
        
        
        vm.TransactionTypes = [{ Id: 1, Name: 'Cash' }, { Id: 2, Name: 'TT' }, { Id: 3, Name: 'Check' }, { Id: 4, Name: 'Bkash' }, { Id: 5, Name: 'Others' }]
        vm.CashBook = $stateParams.cashbook;
        //vm.CashBook.TransactionDate = new Date();
        vm.SelectedItem = vm.TransactionTypes[vm.CashBook.TransactionType -1];
        if (vm.CashBook.IsPayment)
        {
            vm.RadioOptions = 'Payment';
        }
        else
        {
            vm.RadioOptions = 'Receive';
        }

        if (vm.CashBook.Credit > 0)
        {
            vm.Amount = vm.CashBook.Credit;
        }
        else if (vm.CashBook.Debit > 0)
        {
            vm.Amount = vm.CashBook.Debit;
        }

        if (vm.CashBook.AccountNumber > 0)
        {
            vm.HasAccountNumber = true;            
        }

        init();

        function init() {
            FruitsRetailerService.getAccountList().then(function (data) {
                vm.AccountList = data;              
                vm.SelectedAcNumber(vm.CashBook.AccountNumber);
            });
        }
        var _selected;
        vm.modelOptions = {
            debounce: {
                default: 500,
                blur: 250
            },
            getterSetter: true
        };

        vm.SelectedAcNumber = function (value) {
            if (arguments.length) {
                _selected = value;
                var found = $filter('getByAccountNumber')(vm.AccountList, _selected);
                if (found !== null) {
                    vm.CashBook.AccountNumber = found.AccountNumber;
                    vm.AccountHolderName = found.Name;
                    vm.AccountHolderAddress = found.Address;
                }
                else {
                    vm.AccountHolderAddress = '';
                    vm.AccountHolderName = '';
                    vm.CashBook.AccountNumber = 0;
                }

            } else {
                return _selected;
            }
        };

        vm.SaveCashBook = function () {
            if (vm.ValidateStockAndSave()) {
                FruitsRetailerService.saveCashBook(vm.CashBook).then(function (data) {
                    vm.GoBackToCashBook();
                });
            }
        }

        vm.ValidateStockAndSave = function () {
            if (vm.Amount === null || vm.Amount === undefined || isNaN(vm.Amount)) {
                vm.AmountInfo = "Please enter amount";
                vm.IsAmountEmpty = true;
                return false;
            }
            else {
                vm.IsAmountEmpty = false;
            }
            if (!vm.HasAccountNumber) {
                vm.CashBook.AccountNumber = 0;
            }

            if (vm.RadioOptions === 'Receive') {
                vm.CashBook.IsPayment = false;
            }
            else {
                vm.CashBook.IsPayment = true;
            }
            vm.CashBook.TransactionType = vm.SelectedItem.Id;

            if (vm.CashBook.IsPayment) {
                vm.CashBook.Credit = vm.Amount;
                vm.CashBook.Debit = 0;
            }
            else {
                vm.CashBook.Debit = vm.Amount;
                vm.CashBook.Credit = 0;
            }
            return true;
        }

        vm.GoBackToCashBook = function () {
            $state.go('cashbook');
        }

    }
})();
