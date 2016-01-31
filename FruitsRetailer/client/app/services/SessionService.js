(function () {
    angular
        .module('FruitsRetailerApp')
        .factory('SessionService', SessionService);

    SessionService.$inject = [];

    function SessionService() {
        this.create = function (sessionId, userId, userName, userRole) {
            this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
            this.userName = userName;
        };

        this.destroy = function () {
            this.id = null;
            this.userId = null;
            this.userRole = null;
            this.userName = null;
        };
        return this;
    }
})();