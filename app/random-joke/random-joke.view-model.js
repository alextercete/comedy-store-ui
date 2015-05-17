(function () {
    'use strict';

    angular
        .module('comedyStore')
        .controller('RandomJokeViewModel', RandomJokeViewModel);

    RandomJokeViewModel.$inject = [];

    function RandomJokeViewModel() {
        var viewModel;

        viewModel = this;
    }
})();
