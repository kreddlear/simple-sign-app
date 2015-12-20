angular.module('simple-sign').factory('SignService', function ($log, $enplugAccount, $q) {
    'use strict';

    var assetName = 'WebURL';

    return {

        //TODO - I would make the newSignAsset and have it be the 'standard' object you need for a sign
        newSignAsset: function () {
            return {
                Value: {
                    ShowContent: 'url',
                    Url: null,
                    _friendlyName: null
                }
            };
        },

        newSign: function () {
            return {
                colors: [],
                headline: ''
            };
        },

        getAccount: function (id) {
            return $enplugAccount.getAccount().then(function (account) {
                // FIXME: this should actually redirect to "Not found" page using the SDK
                // I would not suggest that, unless it's in Alex's code. Even so, I'm not a big fan of inserting redirects
                // unless it's an updated SDK method that auto triggers the url to a 404 page
                return account || $q.reject();
            });
        },
        loadSign: function (id) {
            return $enplugAccount.getAssets().then(function (signs) {
                var sign = signs.filter(function (_sign) { return _sign.Id === id; })[0];

                // FIXME: this should actually redirect to "Not found" page using the SDK
                return sign || $q.reject();
            });
        },

        loadSigns: function () {
            return $enplugAccount.getAssets().then(function (signs) {
                signs.forEach(function (sign) {
                    if (sign.Value.Url === null) {
                        console.log('skipping null asset');
                    } else {
                        console.log('Sign: ', sign);
                        sign._created = moment(sign.Created).format('MMM DD, YYYY');
                        sign.Value.Name = sign.Value.Name || sign.Value.Url.substring(0, 30);
                    }
                });
                return signs;
            });
        },

        createSign: function (sign) {
            return $enplugAccount.createAsset(assetName, sign.Value).then(function (response) {
            }, function () {
                return $q.reject('Error saving sign "' + sign.Value.Name + '"');
            });
        },

        updateSign: function (sign) {
            return $enplugAccount.updateAsset(sign.Id, sign.Value).then(function () {
            }, function () {
                return $q.reject('Error saving sign "' + sign.Value.Name + '"');
            });
        },

        deleteSign: function (sign) {
            return $enplugAccount.removeAsset(sign.Id).then(function () {
            }, function () {
                return $q.reject('Error deleting sign "' + sign.Value.Name + '"');
            });
        }
    }
});
