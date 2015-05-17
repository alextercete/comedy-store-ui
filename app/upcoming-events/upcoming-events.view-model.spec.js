describe('UpcomingEventsViewModel', function () {
    var viewModel;

    beforeEach(module('comedyStore'));

    beforeEach(inject(function ($controller) {
        viewModel = $controller('UpcomingEventsViewModel');
    }));

    it('should have the viewModel available', function () {
        expect(viewModel).toBeDefined();
    });
});
