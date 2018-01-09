var app = angular.module('we', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.database.we", {
        url : "/we",
        views : {
            "content@root.database":{
                templateUrl : "root/database/we/_res/html/index.html",
                controller:"weCtrl"
            },"menu@root.database.we":{
                templateUrl : "root/database/we/_res/html/menu.html",
                controller:"weMenuCtrl"
            }
        }
    }).state("root.database.we.list[12]",{
        url:"/list[12]?id=&name=&tonken",
        views:{
            "content@root.database.we":{
                templateUrl : "root/database/we/list/_res/html/index.html",
                controller:'weListCtrl'
            }
        }
    }).state("root.database.we.edit[12]",{
        url:"/edit[12]?id=&tonken=",
        views:{
            "content@root.database.we":{
                templateUrl : "root/database/we/edit/_res/html/index.html",
                controller:'weEditCtrl'
            }
        }
    }).state("root.database.we.add[12]",{
        url:"/add[12]",
        views:{
            "content@root.database.we":{
                templateUrl : "root/database/we/add/_res/html/index.html",
                controller:'weAddCtrl'
            }
        }
    }).state("root.database.we.upload[12]",{
        url:"/upload[12]?id=&name=&tonken=&type",
        views:{
            "content@root.database.we":{
                templateUrl : "root/database/we/upload/_res/html/index.html",
                controller:'weUploadCtrl'
            }
        }
    }).state("root.database.we.view[12]",{
            url:"/view[12]?id=&name=&tonken=",
            views:{
                "content@root.database.we":{
                    templateUrl : "root/database/we/view/_res/html/index.html",
                    controller:'weViewCtrl'
                }
            }
        })
});

