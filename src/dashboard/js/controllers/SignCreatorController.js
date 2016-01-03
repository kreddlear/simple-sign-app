angular.module('simple-sign').controller('SignCreatorController',
    function($scope, WebPageService, account, displayGroup, DetectChanges, $location,
        $enplugDashboard, $firebaseArray, focus, GradientService) {
        'use strict';

        $scope.displayGroupOrientation = displayGroup.orientation;

        console.log('Display Group orientation:', displayGroup.orientation);

        //Firebase url + array declaration
        var signsRef = new Firebase("https://simplesign.firebaseio.com/accounts/" + account.id + "/slides"),
        signs = $firebaseArray(signsRef);

        // Set header title breadcrumb
        $enplugDashboard.setHeaderTitle('New sign');

        // Focuses on the sign textbox
        focus('mainTextArea');

        // Initializes the sign
        $scope.sign = {
            colors: [],
            headline: ''
        };

        $scope.getNewRandomGradient = function() {

            // Possible todo: get gradient by name
            // Pulls in random gradient (array of 2 colors)
            var randomGradientColors = GradientService.getRandomGradient();

            $scope.previewGradient = {
                'background': "linear-gradient(to top left," + randomGradientColors[0] + ", " + randomGradientColors[1] + ")"
            };

            // Pulls in random colors for the gradient, puts them in the colors property on sign
            $scope.sign.colors[0] = randomGradientColors[0];
            $scope.sign.colors[1] = randomGradientColors[1];
        }

        // Generates new gradient on preview
        $scope.getNewRandomGradient();

        // TODO: Add sign validation logic

        // Save sign logic
        $scope.saveSign = function(sign) {
            signs.$add(sign).then(function(ref) {
                $enplugDashboard.loadingIndicator('Saving Sign');
                $enplugDashboard.successIndicator('Saved sign! Make another?').then(function() {

                    // Resets the sign to an empty headline
                    $scope.sign = {
                        colors: [],
                        headline: ''
                    };

                    // Waits till the successIndicator is gone to reset focus to the textfield
                    setTimeout(function() {
                        focus('mainTextArea');
                        $scope.getNewRandomGradient();
                    }, 1900);
                });

            }, $enplugDashboard.errorIndicator);
        };

        // Route to signs view
        function viewSigns() {
            $location.path('/');
        }

        // Route to create view - BUT don't need this - they're already here
        // TODO: Check to see if we can switch headerbuttons without using $watch/DetectChanges
        function createSign() {
            $location.path('/create');
        }

        // Set header buttons
        $enplugDashboard.setHeaderButtons([{
            text: 'My Signs',
            action: viewSigns,
            class: 'btn-default ion-android-list'
        }, {
            text: 'Create',
            action: createSign,
            class: 'btn-default ion-android-color-palette',
            disabled: true
        }]);
        
    });
