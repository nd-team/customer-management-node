var app = angular.module('weEditModel', ['toastr']);
app.controller('weEditCtrl', function($scope, weSer,$stateParams,$state,toastr,){
    var data = {
        id:$stateParams.id,
        tonken:$stateParams.tonken,
    };
    weSer.weDetail(data).then(function (response) {
        if(response.data.code == 200){
            $scope.edit = response.data.data;
        }
    });
    $scope.editFun = function () {
        $scope.edit.company_establish_time= angular.element('.time').val();
        weSer.weEdit($scope.edit).then(function (response) {
            if(response.data.code == 200){
                $state.go('root.database.we.list[12]');
                toastr.success('编辑成功','温馨提示')
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    };
});






