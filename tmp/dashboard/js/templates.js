angular.module('dashboard-web-page-app-templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("dashboard/templates/searchbox.tpl",
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-material\">\n" +
    "            <input type=\"text\" placeholder=\"Enter a city or zip code.\" class=\"form-control\" id=\"searchBox\">\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n" +
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
  $templateCache.put("dashboard/templates/weather.tpl",
    "<form class=\"form-material sign-preview\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-3 section-summary\">\n" +
    "            <h3>Write your Sign</h3>\n" +
    "            <p>Customize your new sign by typing in whatever text you'd like to appear on the screen.</p>\n" +
    "            <p><a href=\"http://support.enplug.com/hc/en-us/articles/201437329-About-the-Weather-App\" target=\"_blank\">Learn more</a></p>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-9\">\n" +
    "            <div class=\"card\">\n" +
    "                <div class=\"card-content\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div ng-class=\"landscapePreview ? 'col-sm-5' : 'col-md-6'\">\n" +
    "                            \n" +
    "                            <div id=\"searchBoxParent\" class=\"mt-lg\"></div>\n" +
    "                            <!-- from Directory app header title entry -->\n" +
    "                            <input ng-model=\"signtext.headline\"\n" +
    "                                            type=\"text\"\n" +
    "                                            class=\"mt-sm pb\"\n" +
    "                                            field=\"headerAsset.Value.Title\"\n" +
    "                                            label=\"Enter title text\">\n" +
    "                            </input>\n" +
    "                            <label >\n" +
    "                            </label>\n" +
    "\n" +
    "                            <p class=\"text-md text-g\">Text must be less than 80 characters.</p>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Preview container -->\n" +
    "                        <div class=\"col-md-6\">\n" +
    "                            <!-- need to replace this with preview for sign -->\n" +
    "                            <!-- copied the code for landscape vs portrait preview from directory -->\n" +
    "                            <div class=\"preview\" ng-class=\"landscapePreview ? 'col-sm-7' : 'col-sm-6'\">\n" +
    "                                <div class=\"preview-wrapper\" ng-class=\"landscapePreview ? 'landscape' : 'portrait'\">\n" +
    "                                    \n" +
    "                                    <!-- landscape preview -->\n" +
    "                                    <!-- removed table etc - need to remove other styling code that pulls in from the entered assets (altho we might use that later if they want to set the color) -->\n" +
    "                                    <!-- this just needs to point to the titletext -->\n" +
    "                                    <!-- Styling set in app.scss -->\n" +
    "                                    <div class=\"landscape-preview\" ng-if=\"landscapePreview\" ng-style=\"{ 'background-color': 'aqua' }\">\n" +
    "                                        <div class=\"title\"><span>{{ signtext.headline | limitTo: 80 }}</span></div>\n" +
    "                                    </div>\n" +
    "\n" +
    "                                    <!-- portrait preview -->\n" +
    "                                    <!-- removed table etc - need to remove other styling code that pulls in from the entered assets (altho we might use that later if they want to set the color) -->\n" +
    "                                    <!-- this just needs to point to the titletext -->\n" +
    "                                    <!-- Styling set in app.scss -->\n" +
    "                                    <div class=\"portrait-preview\" ng-if=\"!landscapePreview\" ng-style=\"{ 'background-color': 'black'}\">\n" +
    "                                        <div class=\"title\"><span>{{ signtext.headline | limitTo: 80 }}</span></div>\n" +
    "                                    </div>\n" +
    "\n" +
    "                                    <!-- This allows them to choose whether it's landscape or portrait. Should we get their screen orientation automatically instead? -->\n" +
    "                                    <p class=\"tc mt-lg\">Preview: <a ng-click=\"landscapePreview = true\">Landscape</a> or <a ng-click=\"landscapePreview = false\">Portrait</a></p>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</form>\n" +
    "");
}]);
