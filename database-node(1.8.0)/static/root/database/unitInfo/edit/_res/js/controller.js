var app = angular.module('unitEditModel', ['toastr']);
app.controller('unitEditCtrl', function($scope, unitSer,$stateParams,$state,toastr,){
    var data = {
        id:$stateParams.id,
        token:$stateParams.tonken,
    };
    unitSer.unitDetail(data).then(function (response) {
        if(response.data.code == 200){
            $scope.edit = response.data.data;
        }
    });
    $scope.editFun = function () {
        $scope.edit.company_establish_time= angular.element('.time').val();
        unitSer.unitEdit($scope.edit).then(function (response) {
            if(response.data.code == 200){
                $state.go('root.database.unitInfo.list[12]');
                toastr.success('编辑成功','温馨提示')
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    };
});






