(function () {
    angular
        .module('FruitsRetailerApp')
        .factory('SessionService', SessionService);

    SessionService.$inject = ['$cookies'];

    function SessionService($cookies) {
        this.create = function (sessionId, userId, userName, userRole) {
            this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
            this.userName = userName;
            var UserInfo = {
                SessionId: sessionId,
                UserId: userId,
                Name: userName,
                Role: userRole
            };
            $cookies.put("UserInfo", JSON.stringify(UserInfo));
        };

        this.destroy = function () {
            this.id = null;
            this.userId = null;
            this.userRole = null;
            this.userName = null;
            $cookies.remove("UserInfo");
        };
        return this;
    }
})();