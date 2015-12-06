angular.module('weather').factory('WeatherService', function ($enplugAccount, $q, Environment, Endpoint, Units, $rootScope) {
    'use strict';

    var assetName = 'WeatherAsset';

    function newConfig() {
        return {
            Id: null,
            Value: {
                Units: Units.FAHRENHEIT,
                Location: {
                    Name: null
                }
            }
        };
    }

    function selectCity(settings) {
        var payload = {
            Country: settings.Value.Location.Country,
            State: settings.Value.Location.State,
            City: settings.Value.Location.Name,
            VenueId: $rootScope.account.id,
            Latitude: settings.Value.Location.Latitude,
            Longitude: settings.Value.Location.Longitude
        };
        return Endpoint.post({
            host: Environment.host('weather'),
            data: payload,
            path: 'weather.selectCity'
        }).then(null, function () {
            return $q.reject('Error saving settings')
        });
    }

    return {

        loadSettings: function () {
            return $enplugAccount.getAssets().then(function (assets) {
                return assets.filter(function (asset) { return asset.Name === assetName; })[0] || newConfig();
            });
        },

        saveSettings: function (settings) {

            // if outside of the US, server requires that state be an empty string
            if (settings.Value.Location.Country !== 'US') {
                settings.Value.Location.State = '';
            }

            // Select a city from our server first, then use that response to save the asset
            return selectCity(settings).then(function () {

                // Creating or updating
                var promise;
                if (settings.Id) {
                    promise = $enplugAccount.updateAsset(settings.Id, settings.Value);
                } else {
                    promise = $enplugAccount.createAsset(assetName, settings.Value);
                }

                promise.then(null, function () {
                    return $q.reject('Error saving settings')
                });
            });
        },

        citySearch: function (latitude, longitude, token) {
            var params = {
                latitude: latitude,
                longitude: longitude,
                token: token
            };

            return Endpoint.get({
                host: Environment.host('weather'),
                params: params,
                path: 'weather.citySearch'
            });
        }
    }
});
