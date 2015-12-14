angular.module('weather').controller('WeatherAppSettingsController',
    function ($scope, $enplugDashboard, settings, WeatherService, $location, DetectChanges, $firebaseArray) {
        'use strict';

        $enplugDashboard.pageLoading(false);

        // I need something like this here. $scope.[something] = something; per parameters above
        $scope.settings = settings;

        // only created this because it complained
        var watchValues = [];

        // Show location search for first-time setup
        // Do I need this for my headline to show up?
        // $scope.displaySearch = typeof $scope.settings.Id !== 'string';

        $scope.signtext = {headline: ''};

        // Declaring firebase stuff

        var url = 'https://simplesign.firebaseio.com/accounts/katie/slides';

        var signsRef = new Firebase(url);

        $scope.signs = $firebaseArray(signsRef);

        $scope.sign = {
            color: '',
            headline: '',
            id: '',
            src: ''
        };

        // Need to clean this up - not all of this is necessary
        $scope.searchbox = {
            template: 'dashboard/templates/searchbox.tpl',
            position: 'top-left',

            // parentDiv is a ref to the id of the parent div in weather.tpl
            parentDiv: 'searchBoxParent',
            events: {
                // updates map with searched location
                //places_changed: placesChangedHandler
            }
        };

        // need to add an ng-submit for this to work?? but save button isn't in view...
        $scope.save = function (signtext) {
            $enplugDashboard.loadingIndicator('Updating sign');

            return $scope.signs.$add(signtext).then( function (searchbox) {
                $enplugDashboard.successIndicator('Updated sign').then(function () {
                    watchChanges();
                });
            }, $enplugDashboard.errorIndicator);

            /* What it used to look like: 
            return WeatherService.saveSettings($scope.settings).then(function (settings) {
                $enplugDashboard.successIndicator('Updated settings').then(function () {
                    $scope.displaySearch = false;
                    watchChanges();
                });
            }, $enplugDashboard.errorIndicator);
            */
        };

        // function for routing to the other page using the button
        $scope.routeToContent = function () {
            $location.path('/content');
        };

        // From News App - declares and calls
        function setHeaderButtons() { 
            $enplugDashboard.setHeaderButtons([ 
            { 
            text: 'Content',
            action: $scope.routeToContent,
            class: 'btn-primary'
            },
            { 
            text: 'Save feed', 
            action: $scope.save, 
            class: 'btn-primary', 
            // disabled: !valid 
            }
        ]);
        }
        
        // Make this a function so we can disable save button after saving a location
        function watchChanges() {
            DetectChanges.watch($scope);
        }
        watchChanges();

        // Update save button status each time data changes
        // this doesn't work!! it says setheaderbuttons is not defined. need to check
        // news app's saving function to see how that fits in with the diff structure
        $scope.$watch(DetectChanges.hasChanges, setHeaderButtons);
        
    }
);
