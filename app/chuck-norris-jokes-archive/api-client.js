(function () {
    'use strict';

    angular
        .module('chuckNorris.jokesArchive')
        .service('apiClient', ApiClient);

    ApiClient.$inject = ['$http'];

    function ApiClient($http) {
        this.get = get;

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
    }
})();
