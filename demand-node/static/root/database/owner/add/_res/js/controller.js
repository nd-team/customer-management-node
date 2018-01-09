var app = angular.module('ownerAddModel', ['toastr']);
app.controller('ownerAddCtrl', function($scope,ownerSer,$state,toastr){
    $scope.addFun = function () {
        // $scope.add.owner_collect_time= angular.element('.time').val();
        ownerSer.ownerAdd($scope.add).then(function (response) {
            if(response.data.code == 0){
            $state.go('root.database.owner.list[12]');
            toastr.success('添加成功','温馨提示')
            }else {
                toastr.error(response.data.data.tip,'温馨提示')
            }
        })
    }
});






