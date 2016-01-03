angular.module('simple-sign', [
//   TODO
//   [] Test to see which app templates dep we need 
    'dashboard-web-page-app-templates', 
    'enplug.sdk',
    'enplug.sdk.utils',
    'ngRoute',
    'ngMessages',
    'firebase'
]);

angular.module('simple-sign').config(function ($routeProvider, $locationProvider) {
    'use strict';

    $locationProvider.html5Mode(false);

    $routeProvider
        .when('/', {
            templateUrl: 'dashboard/templates/signs.tpl',
            controller: 'SignsController',
            resolve: {
                pages: function(WebPageService) {
                    return WebPageService.loadWebPages();
                },
                account: function(WebPageService) {
                    return WebPageService.getAccount().then(function(account) {
                        return account;
                    });
                },                
                displayGroup: function(WebPageService) {
                    return WebPageService.getDisplayGroup().then(function(displayGroup) {
                        return displayGroup;
                    });
                }
            }
        })
        .when('/create', {
            templateUrl: 'dashboard/templates/sign-creator.tpl',
            controller: 'SignCreatorController',
            resolve: {
                account: function(WebPageService) {
                    return WebPageService.getAccount().then(function(account) {
                        return account;
                    });
                },
                displayGroup: function(WebPageService) {
                    return WebPageService.getDisplayGroup().then(function(displayGroup) {
                        return displayGroup;
                    });
                }
            }
        })
});

angular.module('simple-sign').directive('autoFocus', function($timeout) {
    return {
        restrict: 'AC',
        link: function(_scope, _element) {
            $timeout(function(){
                _element[0].focus();
            }, 0);
        }
    };
});
