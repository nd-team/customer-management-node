var app = angular.module('unitEditModel', ['toastr']);
app.controller('unitEditCtrl', function($scope, unitSer,$stateParams,$state,toastr,){
    var data = {
        id:$stateParams.id,
    };
    //获取ID
    unitSer.unitId(data).then(function(response){
        if(response.data.code== 0){
            $scope.edit = response.data.data;
        }else{
            toastr.error( response.data.msg, '温馨提示');
        }

    });
    $scope.editFun = function () {
        // $scope.edit.company_establish_time= angular.element('.time').val();
        unitSer.unitEdit($scope.edit).then(function (response) {
            if(response.data.code == 0){
                $state.go('root.database.unitInfo.list[12]');
                toastr.success('编辑成功','温馨提示')
            }else {
                toastr.error(response.data.data.tip,'温馨提示')
            }
        })
    };
});






