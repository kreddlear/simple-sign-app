angular.module('dashboard-weather-app-templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("dashboard/templates/searchbox.tpl",
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <form class=\"form-material\">\n" +
    "            <input type=\"text\" placeholder=\"Enter a city or zip code.\" class=\"form-control\" id=\"searchBox\">\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
  $templateCache.put("dashboard/templates/weather.content.tpl",
    "<table class=\"table table--hover table--condensed table--open\" st-table=\"syncedGraphics\" st-safe-src=\"graphics\" st-set-sort=\"stNestedSort\">\n" +
    "    <thead>\n" +
    "        <tr>\n" +
    "            <th style=\"width: 50px;\">\n" +
    "                <material-checkbox>\n" +
    "                    <input type=\"checkbox\" ng-checked=\"selected.length && selected.length === graphics.length\" ng-click=\"selectAll()\">\n" +
    "                </material-checkbox>\n" +
    "            </th>\n" +
    "            <th st-sort=\"Value.Name\">Name</th>\n" +
    "            <th st-sort=\"Value.Mimetype\">Color</th>\n" +
    "            <th style=\"width: 50px;\"></th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr ng-repeat=\"slide in signs | orderBy:orderBy\">\n" +
    "            <td>\n" +
    "                <material-checkbox>\n" +
    "                    <input type=\"checkbox\" ng-checked=\"selected.indexOf(graphic.Id) > -1\" ng-click=\"select(graphic.Id)\">\n" +
    "                </material-checkbox>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <div>{{ slide.headline }}</div>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <div>{{ slide.color }}</div>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "</table>    \n" +
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
