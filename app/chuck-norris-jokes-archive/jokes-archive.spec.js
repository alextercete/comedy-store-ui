describe('jokesArchive', function () {
    var $q,
        anyBigEnoughNumber,
        apiClient,
        jokesArchive;

    anyBigEnoughNumber = 10;

    beforeEach(module('chuckNorris.jokesArchive', function ($provide) {
        apiClient = {
            get: sinon.stub()
        };

        $provide.value('apiClient', apiClient);
    }));

    beforeEach(inject(function ($injector) {
        $q = $injector.get('$q');
        jokesArchive = $injector.get('jokesArchive');
    }));

    afterEach(inject(function ($rootScope) {
        $rootScope.$digest();
    }));

    it('should provide a random joke', function () {
        apiClient.get.withArgs('jokes/count').returns(promiseOf(anyBigEnoughNumber));

        apiClient.get.withArgs('jokes/random').returns(promiseOf({
            id: 123,
            joke: 'Knock, knock'
        }));

        jokesArchive.getRandom([]).then(function (joke) {
            expect(joke).toEqual({
                id: 123,
                text: 'Knock, knock'
            });
        });
    });

    it('should provide a random joke avoiding specified ones', function () {
        apiClient.get.withArgs('jokes/count').returns(promiseOf(anyBigEnoughNumber));

        apiClient.get.withArgs('jokes/random')
            .onFirstCall().returns(promiseOf({
                id: 1,
                joke: 'You might have heard this one before...'
            }))
            .onSecondCall().returns(promiseOf({
                id: 2,
                joke: 'This is an oldie but a goodie...'
            }))
            .onThirdCall().returns(promiseOf({
                id: 3,
                joke: 'Knock, knock'
            }));

        jokesArchive.getRandom([1, 2]).then(function (joke) {
            expect(joke).toEqual({
                id: 3,
                text: 'Knock, knock'
            });
        });
    });

    it('should provide a new random joke up to the limit of jokes available', function () {
        apiClient.get.withArgs('jokes/count').returns(promiseOf(3));

        apiClient.get.withArgs('jokes/random').returns(promiseOf({
            id: 1,
            joke: 'You might have heard this one before...'
        }));

        jokesArchive.getRandom([1, 2, 3]).then(function (joke) {
            expect(joke).toEqual({
                id: 1,
                joke: 'You might have heard this one before...'
            });
        });
    });

    function promiseOf(value) {
        return $q.when(value);
    }
});
