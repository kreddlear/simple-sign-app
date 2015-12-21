angular.module('simple-sign').controller('SignCreatorController',
    function($scope, SignService, sign, accountId, DetectChanges, $location,
             $enplugDashboard, $firebaseArray, focus, GradientService) {
        'use strict';

        //Firebase url + array declaration
        var signsRef = new Firebase("https://simplesign.firebaseio.com/accounts/" + accountId + "/slides"),
            signs = $firebaseArray(signsRef);

        // Initializes the sign
        //TODO/NOTE - This makes for a cleaner controller. I view the service as the main go-between for the model and the
        // controller. Far too often the controller has a ton of model components and the service should be doing that.
        // Long-term it makes it easier cause you know all the setup/initializing of the model is in the service
        $scope.sign = SignService.newSign();

        //TODO/NOTE - I put this all here cause it makes sense to 'bundle' all of the header items together. With functions,
        // you don't need to worry about declaring them first, that only applies to scope functions

        // Set header title breadcrumb
        $enplugDashboard.setHeaderTitle('New sign');

        // Set header buttons
        $enplugDashboard.setHeaderButtons([{
            text: 'My Signs',
            action: viewSigns,
            class: 'btn-default ion-android-list'
        }, {
            text: 'Create',
            action: goToCreateSign,
            class: 'btn-default ion-android-color-palette',
            disabled: true
        }]);

        // Route to signs view
        function viewSigns() {
            $location.path('/');
        }

        // Route to create view - BUT don't need this - they're already here
        // TODO: Check to see if we can switch headerbuttons without using $watch/DetectChanges
        // Just a note, we traditionally don't use 'go to'. Contrast the 'viewSigns' with 'goToCreateSign'
        // I'm struggling to come up with something right off the bat as well so maybe it is the best option
        function goToCreateSign() {
            $location.path('/create');
        }

        // Focuses on the sign textbox
        focus('mainTextArea');

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
        };

        // Generates new gradient on preview
        $scope.getNewRandomGradient();

        // TODO: Add sign validation logic

        // Save sign logic
        $scope.saveSign = function(sign) {
            signs.$add(sign).then(function(ref) {
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
        
    });
