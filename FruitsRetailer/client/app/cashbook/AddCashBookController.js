(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('AddCashBookController', AddCashBookController);

    AddCashBookController.$inject = ['$state', '$scope', 'FruitsRetailerService', '$filter'];

    function AddCashBookController($state, $scope, FruitsRetailerService, $filter) {
        var vm = this;
        vm.PageTitle = "Cash Book Entry";
        vm.CashBook = {};
        vm.CashBook.TransactionDate = new Date();
        vm.TransactionTypes = [{ Id: 1, Name: 'Cash' }, { Id: 2, Name: 'TT' }, { Id: 3, Name: 'Check' }, { Id: 4, Name: 'Bkash' }, { Id: 5, Name: 'Others' }]
        vm.SelectedItem = vm.TransactionTypes[0];
        vm.RadioOptions = 'Receive';        

        init();       

        function init()
        {
            FruitsRetailerService.getAccountList().then(function (data) {
                vm.AccountList = data;
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
            if(vm.ValidateStockAndSave())
            {
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
            if (!vm.HasAccountNumber){
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
