(function () {
    'use strict';

    angular
        .module('comedyStore')
        .service('browserStorage', BrowserStorage);

    BrowserStorage.$inject = ['$window'];

    function BrowserStorage($window) {
        var localStorage;
        localStorage = $window.localStorage;

        this.get = get;
        this.put = put;

        function get(key) {
            var json;
            json = localStorage.getItem(key);

            return angular.fromJson(json);
        }

        function put(key, value) {
            var json;
            json = angular.toJson(value);

            localStorage.setItem(key, json);
        }
    }
})();
