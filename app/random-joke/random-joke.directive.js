(function () {
    'use strict';

    angular
        .module('comedyStore')
        .directive('csRandomJoke', randomJoke);

    function randomJoke() {
        return {
            scope: {},
            restrict: 'E',
            templateUrl: 'random-joke/random-joke.html',
            controller: 'RandomJokeViewModel',
            controllerAs: 'viewModel',
            link: function (scope, element, attributes, viewModel) {
                viewModel.initialise();
            }
        };
    }
})();
