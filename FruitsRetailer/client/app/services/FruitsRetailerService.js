(function () {
    'use strict';
    angular
        .module('FruitsRetailerApp')
        .factory('FruitsRetailerService', FruitsRetailerService);

    FruitsRetailerService.$inject = ['$http', '$q'];

    function FruitsRetailerService($http, $q) {
        var service = {
            saveWholesaler: saveWholesaler,
            getWholesalerList: getWholesalerList,            
            isAccountNumberExists: isAccountNumberExists,
            deleteWholesaler: deleteWholesaler,
            saveTransaction: saveTransaction,
            getCustomerTransactionDetail: getCustomerTransactionDetail,
            deleteTransaction: deleteTransaction,
            isProductCodeExist: isProductCodeExist,
            saveStock: saveStock,
            getProductList: getProductList,
            deleteProduct: deleteProduct,
            getAllActiveProduct: getAllActiveProduct,
            getAccountList: getAccountList,
            saveCashBook: saveCashBook,
            getCashBookDetail: getCashBookDetail,
            deleteCashBook: deleteCashBook,
            getCustomeLabelValues: getCustomeLabelValues,
            getRetailerList: getRetailerList,
            saveRetailer: saveRetailer,
            isRetailerAccountNumberExists: isRetailerAccountNumberExists,
            deleteRetailer: deleteRetailer
        };
        return service;

        function saveRetailer(retailer) {
            var request = $http.post('/Server/Controller/Retailer', JSON.stringify(retailer));
            return request.then(handleSuccess, handleError);
        }
        function isRetailerAccountNumberExists(accountNumber) {
            var request = $http.get('/Server/Controller/Retailer?accountNumber=' + accountNumber);
            return request.then(handleSuccess, handleError);
        }
        function deleteRetailer(customerId) {
            var request = $http.delete('/Server/Controller/Retailer?customerId=' + customerId);
            return request.then(handleSuccess, handleError);
        }

        function getRetailerList(pageNo, pageSize, filter) {
            var request = $http.get('/Server/Controller/Retailer?pageNo=' + pageNo + '&pageSize=' + pageSize + '&filter=' + filter);
            return request.then(handleSuccess, handleError);
        }

        function getCustomeLabelValues() {
            var request = $http.get('/Server/Controller/Common');
            return request.then(handleSuccess, handleError);
        }

        function deleteCashBook(cashBookId)
        {
            var request = $http.delete('/Server/Controller/CashBook?cashBookId=' + cashBookId);
            return request.then(handleSuccess, handleError);
        }
        function getCashBookDetail(pageNo, pageSize) {
            var request = $http.get('/Server/Controller/CashBook?pageNo=' + pageNo + '&pageSize=' + pageSize);
            return request.then(handleSuccess, handleError);
        }

        function saveCashBook(cashBook)
        {
            var request = $http.post('/Server/Controller/CashBook', JSON.stringify(cashBook));
            return request.then(handleSuccess, handleError);
        }
        function getAccountList()
        {
            var request = $http.get('/Server/Controller/CashBook');
            return request.then(handleSuccess, handleError);
        }

        function getAllActiveProduct()
        {
            var request = $http.get('/Server/Controller/Purchase');
            return request.then(handleSuccess, handleError);
        }
        function deleteProduct(productId)
        {
            var request = $http.delete('/Server/Controller/Stock?productId=' + productId);
            return request.then(handleSuccess, handleError);
        }
        function getProductList(pageNo, pageSize) {
            var request = $http.get('/Server/Controller/Stock?pageNo=' + pageNo + '&pageSize=' + pageSize);
            return request.then(handleSuccess, handleError);
        }
        function saveStock(stock) {
            var request = $http.post('/Server/Controller/Stock', JSON.stringify(stock));
            return request.then(handleSuccess, handleError);
        }

        function isProductCodeExist(code)
        {
            var request = $http.get('/Server/Controller/Stock?code=' + code);
            return request.then(handleSuccess, handleError);
        }
        function deleteTransaction(transactionId)
        {
            var request = $http.delete('/Server/Controller/Purchase?transactionId=' + transactionId);
            return request.then(handleSuccess, handleError);
        }

        function saveTransaction(transaction)
        {
            var request = $http.post('/Server/Controller/Purchase', JSON.stringify(transaction));
            return request.then(handleSuccess, handleError);
        }

        function getCustomerTransactionDetail(pageNo, pageSize, wholesalerId) {
            var obj = {
                PageNo: pageNo,
                PageSize: pageSize,
                CustomerId: wholesalerId
            }
            var filterObj = angular.copy(obj);
            var request = $http.get('/Server/Controller/Purchase', { params: { wholesalerFilter: filterObj } });
            return request.then(handleSuccess, handleError);
        }
        function getWholesalerList( pageNo, pageSize, filter )
        {
            var request = $http.get('/Server/Controller/Wholesaler?pageNo=' + pageNo + '&pageSize=' + pageSize + '&filter=' + filter);
            return request.then( handleSuccess, handleError );
        } 

        function saveWholesaler( customer )
        {
            var request = $http.post('/Server/Controller/Wholesaler', JSON.stringify(customer));
            return request.then(handleSuccess, handleError);
        }
        function isAccountNumberExists( accountNumber )
        {
            var request = $http.get('/Server/Controller/Wholesaler?accountNumber=' + accountNumber);
            return request.then( handleSuccess, handleError );
        }
        function deleteWholesaler(customerId)
        {
            var request = $http.delete( '/Server/Controller/Wholesaler?customerId=' + customerId );
            return request.then( handleSuccess, handleError );
        }

        function handleError(response) {
            if (
                !angular.isObject(response.data) ||
                !response.data.message
                ) {
                return ($q.reject("An unknown error occurred."));
            }

            return ($q.reject(response.data.message));
        }

        function handleSuccess(response) {
            return (response.data);
        }

        
    }
})();