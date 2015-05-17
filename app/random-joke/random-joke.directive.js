(function () {
    'use strict';

    angular
        .module('comedyStore')
        .directive('csRandomJoke', randomJoke);

    function randomJoke() {
        return {
            scope: {},
            restrict: 'E',
            template: '<p>This is a random joke!</p>',
            controller: 'RandomJokeViewModel',
            controllerAs: 'viewModel'
        };
    }
})();
