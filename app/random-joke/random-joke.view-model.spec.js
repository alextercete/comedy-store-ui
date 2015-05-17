describe('RandomJokeViewModel', function () {
    var viewModel;

    beforeEach(module('comedyStore'));

    beforeEach(inject(function ($controller) {
        viewModel = $controller('RandomJokeViewModel');
    }));

    it('should have the viewModel available', function () {
        expect(viewModel).toBeDefined();
    });
});
