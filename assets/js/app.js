var app = angular.module('EmployeeApp', ['ngRoute', 'ui.bootstrap', 'angularFileUpload', 'toaster', 'ngAnimate', 'infinite-scroll']);

app.config(['$routeProvider', '$controllerProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $controllerProvider, $locationProvider, $httpProvider) {
        app.controller = $controllerProvider.register;

        var exponentialInterval = 3000;
        $httpProvider.interceptors.push(function($q, $timeout, $injector) {
            return {
                'responseError': function(responseError) {
                   console.log('responseError', responseError)
                   if(responseError.status == -1) {
                    $timeout(function(){
                        var $http = $injector.get('$http');
                        $http(responseError.config);
                        exponentialInterval *= 2;
                    }, exponentialInterval);
                   } else {
                    return responseError;
                   }
                }
            };
        });

        app.resolveScriptDeps = function(dependencies){
            return function($q,$rootScope){
                var deferred = $q.defer();
                $script(dependencies, function() {
                    // all dependencies have now been loaded by $script.js so resolve the promise
                    $rootScope.$apply(function()
                    {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            }
        };

        $routeProvider
            .when('/', {
                templateUrl: '/templates/index.html',
                controller:'IndexCntrl',
                resolve: {
                    deps: app.resolveScriptDeps([
                    '/js/controllers/IndexCntrl.js',
                    '/js/controllers/FooterCntrl.js'
                ])}
            })
            .when('/registration', {
                templateUrl: '/templates/reg_main.html',
                controller:'RegisterMainCntrl',
                resolve: {
                    deps: app.resolveScriptDeps([
                    '/js/controllers/RegisterMainCntrl.js',
                    '/js/controllers/RegCompanyCntrl.js',
                    '/js/controllers/RegEmployeeCntrl.js',
                    '/js/controllers/SelCityModalCntrl.js',
                    '/js/controllers/SelLanguageModalCntrl.js',
                    '/js/controllers/SelEducationModalCntrl.js',
                    '/js/controllers/AddSkillModalCntrl.js',
                    '/js/controllers/AddExperienceModalCntrl.js',
                    '/js/controllers/AddPortfolioModalCntrl.js'
                ])}
            })
            .when('/proposal', {
                templateUrl: '/templates/proposal_list.html',
                controller: 'ProposalCntrl',
                resolve: {
                    deps: app.resolveScriptDeps([
                        'js/controllers/ProposalCntrl.js',
                        'js/controllers/SelectCategoriesModalCntrl.js'
                ])}
            })
            .when('/employees', {
                templateUrl: '/templates/employees_list.html',
                controller: 'EmployeesCntrl',
                resolve: {
                    deps: app.resolveScriptDeps([
                        'js/controllers/EmployeesCntrl.js'
                ])}
            })
            .when('/companies', {
                templateUrl: '/templates/companies_list.html',
                controller: 'CompaniesCntrl',
                resolve: {
                    deps: app.resolveScriptDeps([
                        'js/controllers/CompaniesCntrl.js'
                ])}
            })
            .when('/company/:profileId', {
                templateUrl: '/templates/company_profile.html',
                controller: 'CompanyProfileCntrl',
                resolve: {
                    deps: app.resolveScriptDeps([
                        'js/controllers/CompanyProfileCntrl.js',
                        'js/controllers/SelectCategoriesModalCntrl.js'
                ])}
            })
            .when('/employee/:profileId', {
                templateUrl: '/templates/employee_profile.html',
                controller: 'EmployeeProfileCntrl',
                resolve: {
                    deps: app.resolveScriptDeps([
                        'js/controllers/EmployeeProfileCntrl.js',
                        'js/controllers/AddSkillModalCntrl.js',
                        'js/controllers/AddExperienceModalCntrl.js',
                        'js/controllers/SelEducationModalCntrl.js',
                        'js/controllers/AddPortfolioModalCntrl.js',
                        'js/controllers/AddCourseModalCntrl.js',
                        'js/controllers/SelLanguageModalCntrl.js'
                ])}
            })
            .when('/create/advert', {
                templateUrl: '/templates/create_advert.html',
                controller: 'CreateAdvertCntrl',
                resolve: {
                    deps: app.resolveScriptDeps([
                        'js/controllers/CreateAdvertCntrl.js',
                        'js/controllers/SelectCategoryModalCntrl.js'
                ])}
            })
            .when('/advert/:advertId', {
                templateUrl: '/templates/advert.html',
                controller: 'AdvertCntrl',
                resolve: {
                    deps: app.resolveScriptDeps([
                        'js/controllers/AdvertCntrl.js',
                        'js/controllers/AddSubmitProposalModalCntrl.js'
                ])}
            })
            .when('/confirmed', {
                templateUrl: '/templates/emailConfirmed.html'
            })
            .when('/applicants/:advertId', {
                templateUrl: '/templates/showApplicatns.html',
                controller: 'ShowApplicatnsCntrl',
                resolve: {
                    deps: app.resolveScriptDeps([
                        'js/controllers/showApplicatnsCntrl.js'
                    ])
                }
            })
        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: false
        //});
    }]);