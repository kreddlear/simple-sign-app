angular.module('simple-sign').controller('SignsController',
    function($scope, SignService, signs, accountId, $log, $enplugDashboard, $location, $firebaseArray) {
        "use strict";

        $enplugDashboard.pageLoading(false);

        // If no assets/signs exist, create an asset
        //TODO - You don't need to explicitly call length
        if (!signs) {

            // Initialize sign object. This object will eventually be the asset
            var sign = SignService.newSignAsset();

            // URL composed of base URL + the accountId
            sign.Value.Url = "https://simplesign.firebaseapp.com/#/display/" + accountId.toString() + "/";
            console.log(sign.Value.Url);

            // Create the asset with the display URL (this will only happen the first time the app is initialized)
            SignService.createSign(sign).then(function() {
                $enplugDashboard.successIndicator('Created new Simple Sign collection.').then(function() {
                    
                    // Routes to signs view
                    $location.path('/');
                });
            }, $enplugDashboard.errorIndicator);
        }

        // Header buttons
        $enplugDashboard.setHeaderButtons([{
            text: 'My Signs',
            action: viewSigns,
            class: 'btn-default ion-android-list',
            disabled: true
        }, {
            text: 'Create',
            action: goToCreateSign,
            class: 'btn-default ion-android-color-palette'
        }]);

        // Give the Scope the accountId to create the URL with. See signs template for implementation
        $scope.accountId = accountId;
        
        // Firebase
        var signsRef = new Firebase("https://simplesign.firebaseio.com/accounts/" + accountId + "/slides");

        $scope.signs = $firebaseArray(signsRef);

        // Route to signs in response to click of My Signs header button
        function viewSigns() {
            $location.path('/');
        }

        // Route to create in response to click of Create header button
        function goToCreateSign() {
            $location.path('/create');
        }
    });
