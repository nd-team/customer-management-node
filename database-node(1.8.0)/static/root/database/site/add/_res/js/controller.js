var app = angular.module('siteAddCtrlModel', ['toastr']);
app.controller('siteAddCtrl', function($scope,siteSer,$state,toastr){
    $scope.siteAddFun = function () {
        $scope.add.admission_time = angular.element('.admission-time').val();
        $scope.add.finished_time = angular.element('.finish-time').val();
        $scope.add.open_time = angular.element('.open-time').val();
        $scope.add.verification_time = angular.element('.ver-time').val();
        $scope.add.start_verification_time = angular.element('.start-time').val();
        $scope.add.end_verification_time = angular.element('.end-time').val();
        siteSer.siteAdd($scope.add).then(function (response) {
            if(response.data.code == 200){
            $state.go('root.database.site.list[12]');
            toastr.success('添加成功','温馨提示')
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    };
});






