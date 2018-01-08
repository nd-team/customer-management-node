var app = angular.module('ownerServer',[]);
app.factory('ownerSer',function ($http) {
    return {
        ownerList : ownerList,
        ownerAdd : ownerAdd,
        ownerEdit : ownerEdit,
        ownerId : ownerId,
        ownerTotal:ownerTotal,
        ownerDelete:ownerDelete,
        // ownerUpload: ownerUpload,
        // ownerView: ownerView,
        // ownerDownload: ownerDownload,
    };
    function ownerList(data) {//列表
        return $http.get('/owner/list',{
            params:data
        })
    }
    function ownerAdd(data) {                   //添加
        return $http.post('/owner/add',data)
    }
    // function ownerFind(data){                   //获取数据
    //     return $http.get('/owner/find',{
    //         params:data
    //     })
    // }
    function ownerEdit(data) {                   //编辑
        return $http.post('/owner/edit',data)
    }
    function ownerDelete(data) {                    //删除
        return $http.get('/owner/delete',{
            params:data
        })
    }
    function ownerId(data) {                   //详情
        return $http.get('/owner/typeId',{
            params:data
        })
    }
    //分页总条数
    function ownerTotal(data){
        return $http.get('/owner/count',{params:data})
    }
    // function ownerUpload(data) {                   //上传附件
    //     return $http.post('/owner/upload',data)
    // }
    // function ownerView(data) {                   //查看附件
    //     return $http.get('/owner/view',{
    //         params:data
    //     })
    // }
    // function ownerDownload(data) {                   //下载附件
    //     return $http.get('/owner/download',{
    //         params:data
    //     })
    // }
});
