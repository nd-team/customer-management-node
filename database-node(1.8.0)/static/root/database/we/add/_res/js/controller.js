var app = angular.module('weAddCtrlModel', ['toastr']);
app.controller('weAddCtrl', function($scope,weSer,$state,toastr){
    $scope.addFun = function () {
        $scope.add.company_establish_time= angular.element('.time').val();
        weSer.weAdd($scope.add).then(function (response) {
            if(response.data.code == 200){
            $state.go('root.database.we.list[12]');
            toastr.success('添加成功','温馨提示')
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    };





});






