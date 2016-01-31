(function () {
    angular
        .module('FruitsRetailerApp')
        .directive('loginDialogDirective', ['AUTH_EVENTS', function (AUTH_EVENTS) {
            return {
                restrict: 'A',
                template: '<div ng-if="visible" ng-include="\'\client\login\logig.html\'">',
                link: function (scope) {
                    var showDialog = function () {
                        scope.visible = true;
                    };
                    scope.visible = false;
                    scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
                    scope.$on(AUTH_EVENTS.sessionTimeout, showDialog)
                }
            }
        }]);
}).call(this);
