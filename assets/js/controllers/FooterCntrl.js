app.controller('FooterCntrl', ['$scope', 'ReqHandlingSrvc', 'StaticDataSrvc', function($scope, ReqHandlingSrvc, StaticDataSrvc) {

    $scope.ctr = {
        StaticDataSrvc: StaticDataSrvc
    }

    ReqHandlingSrvc.get('/version')
        .then(function(res) {
            StaticDataSrvc.projectVersion = res.project;
        })
}])