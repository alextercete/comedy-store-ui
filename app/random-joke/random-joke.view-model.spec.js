describe('RandomJokeViewModel', function () {
    var $q,
        jokesArchive,
        viewModel;

    beforeEach(module('comedyStore'));

    beforeEach(inject(function ($injector) {
        var $controller;

        $controller = $injector.get('$controller');
        $q = $injector.get('$q');

        jokesArchive = {
            getRandom: sinon.stub()
        };

        viewModel = $controller('RandomJokeViewModel', {
            jokesArchive: jokesArchive
        });
    }));

    afterEach(inject(function ($rootScope) {
        $rootScope.$digest();
    }));

    it('should provide a random joke', function () {
        jokesArchive.getRandom.returns(promiseOf({
            text: 'Knock, knock'
        }));

        viewModel.getRandomJoke().then(function () {
            expect(viewModel.randomJokeText).toBe('Knock, knock');
        });
    });

    function promiseOf(value) {
        return $q.when(value);
    }
});
