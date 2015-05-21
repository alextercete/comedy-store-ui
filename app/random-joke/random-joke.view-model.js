(function () {
    'use strict';

    angular
        .module('comedyStore')
        .controller('RandomJokeViewModel', RandomJokeViewModel);

    RandomJokeViewModel.$inject = ['jokesArchive'];

    function RandomJokeViewModel(jokesArchive) {
        var viewModel;

        viewModel = this;
        viewModel.getRandomJoke = getRandomJoke;
        viewModel.initialise = initialise;

        function getRandomJoke() {
            return jokesArchive.getRandom().then(function (randomJoke) {
                viewModel.randomJokeText = randomJoke.text;
            });
        }

        function initialise() {
            return getRandomJoke();
        }
    }
})();
