angular.module('dashboard-web-page-app-templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("dashboard/templates/sign-creator.tpl",
    "<form class=\"form-material sign-preview\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-sm-9\">\n" +
    "            <div class=\"card sign-creator\">\n" +
    "                <div class=\"card-content\">\n" +
    "                    <h2 class=\"text-center\">New Sign</h2>\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-md-4\">\n" +
    "                            <div class=\"form-group\">\n" +
    "                                <textarea ng-model=\"sign.headline\" field=\"headerAsset.Value.Title\" class=\"form-control\" rows=\"15\" id=\"comment\" maxlength=180 focus-on=\"mainTextArea\"></textarea>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-8\">\n" +
    "                            <div class=\"preview-container\">\n" +
    "                                <div class=\"preview\">\n" +
    "                                    <div class=\"preview-wrapper\" ng-class=\"landscapePreview ? 'landscape' : 'portrait'\">\n" +
    "                                        <div class=\"landscape-preview\" ng-if=\"landscapePreview\" ng-style=\"previewGradient\">\n" +
    "                                            <span class=\"title\" style=\"white-space: pre-wrap;\">{{ sign.headline  | limitTo: 180 }}</span>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"portrait-preview\" ng-if=\"!landscapePreview\" ng-style=\"previewGradient\">\n" +
    "                                            <span class=\"title\">{{ sign.headline  | limitTo: 180 }}</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-3\">\n" +
    "            <div class=\"card card-aside\">\n" +
    "                <h4>Preview Orientation</h4>\n" +
    "                <div class=\"card-content pv bb\" style=\"display: flex; flex-flow: center;\">\n" +
    "                    <div class=\"text-center style=\" margin: auto;padding-top: 10px;padding-bottom: 10px; \"\" style=\"margin: auto;\">\n" +
    "                        <a ng-click=\"landscapePreview = true\">Landscape</a> | <a ng-click=\"landscapePreview = false\">Portrait</a></div>\n" +
    "                    <br>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"card card-aside\">\n" +
    "                <h4>Get New Color</h4>\n" +
    "                <div class=\"card-content pv bb\" style=\"display: flex; flex-flow: center;\">\n" +
    "                    <div class=\"text-center\" style=\"margin: auto;\">\n" +
    "                        <button type=\"button\" ng-click=\"getNewRandomGradient()\" class=\"btn btn-primary btn-circle btn-lg ion-ios-color-wand-outline\"></button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"card-content pv bb\" style=\"display: flex; flex-flow: center;\">\n" +
    "                <div class=\"text-center\" style=\"margin: auto;\">\n" +
    "                    <button class=\"btn btn-lg btn-primary\" ng-click=\"saveSign(sign)\">Save</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    </div>\n" +
    "    </div>\n" +
    "</form>\n" +
    "");
  $templateCache.put("dashboard/templates/signs.tpl",
    "<div class=\"container\">\n" +
    "    <div class=\"blank-slate\" ng-if=\"!signs.length\">\n" +
    "        <i class=\"text-gray-light icon ion-android-color-palette\"></i>\n" +
    "        <h2>You haven't added signs yet!</h2>\n" +
    "        <div class=\"card-content pv bb\" style=\"display: flex; flex-flow: center;\">\n" +
    "            <div class=\"text-center\" style=\"margin: auto;\">\n" +
    "                <a href=\"#/create\">\n" +
    "                    <button class=\"btn btn-lg btn-primary\">Create a Sign</button>\n" +
    "                </a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\" ng-if=\"signs.length\">\n" +
    "        <div class=\"col-sm-3 section-summary\">\n" +
    "            <h3>Your Signs</h3>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-9\">\n" +
    "            <div class=\"card card-form\">\n" +
    "                <div class=\"card-content\">\n" +
    "                    <table class=\"table\">\n" +
    "                        <thead>\n" +
    "                            <tr>\n" +
    "                                <th>Sign Text</th>\n" +
    "                            </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "                            <tr ng-repeat=\"sign in signs\">\n" +
    "                                <td>\n" +
    "                                    <span ng-bind=\"sign.headline\"></span>\n" +
    "                                </td>\n" +
    "                            </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\" ng-if=\"signs.length\">\n" +
    "        <div class=\"col-sm-3 section-summary\">\n" +
    "            <h3>SimpleSign URL</h3>\n" +
    "            <p>Preview your SimpleSign slideshow in your browser.</p>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-9\">\n" +
    "            <div class=\"card card-form\">\n" +
    "                <div class=\"card-content\">\n" +
    "                    <a ng-href=\"http://simplesign.firebaseapp.com/#/display/{{accountId}}\" target=\"_blank\">View Your Slideshow Preview</a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
