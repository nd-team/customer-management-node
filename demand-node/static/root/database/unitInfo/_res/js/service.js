var app = angular.module('unitServer',[]);
app.factory('unitSer',function ($http) {
    return {
        unitList : unitList,
        unitAdd : unitAdd,
        unitEdit : unitEdit,
        unitId : unitId,
        unitTotal:unitTotal,
        unitDelete:unitDelete,
        // unitUpload: unitUpload,
        // unitView: unitView,
        // unitDownload: unitDownload,
    };
    function unitList(data) {//列表
        return $http.get('/unit/list',{
            params:data
        })
    }
    function unitAdd(data) {                   //添加
        return $http.post('/unit/add',data)
    }
    function unitId(data){                   //获取数据
        return $http.get('/unit/typeId',{
            params:data
        })
    }
    function unitEdit(data) {                   //编辑
        return $http.post('/unit/edit',data)
    }
    function unitDelete(data) {                    //删除
        return $http.get('/unit/delete',{
            params:data
        })
    }
    //分页总条数
    function unitTotal(data){
        return $http.get('/unit/count',{params:data})
    }
    // function unitDetail(data) {                   //详情
    //     return $http.get('/unit/detail',{
    //         params:data
    //     })
    // }
    // function unitUpload(data) {                   //上传附件
    //     return $http.post('/unit/upload',data)
    // }
    // function unitView(data) {                   //查看附件
    //     return $http.get('/unit/view',{
    //         params:data
    //     })
    // }
    // function unitDownload(data) {                   //查看附件
    //     return $http.get('/unit/download',{
    //         params:data
    //     })
    // }
});
