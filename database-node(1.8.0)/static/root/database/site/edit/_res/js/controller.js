var app = angular.module('siteEditModel', ['toastr']);
app.controller('siteEditCtrl', function($scope, siteSer,$stateParams,$state,toastr,){
    var data = {
        id:$stateParams.id,
        token:$stateParams.tonken,
    };
    siteSer.siteDetail(data).then(function (response) {
        if(response.data.code == 200){
            $scope.edit = response.data.data;
        }
    });
    $scope.siteEditFun = function () {
        $scope.edit.admission_time = angular.element('.admission-time').val();
        $scope.edit.finished_time = angular.element('.finish-time').val();
        $scope.edit.open_time = angular.element('.open-time').val();
        $scope.edit.verification_time = angular.element('.ver-time').val();
        $scope.edit.start_verification_time = angular.element('.start-time').val();
        $scope.edit.end_verification_time = angular.element('.end-time').val();
        //是否选址
        if($scope.edit.whether_address == '是'){
            $scope.edit.whether_address = 1
        }else {
            $scope.edit.whether_address = 0
        }
        //是否入场
        if($scope.edit.whether_admission == '是'){
            $scope.edit.whether_admission = 1
        }else {
            $scope.edit.whether_admission = 0
        }
        //是否完工
        if($scope.edit.whether_finished == '是'){
            $scope.edit.whether_finished = 1
        }else {
            $scope.edit.whether_finished = 0
        }
        //是否开通
        if($scope.edit.whether_open == '是'){
            $scope.edit.whether_open = 1
        }else {
            $scope.edit.whether_open = 0
        }
        //单验证是否通过
        if($scope.edit.whether_verification == '是'){
            $scope.edit.whether_verification = 1
        }else {
            $scope.edit.whether_verification = 0
        }
        //是否初验
        if($scope.edit.whether_start_verification == '是'){
            $scope.edit.whether_start_verification = 1
        }else {
            $scope.edit.whether_start_verification = 0
        }
        //是否终验
        if($scope.edit.whether_end_verification == '是'){
            $scope.edit.whether_end_verification = 1
        }else {
            $scope.edit.whether_end_verification = 0
        }
        siteSer.siteEdit($scope.edit).then(function (response) {
            if(response.data.code == 200){
                $state.go('root.database.site.list[12]');
                toastr.success('编辑成功','温馨提示')
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    };
});






