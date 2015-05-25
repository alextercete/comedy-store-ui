describe('apiClient', function () {
    var $httpBackend,
        apiClient;

    beforeEach(module('chuckNorris.jokesArchive'));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        apiClient = $injector.get('apiClient');
    }));

    afterEach(function () {
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should provide an API resource', function () {
        $httpBackend
            .when('GET', 'http://api.icndb.com/path/to/resource?escape=javascript')
            .respond({
                type: 'success',
                value: 'the value'
            });

        apiClient.get('path/to/resource').then(function (value) {
            expect(value).toBe('the value');
        });
    });
});
