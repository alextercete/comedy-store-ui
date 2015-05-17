describe('jokesArchive', function () {
    var jokesArchive;

    beforeEach(module('chuckNorris.jokesArchive'));

    beforeEach(inject(function ($injector) {
        jokesArchive = $injector.get('jokesArchive');
    }));

    it('should have the jokesArchive available', function () {
        expect(jokesArchive).toBeDefined();
    });
});
