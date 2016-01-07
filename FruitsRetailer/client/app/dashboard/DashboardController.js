(function () {
    angular
        .module('FruitsRetailerApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$state', '$scope'];

    function DashboardController($state, $scope) {

        var vm = this;
        
    }
})();





//vm.OpenEditTemplateWindow = function () {
//    vm.CloseDetailWindow();
//    Common.$broadcast(GalleryEvents.TOGGLE_GALLERY, { show: false });
//    $state.go('tmplGallery.edit', { 'templateId': vm.TemplateDetail.TemplateId });
//    if ($state.current.name == 'tmplGallery.edit') {
//        $state.go('tmplGallery.editreset', { 'templateId': vm.TemplateDetail.TemplateId });
//    }
//}