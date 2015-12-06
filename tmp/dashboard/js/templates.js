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
  $templateCache.put("dashboard/templates/weather.tpl",
    "<form class=\"form-material\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-3 section-summary\">\n" +
    "            <h3>Choose your city</h3>\n" +
    "            <p>Customize your weather app by choosing the location to display weather for.</p>\n" +
    "            <p>Temperature can be displayed in multiple units to match your regional preferences.</p>\n" +
    "            <p><a href=\"http://support.enplug.com/hc/en-us/articles/201437329-About-the-Weather-App\" target=\"_blank\">Learn more</a></p>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-9\">\n" +
    "            <div class=\"card\">\n" +
    "                <div class=\"card-content\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-md-6\">\n" +
    "                            <p class=\"text-md text-g\">Current location: <span ng-bind=\"locationString()\" class=\"pl-sm\"></span></p>\n" +
    "                            <div id=\"searchBoxParent\" class=\"mt-lg\" ng-show=\"displaySearch\"></div>\n" +
    "                            <div class=\"mt-lg\">\n" +
    "                                <div class=\"radio\">\n" +
    "                                    <label>Fahrenheit\n" +
    "                                        <input type=\"radio\" name=\"radioUnits\" ng-value=\"units.FAHRENHEIT\" ng-model=\"settings.Value.Units\">\n" +
    "                                        <span class=\"radio-on\"></span>\n" +
    "                                        <span class=\"radio-off\"></span>\n" +
    "                                    </label>\n" +
    "                                </div>\n" +
    "                                <div class=\"radio\">\n" +
    "                                    <label>Celsius\n" +
    "                                        <input type=\"radio\" name=\"radioUnits\" ng-value=\"units.CELSIUS\" ng-model=\"settings.Value.Units\">\n" +
    "                                        <span class=\"radio-on\"></span>\n" +
    "                                        <span class=\"radio-off\"></span>\n" +
    "                                    </label>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!-- Map container -->\n" +
    "                        <div class=\"col-md-6\">\n" +
    "                            <ui-gmap-google-map center=\"map.center\" zoom=\"map.zoom\" pan=\"'true'\" draggable=\"true\" events=\"map.events\" style=\"width: 100%\">\n" +
    "                                <ui-gmap-search-box template=\"searchbox.template\" events=\"searchbox.events\" parentdiv=\"searchbox.parentDiv\"></ui-gmap-search-box>\n" +
    "                                <ui-gmap-marker coords=\"marker.coords\" options=\"marker.options\" events=\"marker.events\" idkey=\"marker.id\"></ui-gmap-marker>\n" +
    "                            </ui-gmap-google-map>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</form>\n" +
    "");
}]);
