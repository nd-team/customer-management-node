var app = angular.module('unitAddCtrlModel', ['toastr']);
app.controller('unitAddCtrl', function($scope,unitSer,$state,toastr){
    $scope.addFun = function () {
        // $scope.add.company_establish_time= angular.element('.time').val();
        unitSer.unitAdd($scope.add).then(function (response) {
            if(response.data.code == 0){
            $state.go('root.database.unitInfo.list[12]');
            toastr.success('添加成功','温馨提示')
            }else {
                toastr.error(response.data.data.tip,'温馨提示')
            }
        })
    };





});






