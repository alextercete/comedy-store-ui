describe('jokesArchive', function () {
    var $httpBackend,
        jokesArchive;

    beforeEach(module('chuckNorris.jokesArchive'));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        jokesArchive = $injector.get('jokesArchive');
    }));

    afterEach(function () {
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should provide a random joke', function () {
        $httpBackend
            .when('GET', /^http:\/\/api.icndb.com\/jokes\/random/)
            .respond({
                type: 'success',
                value: {
                    id: 123,
                    joke: 'Knock, knock'
                }
            });

        jokesArchive.getRandom().then(function (joke) {
            expect(joke).toEqual({
                id: 123,
                text: 'Knock, knock'
            });
        });
    });
});
