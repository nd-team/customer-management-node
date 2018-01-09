var app = angular.module('addCtrlM', ['toastr']);
app.controller('addCtrl', function($scope,projectSer,$state,toastr){
    $scope.addFun = function () {
        $scope.add.createCompanyTime= angular.element('.time').val();
        projectSer.projectAdd($scope.add).then(function (response) {
            if(response.data.code == 0){
            $state.go('root.database.projectMas.list[12]');
            toastr.success('添加成功','温馨提示')
            }else {
                toastr.error(response.data.data.tip,'温馨提示')
            }
        })
    }

    // //详情百分比
    // $('.scaleDl').text((($('.ddWid').width()/$('.dlWid').width())*100).toFixed(0)+'%');



});






