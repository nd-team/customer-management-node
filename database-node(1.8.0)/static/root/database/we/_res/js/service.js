var app = angular.module('weServer',[]);
app.factory('weSer',function ($http) {
    return {
        weList : weList,
        weAdd : weAdd,
        weEdit : weEdit,
        weFind : weFind,
        weDetail:weDetail,
        weDelete:weDelete,
        weUpload: weUpload,
        weView: weView,
        weDownload: weDownload,
    };
    function weList(data) {//列表
        return $http.get('/we/list',{
            params:data
        })
    }
    function weAdd(data) {                   //添加
        return $http.post('/we/add',data)
    }
    function weFind(data){                   //获取数据
        return $http.get('/we/find',{
            params:data
        })
    }
    function weEdit(data) {                   //编辑
        return $http.post('/we/edit',data)
    }
    function weDelete(data) {                    //删除
        return $http.get('/we/delete',{
            params:data
        })
    }
    function weDetail(data) {                   //详情
        return $http.get('/we/detail',{
            params:data
        })
    }
    function weUpload(data) {                   //上传附件
        return $http.post('/we/upload',data)
    }
    function weView(data) {                   //查看附件
        return $http.get('/we/view',{
            params:data
        })
    }
    function weDownload(data) {                   //查看附件
        return $http.get('/we/download',{
            params:data
        })
    }
});
