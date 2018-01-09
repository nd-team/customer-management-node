var app = angular.module('database',[]);
app.config(function ($provide, $stateProvider) {
    $stateProvider.state("root.database", {
        url: "/database",
        views: {
            "content@root": {
                templateUrl: "root/database/_res/html/index.html",
                controller: "databaseCtrl"
            },"nav@root": {
                templateUrl: "root/database/_res/html/nav.html",
                controller:"navCtrl"
            }
        }
    })
});


