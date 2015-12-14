angular.module('weather').controller('WeatherAppContentController',
    function ($scope, $enplugDashboard, WeatherService, $location, DetectChanges, $firebaseArray) {
        'use strict';

        $enplugDashboard.pageLoading(false);

        // $scope.settings = settings;

        /*
        * Todo:
        * create new firebase obj, save var as firebase array
        * iterate through it in the partial to list them all in a list
        * add a thumbnail switcher
        */

        var url = 'https://simplesign.firebaseio.com/accounts/katie/slides';

        var signsRef = new Firebase(url);

        $scope.signs = $firebaseArray(signsRef);

        $scope.sign = {
            color: '',
            headline: '',
            id: '',
            src: ''
        };

        function save() {
            $enplugDashboard.loadingIndicator('Updating settings');
            return WeatherService.saveSettings($scope.settings).then(function (settings) {
                $enplugDashboard.successIndicator('Updated settings').then(function () {
                    $scope.displaySearch = false;
                    watchChanges();
                });
            }, $enplugDashboard.errorIndicator);
        }

        $scope.routeToSettings = function () {
            $location.path('/');
        };

        // From News App - declares and calls
        $enplugDashboard.setHeaderButtons([
            { text: 'Create a Sign', action: $scope.routeToSettings, class: 'btn-primary'}
        ]);
        
    }
);