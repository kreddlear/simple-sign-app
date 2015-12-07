angular.module('weather').controller('WeatherAppContentController',
    function ($scope, $enplugDashboard, WeatherService, $location, DetectChanges, Units, $firebaseArray) {
        'use strict';

        $enplugDashboard.pageLoading(false);

        /*        
        $scope.units = Units;
        $scope.settings = settings;

        $scope.displaySearch = typeof $scope.settings.Id !== 'string';
        
        */

        /*
        * Todo:
        * create new firebase obj, save var as firebase array
        * iterate through it in the partial to list them all in a list
        * add a thumbnail switcher
        */

        var url = 'https://simplesign.firebaseio.com/';
        var signsRef = new Firebase(url);

        $scope.signs = $firebaseArray(signsRef);

        $scope.sign = {
            color: '',
            headline: '',
            id: '',
            src: ''
        };

        // All of this is for the Weather app - saving assets etc. We probably don't need it. 
        /*
        function save() {
            $enplugDashboard.loadingIndicator('Updating settings');
            return WeatherService.saveSettings($scope.settings).then(function (settings) {
                $enplugDashboard.successIndicator('Updated settings').then(function () {
                    $scope.displaySearch = false;
                    watchChanges();
                });
            }, $enplugDashboard.errorIndicator);
        }
        */
        // Sets save button that is disabled when no changes or invalid data, and change location button when
        // user has an existing location
        function setHeaderButtons() {
            var changes = DetectChanges.hasChanges(),
                headerButtons = [{ 
                    text: 'Create a Sign', 
                    action: routeToSettings, 
                    class: 'btn-primary', 
                    icon: 'ion-compose' 
                }];

            $enplugDashboard.setHeaderButtons(headerButtons);
        }


        function routeToSettings() {
            $location.path('/');
        }

        // Only allow saving when we have a valid location. False when user is first setting up
        
        function canSave() {
            return $scope.settings.Value.Location !== null;
        }
        
        // Update save button status each time data changes
        $scope.$watch(canSave, setHeaderButtons);
        $scope.$watch(DetectChanges.hasChanges, setHeaderButtons);

        // Make this a function so we can disable save button after saving a location
        function watchChanges() {
            DetectChanges.watch(['settings.Value.Units', 'settings.Value.Location.Name'], $scope);
        }
        watchChanges();
        
    }
);