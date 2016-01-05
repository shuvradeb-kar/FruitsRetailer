(function () {
    'use strict';
    angular
        .module('FruitsRetailerApp')
        .factory('FruitsRetailerService', FruitsRetailerService);

    FruitsRetailerService.$inject = ['$http', '$q'];

    function FruitsRetailerService($http, $q) {
        var service = {
            addNewWholesaler: addNewWholesaler
        };

        function addNewWholesaler(customer) {
            var request = $http.post('/ApiController/Purchase', JSON.stringify(customer));
            return request.then(handleSuccess, handleError);
        }

        //function getSourceFilePath(volumeIdentifier, sourceFilePath) {
        //    var request = $http.get('/Global/TemplateRepository/Controllers/TemplateAdd', { params: { volumeIdentifier: volumeIdentifier, sourceFilePath: sourceFilePath } });
        //    return request.then(handleSuccess, handleError);
        //}
        

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

        return service;
    }
})();