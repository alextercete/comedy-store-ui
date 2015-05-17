describe('UserLoginViewModel', function () {
    var viewModel;

    beforeEach(module('comedyStore'));

    beforeEach(inject(function ($controller) {
        viewModel = $controller('UserLoginViewModel');
    }));

    it('should have the viewModel available', function () {
        expect(viewModel).toBeDefined();
    });
});
