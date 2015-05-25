(function () {
    'use strict';

    angular
        .module('chuckNorris.jokesArchive')
        .service('jokesArchive', JokesArchive);

    JokesArchive.$inject = ['apiClient'];

    function JokesArchive(apiClient) {
        this.getRandom = getRandom;

        function getNumberOfJokesAvailable() {
            return apiClient.get('jokes/count');
        }

        function getRandom(idsToAvoid) {
            return getNumberOfJokesAvailable().then(function (numberOfJokesAvailable) {
                if (numberOfJokesAvailable === idsToAvoid.length) {
                    return getRandomJoke();
                }

                return getRandomJokeNotIn(idsToAvoid);
            });
        }

        function getRandomJoke() {
            return apiClient.get('jokes/random');
        }

        function getRandomJokeNotIn(ids) {
            return getRandomJoke().then(function (value) {
                if (_.contains(ids, value.id)) {
                    return getRandomJokeNotIn(ids);
                }

                return {
                    id: value.id,
                    text: value.joke
                };
            });
        }
    }
})();
