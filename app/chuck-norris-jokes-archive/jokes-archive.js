(function () {
    'use strict';

    angular
        .module('chuckNorris.jokesArchive')
        .service('jokesArchive', JokesArchive);

    JokesArchive.$inject = ['$http'];

    function JokesArchive($http) {
        this.getRandom = getRandom;

        function get(path) {
            var config;

            config = {
                method: 'GET',
                url: 'http://api.icndb.com/' + path,
                params: {
                    escape: 'javascript'
                }
            };

            return $http(config).then(function (response) {
                return response.data.value;
            });
        }

        function getRandom() {
            return get('jokes/random').then(function (value) {
                return {
                    id: value.id,
                    text: value.joke
                };
            });
        }
    }
})();
