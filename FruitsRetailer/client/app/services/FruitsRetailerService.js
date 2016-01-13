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
            isAccountNumberExists: isAccountNumberExists
        };
        return service;

        function getWholesalerList( pageNo, pageSize )
        {
            var request = $http.get( '/Server/Controller/Purchase?pageNo=' + pageNo + '&pageSize=' + pageSize );
            return request.then( handleSuccess, handleError );
        }
        function saveWholesaler( customer )
        {
            var request = $http.post('/Server/Controller/Purchase', JSON.stringify(customer));
            return request.then(handleSuccess, handleError);
        }
        function isAccountNumberExists( accountNumber )
        {
            var request = $http.get( '/Server/Controller/Purchase?accountNumber=' + accountNumber );
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