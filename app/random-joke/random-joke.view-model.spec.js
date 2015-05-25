describe('RandomJokeViewModel', function () {
    var $q,
        jokesArchive,
        viewModel,
        visitorStorage;

    beforeEach(module('comedyStore'));

    beforeEach(inject(function ($injector) {
        var $controller;

        $controller = $injector.get('$controller');
        $q = $injector.get('$q');

        jokesArchive = {
            getRandom: sinon.stub()
        };

        visitorStorage = {
            addSeenJoke: sinon.stub(),
            getSeenJokes: sinon.stub()
        };

        viewModel = $controller('RandomJokeViewModel', {
            jokesArchive: jokesArchive,
            visitorStorage: visitorStorage
        });
    }));

    afterEach(inject(function ($rootScope) {
        $rootScope.$digest();
    }));

    it('should always provide a new random joke during a visitor session', function () {
        visitorStorage.getSeenJokes.returns([1, 2]);

        jokesArchive.getRandom.withArgs([1, 2]).returns(promiseOf({
            text: 'Knock, knock'
        }));

        viewModel.getRandomJoke().then(function () {
            expect(viewModel.randomJokeText).toBe('Knock, knock');
        });
    });

    it('should mark joke as seen by the visitor', function () {
        visitorStorage.getSeenJokes.returns([1, 2]);

        jokesArchive.getRandom.returns(promiseOf({
            id: 3
        }));

        viewModel.getRandomJoke().then(function () {
            expect(visitorStorage.addSeenJoke).toHaveBeenCalledWith(3);
        });
    });

    it('should not mark joke as seen by the visitor twice', function () {
        visitorStorage.getSeenJokes.returns([1, 2]);

        jokesArchive.getRandom.returns(promiseOf({
            id: 1
        }));

        viewModel.getRandomJoke().then(function () {
            expect(visitorStorage.addSeenJoke).not.toHaveBeenCalled();
        });
    });

    function promiseOf(value) {
        return $q.when(value);
    }
});
