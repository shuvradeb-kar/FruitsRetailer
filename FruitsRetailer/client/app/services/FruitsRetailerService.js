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
            getWholesalerTransactionDetail: getWholesalerTransactionDetail,
            deleteTransaction: deleteTransaction,
            isProductCodeExist: isProductCodeExist,
            saveStock: saveStock,
            getProductList: getProductList
        };
        return service;

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

        function getWholesalerTransactionDetail(pageNo, pageSize, wholesalerId) {
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