angular.module('weather').controller('WeatherAppSettingsController',
    function ($scope, $enplugDashboard, settings, WeatherService, $location, DetectChanges, Units) {
        'use strict';

        $enplugDashboard.pageLoading(false);

        
        $scope.units = Units;
        $scope.settings = settings;

        // Show location search for first-time setup
        $scope.displaySearch = typeof $scope.settings.Id !== 'string';

        $scope.signtext = {headline: ''};

        /**
         * Initializes the map, sets center position and zoom level
         * REQUIRED for the map to load
         * @type {{center: {latitude: number, longitude: number}, zoom: number}}
         */
         /*
        $scope.map = {
            center: {
                latitude: 29.83180,
                longitude: -25.58830
            },
            zoom: 1
        };

        */

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

        /*

        $scope.marker = {
            id: 0,
            coords: {
                latitude: 34.0078,
                longitude: -118.4008
            },
            options: { draggable: true },
            events: {
                dragend: function (marker) {
                    $scope.$apply(function () {
                        var latitude = marker.getPosition().lat(),
                            longitude = marker.getPosition().lng();
                        WeatherService.citySearch(latitude, longitude).then(function (response) {
                            $scope.settings.Value.Location = response;
                        });
                    });
                }
            }
        };

        // If we have an existing location, center the map on it
        if ($scope.settings.Id) {
            updateMap($scope.settings.Value.Location.Latitude, $scope.settings.Value.Location.Longitude);
        }

        // Callback for each time the user changes the location using the search box
        function placesChangedHandler(searchBox) {
            $scope.$apply(function () {
                var latitude = searchBox.getPlaces()[0].geometry.location.lat(),
                    longitude = searchBox.getPlaces()[0].geometry.location.lng();
                updateMap(latitude, longitude, true);
            });
        }

        function updateMap(latitude, longitude, search) {
            if (latitude && longitude) {
                $scope.map.center.latitude = latitude;
                $scope.map.center.longitude = longitude;
                $scope.marker.coords.latitude = latitude;
                $scope.marker.coords.longitude = longitude;
                $scope.map.zoom = 9;

                // Only search for a new location if the user chose a new location, not when first initializing map
                if (search) {
                    WeatherService.citySearch(latitude, longitude).then(function (response) {
                        $scope.settings.Value.Location = response;
                        angular.element(document.getElementById('searchBox')).val(null);
                    });
                }
            }
        }

        // Returns human-readable location
        $scope.locationString = function () {
            var location = $scope.settings.Value.Location;
            if (location.Name) {
                return location.Name + ', ' + location.State || location.Country;
            }
        };
        */

        function save() {
            $enplugDashboard.loadingIndicator('Updating settings');
            return WeatherService.saveSettings($scope.settings).then(function (settings) {
                $enplugDashboard.successIndicator('Updated settings').then(function () {
                    $scope.displaySearch = false;
                    watchChanges();
                });
            }, $enplugDashboard.errorIndicator);
        }

        // Sets save button that is disabled when no changes or invalid data, and change location button when
        // user has an existing location
        function setHeaderButtons() {
            var headerButtons = [{
                text: 'Content',
                action: routeToContent,
                class: 'btn-primary',
                icon: 'ion-upload'
            }];

            $enplugDashboard.setHeaderButtons(headerButtons);
        }


        function routeToContent() {
            $location.path('/content');
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
