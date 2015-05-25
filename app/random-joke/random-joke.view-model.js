(function () {
    'use strict';

    angular
        .module('comedyStore')
        .controller('RandomJokeViewModel', RandomJokeViewModel);

    RandomJokeViewModel.$inject = ['jokesArchive', 'visitorStorage'];

    function RandomJokeViewModel(jokesArchive, visitorStorage) {
        var viewModel;

        viewModel = this;
        viewModel.getRandomJoke = getRandomJoke;
        viewModel.initialise = initialise;

        function getRandomJoke() {
            var seenJokes;
            seenJokes = visitorStorage.getSeenJokes();

            return jokesArchive.getRandom(seenJokes).then(function (randomJoke) {
                viewModel.randomJokeText = randomJoke.text;

                if (!_.contains(seenJokes, randomJoke.id)) {
                    visitorStorage.addSeenJoke(randomJoke.id);
                }
            });
        }

        function initialise() {
            return getRandomJoke();
        }
    }
})();
