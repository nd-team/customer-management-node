var app = angular.module('ownerEditModel', ['toastr']);
app.controller('ownerEditCtrl', function($scope, ownerSer,$stateParams,$state,toastr,){
    var data = {
        id:$stateParams.id,
    };
    //获取ID
    ownerSer.ownerId(data).then(function(response){
        if(response.data.code== 0){
            $scope.edit = response.data.data;
        }else{
            toastr.error( response.data.msg, '温馨提示');
        }

    });
    $scope.editFun = function () {
        // $scope.edit.project_collect_time= angular.element('.time').val();
        ownerSer.ownerEdit($scope.edit).then(function (response) {
            if(response.data.code == 0){
                $state.go('root.database.owner.list[12]');
                toastr.success('编辑成功','温馨提示')
            }else {
                toastr.error(response.data.data.tip,'温馨提示')
            }
        })
    };
});






