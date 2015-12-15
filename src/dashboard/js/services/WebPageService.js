angular.module('simple-sign').factory('WebPageService', function ($log, $enplugAccount, $q) {
    'use strict';

    var assetName = 'WebURL';

    return {

        newPage: function () {
            return {
                Value: {
                    ShowContent: 'url',
                    Url: null,
                    OverrideUserAgent: false,
                    ShowMobileSite: null,
                    ShowDelay: null,
                    RefreshInterval: null,
                    RequireRefresh: false,
                    AllowJavascript: true,
                    Username: null,
                    Password: null,
                    Token: null,
                    JavascriptOnload: null,
                    Scale: 100,
                    _friendlyName: null
                }
            };
        },

        getAccount: function (id) {
            return $enplugAccount.getAccount().then(function (account) {
                // FIXME: this should actually redirect to "Not found" page using the SDK
                return account || $q.reject();
            });
        },
        loadWebPage: function (id) {
            return $enplugAccount.getAssets().then(function (pages) {
                var page = pages.filter(function (_page) { return _page.Id === id; })[0];

                // FIXME: this should actually redirect to "Not found" page using the SDK
                return page || $q.reject();
            });
        },

        loadWebPages: function () {
            return $enplugAccount.getAssets().then(function (pages) {
                pages.forEach(function (page) {
                    if (page.Value.Url === null) {
                        console.log('skipping null asset');
                    }
                    else {
                    page._created = moment(page.Created).format('MMM DD, YYYY');
                    page.Value.Name = page.Value.Name || page.Value.Url.substring(0, 30);
                }
                });
                return pages;
            });
        },

        createWebPage: function (page) {
            return $enplugAccount.createAsset(assetName, page.Value).then(function (response) {
            }, function () {
                return $q.reject('Error saving website "' + page.Value.Name + '"');
            });
        },

        updateWebPage: function (page) {
            return $enplugAccount.updateAsset(page.Id, page.Value).then(function () {
            }, function () {
                return $q.reject('Error saving website "' + page.Value.Name + '"');
            });
        },

        deleteWebPage: function (page) {
            return $enplugAccount.removeAsset(page.Id).then(function () {
            }, function () {
                return $q.reject('Error deleting website "' + page.Value.Name + '"');
            });
        }
    }
});
