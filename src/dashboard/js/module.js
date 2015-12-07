angular.module('weather', [
    'dashboard-weather-app-templates',
    'enplug.sdk',
    'enplug.sdk.utils',
    'enplug.utils',
    'ngRoute',
    'ngMessages',
    'uiGmapgoogle-maps',
    'firebase'
]);

angular.module('weather').config(function ($routeProvider, $locationProvider) {
    'use strict';

    $locationProvider.html5Mode(false);

    $routeProvider
        .when('/', {
            templateUrl: 'dashboard/templates/weather.tpl',
            controller: 'WeatherAppSettingsController',
            resolve: {
                settings: function (WeatherService) {
                    return WeatherService.loadSettings();
                }
            }
        })
        .when('/content', {
            templateUrl: 'dashboard/templates/weather.content.tpl',
            controller: 'WeatherAppContentController',
            // Likely that we don't need the resolve, since we won't have a service
            resolve: {
            }
        })
});

angular.module('weather').run(function (Environment, EndpointOptions, $enplugAccount, $route,
                                            Endpoints, $rootScope) {
    'use strict';

    // Make weather-app-specific endpoints available
    EndpointOptions.setEndpoints(Endpoints);

    // Locks routes from resolving
    var isPaused = true;

    $enplugAccount.getAccount().then(function (account) {

        // Set information from dashboard
        Environment.setEnvironment(account.env);

        // account details required in multiple locations
        $rootScope.account = account;
        EndpointOptions.setPersistentParam('token', account.token);

        // Release lock and trigger route resolution
        isPaused = false;
        $route.reload();
    });

    $rootScope.$on('$routeChangeStart', function (event) {
        if (isPaused) {
            event.preventDefault();
        }
    });
});
