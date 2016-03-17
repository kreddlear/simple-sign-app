angular.module('simple-sign').controller('SignsController',
    function($scope, WebPageService, pages, account, displayGroup, $log, $enplugDashboard, $location, $firebaseArray) {
        "use strict";

        

        $enplugDashboard.pageLoading(false);

        // If no assets/pages exist, create an asset 
        if (!pages.length) {

            // Initialize page object. This object will eventually be the asset
            var page = {
                Value: {
                    ShowContent: 'url',
                    Url: null,
                    _friendlyName: null
                }
            };

            var promise;

            // URL composed of base URL + the display group id (account.id)
            // see: https://github.com/Enplug/dashboard-sdk#getaccountonsuccess-onerror
            page.Value.Url = "https://simplesign.firebaseapp.com/#/display/" + account.id + "/";
            console.log(page.Value.Url);

            // Create the asset with the display URL (this will only happen the first time the app is initialized)
            promise = WebPageService.createWebPage(page);
            promise.then(function() {
                $enplugDashboard.successIndicator('Created new Simple Sign collection.').then(function() {
                    
                    // Routes to signs view
                    $location.path('/');
                });
            }, $enplugDashboard.errorIndicator);
        }

        // Header buttons handlers
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

        // Give the Scope the display group id to create the URL with. See signs template for implementation
        $scope.displayGroupId = account.id;
        console.log("display group id: " + account.id);
        console.log("display group orientation: " + displayGroup.orientation);

        // Route to signs in response to click of My Signs header button
        function viewSigns() {
            $location.path('/');
        }

        // Route to create in response to click of Create header button
        function goToCreateSign() {
            $location.path('/create');
        }
 
        // Firebase
        var signsRef = new Firebase("https://simplesign.firebaseio.com/accounts/" + account.id + "/slides");

        $scope.signs = $firebaseArray(signsRef);       

        $scope.deleteSign = function(sign) {
            // added $scope in here because otherwise it didn't recognize signs
            // TODO: move this to service, remove $scope maybe?
            $scope.signs.$remove(sign).then(function(ref) {
                $enplugDashboard.loadingIndicator('Deleting Sign');
                // should this be the success indicator?
                $enplugDashboard.successIndicator('Deleted sign!').then(function() {

                });
            }, $enplugDashboard.errorIndicator);
        };
    });
